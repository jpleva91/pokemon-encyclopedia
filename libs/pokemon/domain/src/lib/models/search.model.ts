export interface SearchCriteria {
  query?: string;
  types?: string[];
  minStats?: {
    hp?: number;
    attack?: number;
    defense?: number;
    'special-attack'?: number;
    'special-defense'?: number;
    speed?: number;
  };
  generation?: number;
  limit?: number;
  offset?: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}