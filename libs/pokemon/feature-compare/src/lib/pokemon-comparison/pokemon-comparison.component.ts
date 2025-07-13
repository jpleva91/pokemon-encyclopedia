import { Component, input, computed, resource } from '@angular/core';
import { Pokemon } from '@pokemon-encyclopedia/domain';

@Component({
  selector: 'lib-pokemon-comparison',
  template: `
    <div class="comparison-container">
      <div class="comparison-header">
        <h3>POKEMON COMPARISON</h3>
        @if (pokemonResource.isLoading()) {
        <span class="loading-text blink">LOADING...</span>
        } @else if (pokemonData().length === 0) {
        <span class="info-text">NO POKEMON TO COMPARE</span>
        } @else {
        <span class="info-text"
          >COMPARING {{ pokemonData().length }} POKEMON</span
        >
        }
      </div>

      @if (pokemonData().length > 0) {
      <div class="comparison-table-wrapper">
        <table class="comparison-table">
          <thead>
            <tr>
              <th class="sticky-col">STAT</th>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <th>
                <div class="pokemon-header">
                  <span class="pokemon-id"
                    >No.{{ pokemon.id.toString().padStart(3, '0') }}</span
                  >
                  <span class="pokemon-name">{{
                    pokemon.name.toUpperCase()
                  }}</span>
                  @if (pokemon.sprites.front_default) {
                  <img
                    [src]="pokemon.sprites.front_default"
                    [alt]="pokemon.name"
                    class="pokemon-sprite"
                  />
                  }
                </div>
              </th>
              }
            </tr>
          </thead>
          <tbody>
            <!-- Types Row -->
            <tr>
              <td class="sticky-col stat-label">TYPE</td>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <td>
                <div class="types-cell">
                  @for (type of pokemon.types; track type.slot) {
                  <span class="type-badge type-{{ type.type.name }}">
                    {{ type.type.name.toUpperCase() }}
                  </span>
                  }
                </div>
              </td>
              }
            </tr>

            <!-- Individual Stats -->
            @for (stat of statNames; track stat) {
            <tr>
              <td class="sticky-col stat-label">{{ stat.toUpperCase() }}</td>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <td
                class="stat-value"
                [class.highest]="isHighestStat(stat, pokemon)"
                [class.lowest]="isLowestStat(stat, pokemon)"
              >
                {{ getStatValue(pokemon, stat) }}
              </td>
              }
            </tr>
            }

            <!-- Total Stats Row -->
            <tr class="total-row">
              <td class="sticky-col stat-label">TOTAL</td>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <td
                class="stat-total"
                [class.highest]="isHighestTotal(pokemon)"
                [class.lowest]="isLowestTotal(pokemon)"
              >
                {{ getTotalStats(pokemon) }}
              </td>
              }
            </tr>

            <!-- Height & Weight -->
            <tr>
              <td class="sticky-col stat-label">HEIGHT</td>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <td class="info-value">
                {{ (pokemon.height / 10).toFixed(1) }}m
              </td>
              }
            </tr>
            <tr>
              <td class="sticky-col stat-label">WEIGHT</td>
              @for (pokemon of pokemonData(); track pokemon.id) {
              <td class="info-value">
                {{ (pokemon.weight / 10).toFixed(1) }}kg
              </td>
              }
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Summary Stats -->
      <div class="comparison-summary">
        <h4>ANALYSIS</h4>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">HIGHEST TOTAL:</span>
            <span class="summary-value"
              >{{ (highestTotalPokemon()?.name || 'N/A').toUpperCase() }} ({{
                highestTotal()
              }})</span
            >
          </div>
          <div class="summary-item">
            <span class="summary-label">BEST HP:</span>
            <span class="summary-value">{{
              (getBestStatPokemon('hp')?.name || 'N/A').toUpperCase()
            }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">BEST ATTACK:</span>
            <span class="summary-value">{{
              (getBestStatPokemon('attack')?.name || 'N/A').toUpperCase()
            }}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">BEST DEFENSE:</span>
            <span class="summary-value">{{
              (getBestStatPokemon('defense')?.name || 'N/A').toUpperCase()
            }}</span>
          </div>
        </div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .comparison-container {
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 8px;
        background: var(--gb-lightest);
        border: 3px solid var(--gb-darkest);
        border-radius: 4px;
      }

      .comparison-header {
        text-align: center;
        padding: 8px;
        background: rgba(0, 0, 0, 0.1);
        border: 2px solid var(--gb-dark);

        h3 {
          margin: 0 0 4px 0;
          font-size: 11px;
          font-weight: bold;
          color: var(--gb-darkest);
          letter-spacing: 1px;
        }

        .loading-text,
        .info-text {
          font-size: 8px;
          color: var(--gb-dark);
        }
      }

      .comparison-table-wrapper {
        overflow-x: auto;
        border: 2px solid var(--gb-dark);
      }

      .comparison-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 8px;
        min-width: 400px;

        th,
        td {
          padding: 4px 6px;
          text-align: center;
          border: 1px solid var(--gb-medium);
        }

        th {
          background: var(--gb-dark);
          color: var(--gb-lightest);
          font-weight: bold;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .sticky-col {
          position: sticky;
          left: 0;
          background: var(--gb-light);
          z-index: 5;
          font-weight: bold;
          text-align: left;
          min-width: 80px;
        }

        th.sticky-col {
          z-index: 11;
          background: var(--gb-dark);
        }
      }

      .pokemon-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;

        .pokemon-id {
          font-size: 7px;
          opacity: 0.8;
        }

        .pokemon-name {
          font-size: 9px;
          letter-spacing: 0.5px;
        }

        .pokemon-sprite {
          width: 48px;
          height: 48px;
          image-rendering: pixelated;
          margin-top: 4px;
        }
      }

      .types-cell {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
      }

      .type-badge {
        padding: 2px 4px;
        border-radius: 2px;
        font-size: 6px;
        font-weight: bold;
        border: 1px solid var(--gb-darkest);
        text-transform: uppercase;
        white-space: nowrap;
      }

      /* Type colors */
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

      .stat-label {
        color: var(--gb-darkest);
        font-size: 8px;
      }

      .stat-value,
      .stat-total,
      .info-value {
        font-family: monospace;
        font-weight: bold;
        background: var(--gb-lightest);
      }

      .stat-value.highest,
      .stat-total.highest {
        background: #78c850;
        color: #000;
      }

      .stat-value.lowest,
      .stat-total.lowest {
        background: #f08030;
        color: #000;
      }

      .total-row {
        background: rgba(0, 0, 0, 0.05);

        td {
          border-top: 2px solid var(--gb-dark);
          font-weight: bold;
        }
      }

      .comparison-summary {
        margin-top: 8px;
        padding: 8px;
        background: rgba(0, 0, 0, 0.05);
        border: 2px solid var(--gb-medium);

        h4 {
          margin: 0 0 8px 0;
          font-size: 9px;
          color: var(--gb-darkest);
          letter-spacing: 1px;
          text-align: center;
        }

        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 4px;
          font-size: 8px;
        }

        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 2px 4px;
          background: var(--gb-lightest);
          border: 1px solid var(--gb-medium);
        }

        .summary-label {
          font-weight: bold;
          color: var(--gb-dark);
        }

        .summary-value {
          color: var(--gb-darkest);
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

      /* Mobile responsive */
      @media (max-width: 600px) {
        .comparison-table {
          font-size: 7px;
        }

        .pokemon-sprite {
          width: 32px !important;
          height: 32px !important;
        }
      }
    `,
  ],
})
export class PokemonComparisonComponent {
  // Input array of Pokemon IDs or names to compare
  pokemonIds = input<string[]>([]);

