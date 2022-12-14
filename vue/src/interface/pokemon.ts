export interface PokemonTypes {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonStats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Pokemon {
  id: number;
  height: number;
  weight: number;
  name: string;
  stats: PokemonStats[];
  types: PokemonTypes[];
}

export interface PokemonCollection {
  id: number;
  pokemon_id: number;
  name: string;
  type: string;
}
