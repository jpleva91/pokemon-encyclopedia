import { Component, input, computed, resource } from '@angular/core';
import { PokemonCardComponent } from '@pokemon-encyclopedia/feature-card';

interface PokemonListItem {
  name: string;
  url: string;
}

@Component({
  selector: 'lib-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent],
  template: `
    <div class="pokemon-list-container">
      <div class="results-info">
        @if (pokemonResource.isLoading()) {
        <span class="blink">LOADING...</span>
        } @else if (pokemonList().length > 0) {
        <span>SHOWING {{ displayedCount() }} POKEMON</span>
        } @else {
        <span>READY TO SEARCH</span>
        }
      </div>

      <div class="pokemon-grid" #gridContainer>
        @if (pokemonResource.isLoading()) {
        <div class="loading-container">
          <div class="loading-text blink">LOADING POKEMON DATA...</div>
        </div>
        } @else if (!hasData()) {
        <div class="no-results">
          <p>WAITING FOR SEARCH...</p>
          <p class="hint">Ask Bill to show Pokemon!</p>
        </div>
        } @else if (displayedPokemon().length === 0) {
        <div class="no-results">NO POKEMON TO DISPLAY</div>
        } @else { @for (pokemon of displayedPokemon(); track pokemon.name) {
        <lib-pokemon-card [pokemonId]="pokemon.name" />
        } }
      </div>
    </div>
  `,
  styles: [
    `
      .pokemon-list-container {
        padding: 8px;
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .results-info {
        padding: 8px;
        background: rgba(0, 0, 0, 0.1);
        border: 2px solid var(--gb-dark);
        margin-bottom: 8px;
        font-size: 9px;
        font-weight: bold;
        color: var(--gb-darkest);
        text-align: center;
        letter-spacing: 1px;
      }

      .pokemon-grid {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 8px;
        padding-right: 4px;
        align-content: start;

        /* Custom scrollbar */
        &::-webkit-scrollbar {
          width: 8px;
        }

        &::-webkit-scrollbar-track {
          background: var(--gb-medium);
          border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb {
          background: var(--gb-dark);
          border-radius: 4px;
        }
      }

      .loading-container,
      .no-results {
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px 20px;
        color: var(--gb-dark);
      }

      .loading-text {
        font-size: 10px;
        letter-spacing: 2px;
      }

      .no-results {
        p {
          margin: 8px 0;
          font-size: 10px;
        }

        .hint {
          font-size: 8px;
          color: var(--gb-medium);
        }
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
    `,
  ],
})
export class PokemonListComponent {
  // Inputs from chat component
  type = input<string>('all');
  generation = input<number>(0);
  limit = input<number>(20);

  // Use resource API for fetching Pokemon list
  pokemonResource = resource<PokemonListItem[], { type: string; generation: number }>({
    params: () => ({ 
      type: this.type(), 
      generation: this.generation() 
    }),
    equal: (a: PokemonListItem[], b: PokemonListItem[]) => {
      // Compare arrays by length and first few items
      if (!a || !b) return a === b;
      if (a.length !== b.length) return false;
      // Check first 3 items for quick comparison
      const checkCount = Math.min(3, a.length);
      for (let i = 0; i < checkCount; i++) {
        if (a[i]?.name !== b[i]?.name) return false;
      }
      return true;
    },
    loader: async ({ params, abortSignal }: { params: { type: string; generation: number }, abortSignal: AbortSignal }) => {
      // If generation is specified
      if (params.generation > 0) {
        const response = await fetch(
          `/api/v1/pokemon?action=generation&generation=${params.generation}`,
          { signal: abortSignal }
        );
        if (response.ok) {
          const data = await response.json();
          return data.results || [];
        }
        return [];
      }
      
      // If type is specified (and not 'all')
      if (params.type && params.type !== 'all') {
        const response = await fetch(
          `/api/v1/pokemon?action=type&type=${params.type}`,
          { signal: abortSignal }
        );
        if (response.ok) {
          const data = await response.json();
          return data.pokemon || [];
        }
        return [];
      }
      
      // Default: return empty array
      return [];
    }
  });

  // Computed values
  pokemonList = computed(() => this.pokemonResource.value() || []);
  hasData = computed(() => this.pokemonList().length > 0);

  displayedPokemon = computed(() => {
    const list = this.pokemonList();
    const maxLimit = this.limit();
    return list.slice(0, maxLimit);
  });

  displayedCount = computed(() => this.displayedPokemon().length);
}