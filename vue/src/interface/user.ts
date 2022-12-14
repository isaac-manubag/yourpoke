import type { PokemonCollection } from "@/interface/pokemon";

export interface User {
  id: number;
  name: string;
  email: string;
  pokemon_likes: PokemonCollection[];
  pokemon_hates: PokemonCollection[];
}
