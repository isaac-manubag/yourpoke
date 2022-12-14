<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePokeStore } from "@/stores/pokemon";
import PokeModal from "@/components/PokeModal.vue";
import PokeCard from "@/components/PokeCard.vue";

const pokeStore = usePokeStore();
const showModal = ref(false);
const activePokemon = ref({});

function setActivePokemon(id: string) {
  pokeStore.fetchPokemon(id).then((pokeData) => {
    activePokemon.value = pokeData;
    showModal.value = true;
  });
}

onMounted(() => {
  pokeStore.fetchPokemons();

  const infiniteScrollTriggerEl = document.querySelector(
    ".infiniteScrollTrigger"
  ) as Element;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0 && pokeStore.nextUrl) {
        pokeStore.fetchPokemons();
      }
    });
  });

  observer.observe(infiniteScrollTriggerEl);
});
</script>

<template>
  <div class="list">
    <PokeCard
      v-for="(pokemon, index) in pokeStore.pokemons"
      :key="'poke' + index"
      :pokemon="pokemon"
      @click="setActivePokemon(pokemon.id)"
    ></PokeCard>

    <div class="infiniteScrollTrigger">LOAD MORE</div>
  </div>

  <vue-final-modal
    v-model="showModal"
    classes="modal-container"
    content-class="modal-content"
  >
    <PokeModal :pokemon="activePokemon"></PokeModal>
  </vue-final-modal>
</template>

<style lang="scss" scoped>
.list {
  display: grid;
  gap: 0.5rem;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 10px;
  width: 100%;
}
</style>


