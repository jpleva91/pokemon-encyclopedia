import { Component, input, computed, resource } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pokemon } from '@pokemon-encyclopedia/domain';

@Component({
  selector: 'lib-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Loading State -->
    @if (pokemonResource.isLoading()) {
    <div class="pokemon-card loading">
      <div class="loading-text blink">LOADING...</div>
    </div>
    }
    <!-- Error State -->
    @else if (pokemonResource.error()) {
    <div class="pokemon-card error">
      <div class="error-text">POKEMON NOT FOUND!</div>
    </div>
    }
    <!-- Main Card -->
    @else if (pokemon()) {
    <div class="pokemon-card">
      <div class="card-header">
        <div class="pokemon-id">
          No.{{ pokemon()!.id.toString().padStart(3, '0') }}
        </div>
        <div class="pokemon-name">{{ pokemon()!.name.toUpperCase() }}</div>
      </div>

      <div class="pokemon-sprite">
        <div class="sprite-frame">
          <!-- Show sprite if available, else fallback -->
          @if (pokemon()!.sprites.front_default) {
          <img
            [src]="pokemon()!.sprites.front_default"
            [alt]="pokemon()!.name"
            class="pixel-art"
            (error)="onImageError($event)"
          />
          } @else {
          <div class="no-sprite">NO IMAGE</div>
          }
        </div>
      </div>

      <div class="pokemon-types">
        <!-- Render all types as badges -->
        @for (type of pokemon()!.types; track type.slot) {
        <span class="type-badge type-{{ type.type.name }}">
          {{ type.type.name.toUpperCase() }}
        </span>
        }
      </div>

      <div class="pokemon-stats">
        <div class="stats-grid">
          <div class="stat-item">
            <span class="stat-label">HP</span>
            <span class="stat-value">{{
              getStatValue('hp') || '???'
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">ATK</span>
            <span class="stat-value">{{
              getStatValue('attack') || '???'
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">DEF</span>
            <span class="stat-value">{{
              getStatValue('defense') || '???'
            }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">SPD</span>
            <span class="stat-value">{{
              getStatValue('speed') || '???'
            }}</span>
          </div>
        </div>
      </div>
    </div>
    }
  `,
  styles: [
    `
      .pokemon-card {
        background: var(--gb-lightest);
        border: 3px solid var(--gb-darkest);
        border-radius: 4px;
        padding: 8px;
        width: 100%;
        max-width: 160px;
        transition: transform 0.2s ease;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 0 var(--gb-dark);
        }

        &.loading,
        &.error {
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
      }

      .loading-text,
      .error-text {
        font-size: 9px;
        font-weight: bold;
        color: var(--gb-dark);
        letter-spacing: 1px;
      }

      .error-text {
        color: #d32f2f;
      }

      .blink {
        animation: blink 1s infinite;
      }

      @keyframes blink {
        0%,
        100% {
          opacity: 1;
        }
        50% {
          opacity: 0.3;
        }
      }

      .card-header {
        text-align: center;
        margin-bottom: 4px;
      }

      .pokemon-id {
        font-size: 8px;
        color: var(--gb-dark);
        margin-bottom: 2px;
      }

      .pokemon-name {
        font-size: 10px;
        font-weight: bold;
        color: var(--gb-darkest);
        letter-spacing: 0.5px;
      }

      .pokemon-sprite {
        display: flex;
        justify-content: center;
        margin: 8px 0;
      }

      .sprite-frame {
        width: 96px;
        height: 96px;
        background: var(--gb-light);
        border: 2px solid var(--gb-dark);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }

      .pixel-art {
        image-rendering: pixelated;
        image-rendering: -moz-crisp-edges;
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      .no-sprite {
        font-size: 8px;
        color: var(--gb-medium);
        text-align: center;
      }

      .pokemon-types {
        display: flex;
        justify-content: center;
        gap: 4px;
        margin: 8px 0;
        flex-wrap: wrap;
      }

      .type-badge {
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 7px;
        font-weight: bold;
        border: 1px solid var(--gb-darkest);
        text-transform: uppercase;
      }

      /* Type colors - Game Boy style */
      .type-normal {
        background: #a8a878;
        color: #000;
      }
      .type-fire {
        background: #f08030;
        color: #000;
      }
      .type-water {
        background: #6890f0;
        color: #fff;
      }
      .type-electric {
        background: #f8d030;
        color: #000;
      }
      .type-grass {
        background: #78c850;
        color: #000;
      }
      .type-ice {
        background: #98d8d8;
        color: #000;
      }
      .type-fighting {
        background: #c03028;
        color: #fff;
      }
      .type-poison {
        background: #a040a0;
        color: #fff;
      }
      .type-ground {
        background: #e0c068;
        color: #000;
      }
      .type-flying {
        background: #a890f0;
        color: #000;
      }
      .type-psychic {
        background: #f85888;
        color: #fff;
      }
      .type-bug {
        background: #a8b820;
        color: #000;
      }
      .type-rock {
        background: #b8a038;
        color: #000;
      }
      .type-ghost {
        background: #705898;
        color: #fff;
      }
      .type-dragon {
        background: #7038f8;
        color: #fff;
      }
      .type-dark {
        background: #705848;
        color: #fff;
      }
      .type-steel {
        background: #b8b8d0;
        color: #000;
      }
      .type-fairy {
        background: #ee99ac;
        color: #000;
      }

      .pokemon-stats {
        margin-top: 8px;
        padding-top: 8px;
        border-top: 2px solid var(--gb-medium);
      }

      .stats-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 4px;
      }

      .stat-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 8px;
        padding: 2px;
      }

      .stat-label {
        color: var(--gb-dark);
        font-weight: bold;
      }

      .stat-value {
        color: var(--gb-darkest);
        font-weight: bold;
        font-family: monospace;
      }
    `,
  ],
})
export class PokemonCardComponent {
  // Input can be either ID or full Pokemon data
  pokemonId = input<string>();
  pokemonData = input<Pokemon>();
  
  // Use resource API for fetching Pokemon data
  pokemonResource = resource<Pokemon | null, { id?: string; data?: Pokemon }>({
    params: () => ({ 
      id: this.pokemonId(), 
      data: this.pokemonData() 
    }),
    equal: (a: Pokemon | null, b: Pokemon | null) => {
      // Compare Pokemon by ID
      if (!a || !b) return a === b;
      return a.id === b.id;
    },
    loader: async ({ params, abortSignal }: { params: { id?: string; data?: Pokemon }, abortSignal: AbortSignal }) => {
      // If we have data passed in, return it directly
      if (params.data) {
        return params.data;
      }
      
      // If no ID, return null
      if (!params.id) {
        return null;
      }
      
      // Fetch by ID
      const response = await fetch(
        `/api/v1/pokemon?action=get&id=${params.id}`,
        { signal: abortSignal }
      );
      
      if (!response.ok) {
        throw new Error('Failed to load Pokemon');
      }
      
      return response.json() as Promise<Pokemon>;
    }
  });
  
  // Computed Pokemon value from resource
  pokemon = computed(() => this.pokemonResource.value() || null);

  getStatValue(statName: string): number | null {
    const pokemonValue = this.pokemon();
    if (!pokemonValue) return null;
    
    const stat = pokemonValue.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : null;
  }

  onImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
  }
}