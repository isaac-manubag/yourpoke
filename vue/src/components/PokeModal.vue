<script setup lang="ts">
import type { Pokemon } from "@/interface/pokemon";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

defineProps<{
  pokemon: Pokemon;
}>();

function likeThisPoke(pokemon: Pokemon) {
  authStore.addPokemonToCollection({
    name: pokemon.name,
    type: "like",
    pokemon_id: pokemon.id,
  });
}

function hateThisPoke(pokemon: Pokemon) {
  authStore.addPokemonToCollection({
    name: pokemon.name,
    type: "hate",
    pokemon_id: pokemon.id,
  });
}
</script>

<template>
  <header>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
      :alt="pokemon.name"
    />
    <span class="name capitalize">{{ pokemon.name }}</span>
  </header>

  <div class="modal-body">
    <div>
      <p>ID: {{ pokemon.id }}</p>
      <p>Height: {{ pokemon.height }}</p>
      <p>Weight: {{ pokemon.weight }}</p>
    </div>

    <h3>Stats</h3>
    <div>
      <p
        class="capitalize"
        v-for="(stat, index) in pokemon.stats"
        :key="'stat' + index"
      >
        {{ stat.stat.name }}: {{ stat.base_stat }}
      </p>
    </div>

    <h3>Type</h3>
    <div>
      <p
        class="capitalize"
        v-for="(type, index) in pokemon.types"
        :key="'type' + index"
      >
        {{ type.type.name }}
      </p>
    </div>
  </div>

  <div class="modal-footer">
    <button @click="likeThisPoke(pokemon)">I Like This Pokemon</button>
    <button @click="hateThisPoke(pokemon)">I Hate This Pokemon</button>
  </div>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  flex-direction: row;
  align-items: center;

  .name {
    font-size: 1.5rem;
    font-weight: 700;
  }
}

.capitalize {
  text-transform: capitalize;
}
</style>


