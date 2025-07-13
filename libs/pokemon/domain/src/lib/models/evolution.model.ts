import { NamedAPIResource } from './pokemon.model';

export interface EvolutionDetail {
  trigger: NamedAPIResource;
  item: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  time_of_day: string;
  gender: number | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_physical_stats: number | null;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
}

export interface EvolutionLink {
  species: NamedAPIResource;
  evolves_to: EvolutionLink[];
  evolution_details: EvolutionDetail[];
  is_baby: boolean;
}

export interface EvolutionChain {
  id: number;
  chain: EvolutionLink;
}