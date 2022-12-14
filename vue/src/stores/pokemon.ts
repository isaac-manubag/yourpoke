import { ref } from "vue";
import { defineStore } from "pinia";

const pokeApiUrl = "https://pokeapi.co/api/v2";

export const usePokeStore = defineStore("poke", () => {
  const count = ref(0);
  const pokemons = ref([]);
  const currentUrl = ref(`${pokeApiUrl}/pokemon?offset=0&limit=100`);
  const nextUrl = ref(null);
  const activePokemon = ref(null);

  async function fetchPokemons() {
    return await fetch(currentUrl.value, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((res) => {
        nextUrl.value = res.next;
        currentUrl.value = res.next;
        count.value = res.count;
        const pokemonsToAppend = res.results.map((pokemon: any) => {
          return {
            ...pokemon,
            id: pokemon.url
              .split("/")
              .filter((part: any) => {
                return !!part;
              })
              .pop(),
          };
        });

        pokemons.value = [...pokemons.value, ...pokemonsToAppend] as any;
      });
  }

  async function fetchPokemon(id: string | number) {
    return await fetch(`${pokeApiUrl}/pokemon/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        activePokemon.value = res;
        return res;
      });
  }

  return { pokemons, count, nextUrl, fetchPokemons, fetchPokemon };
});
