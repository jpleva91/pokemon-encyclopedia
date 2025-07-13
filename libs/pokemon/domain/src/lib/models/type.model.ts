import { NamedAPIResource } from './pokemon.model';

export interface TypeRelations {
  double_damage_from: NamedAPIResource[];
  double_damage_to: NamedAPIResource[];
  half_damage_from: NamedAPIResource[];
  half_damage_to: NamedAPIResource[];
  no_damage_from: NamedAPIResource[];
  no_damage_to: NamedAPIResource[];
}

export interface Type {
  id: number;
  name: string;
  damage_relations: TypeRelations;
  pokemon: Array<{
    pokemon: NamedAPIResource;
    slot: number;
  }>;
}