  // Stabilized params to prevent unnecessary re-fetches
  private stableIds = computed(() => {
    const ids = this.pokemonIds();
    // Return the same reference if the array contents haven't changed
    return ids.slice().sort().join(',');
  });

  // Use resource API for fetching all Pokemon data
  pokemonResource = resource<Pokemon[], string>({
    params: () => this.stableIds(),
    loader: async ({
      params: idsString,
      abortSignal,
    }: {
      params: string;
      abortSignal: AbortSignal;
    }) => {
      if (!idsString) {
        return [];
      }

      // Parse the comma-separated string back to array
      const ids = idsString.split(',').filter(id => id);
      if (ids.length === 0) {
        return [];
      }

      // Fetch all Pokemon data in parallel
      const promises = ids.map((id) =>
        fetch(`/api/v1/pokemon?action=get&id=${id}`, { signal: abortSignal })
          .then((res) => (res.ok ? res.json() : null))
          .catch(() => null)
      );

      const results = await Promise.all(promises);
      return results.filter((p) => p !== null) as Pokemon[];
    },
  });

  // Computed values
  pokemonData = computed(() => this.pokemonResource.value() || []);

  // Stat names for iteration
  statNames = [
    'hp',
    'attack',
    'defense',
    'special-attack',
    'special-defense',
    'speed',
  ];

