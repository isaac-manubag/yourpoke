<script setup lang="ts">
defineProps<{
  pokemon: any;
}>();
</script>

<template>
  <div class="pokemon-card">
    <h3 class="name">{{ pokemon.name }}</h3>
    <img
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`"
      :alt="pokemon.name"
    />
  </div>
</template>

<style lang="scss" scoped>
.pokemon-card {
  height: 150px;
  width: 150px;
  border: 1px solid #ccc;
  place-content: center;
  text-align: center;

  .name {
    text-transform: capitalize;
  }

  &:hover {
    cursor: pointer;
  }
}
</style>