  // Computed stat analysis
  highestTotal = computed(() => {
    const data = this.pokemonData();
    if (data.length === 0) return 0;
    return Math.max(...data.map((p) => this.getTotalStats(p)));
  });

  highestTotalPokemon = computed(() => {
    const data = this.pokemonData();
    const highest = this.highestTotal();
    return data.find((p) => this.getTotalStats(p) === highest);
  });

  getStatValue(pokemon: Pokemon, statName: string): number {
    const stat = pokemon.stats.find((s) => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
  }

  getTotalStats(pokemon: Pokemon): number {
    return pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0);
  }

  isHighestStat(statName: string, pokemon: Pokemon): boolean {
    const data = this.pokemonData();
    if (data.length <= 1) return false;

    const currentValue = this.getStatValue(pokemon, statName);
    const allValues = data.map((p) => this.getStatValue(p, statName));
    const maxValue = Math.max(...allValues);

    return (
      currentValue === maxValue &&
      allValues.filter((v) => v === maxValue).length === 1
    );
  }

  isLowestStat(statName: string, pokemon: Pokemon): boolean {
    const data = this.pokemonData();
    if (data.length <= 1) return false;

    const currentValue = this.getStatValue(pokemon, statName);
    const allValues = data.map((p) => this.getStatValue(p, statName));
    const minValue = Math.min(...allValues);

    return (
      currentValue === minValue &&
      allValues.filter((v) => v === minValue).length === 1
    );
  }

  isHighestTotal(pokemon: Pokemon): boolean {
    const data = this.pokemonData();
    if (data.length <= 1) return false;

    const currentTotal = this.getTotalStats(pokemon);
    const allTotals = data.map((p) => this.getTotalStats(p));
    const maxTotal = Math.max(...allTotals);

    return (
      currentTotal === maxTotal &&
      allTotals.filter((t) => t === maxTotal).length === 1
    );
  }

  isLowestTotal(pokemon: Pokemon): boolean {
    const data = this.pokemonData();
    if (data.length <= 1) return false;

    const currentTotal = this.getTotalStats(pokemon);
    const allTotals = data.map((p) => this.getTotalStats(p));
    const minTotal = Math.min(...allTotals);

    return (
      currentTotal === minTotal &&
      allTotals.filter((t) => t === minTotal).length === 1
    );
  }

  getBestStatPokemon(statName: string): Pokemon | undefined {
    const data = this.pokemonData();
    if (data.length === 0) return undefined;

    return data.reduce((best, current) => {
      const bestValue = this.getStatValue(best, statName);
      const currentValue = this.getStatValue(current, statName);
      return currentValue > bestValue ? current : best;
    });
  }
}
