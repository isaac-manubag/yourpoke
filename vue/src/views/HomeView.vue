<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import PokeList from "@/components/PokeList.vue";
import PokeCard from "@/components/PokeCard.vue";
import PokeModal from "@/components/PokeModal.vue";
import { ref } from "vue";
import { usePokeStore } from "@/stores/pokemon";

const authStore = useAuthStore();
const pokeStore = usePokeStore();
const showModal = ref(false);
const activePokemon = ref({});

function setActivePokemon(id: number) {
  pokeStore.fetchPokemon(id).then((pokeData) => {
    activePokemon.value = pokeData;
    showModal.value = true;
  });
}

function removeFromList(id: number) {
  authStore.removePokemonFromCollection(id);
}

function logout() {
  authStore.logout();
}
</script>

<template>
  <p>{{ authStore.user.name }} <button @click="logout">logout</button></p>

  <div class="container">
    <div class="like-list">
      <h1>You Like</h1>
      <div
        v-for="(pokemon, index) in authStore.user.pokemon_likes"
        :key="'poke' + index"
      >
        <PokeCard
          :pokemon="{ id: pokemon.pokemon_id, name: pokemon.name }"
          @click="setActivePokemon(pokemon.pokemon_id)"
        ></PokeCard>
        <button @click="removeFromList(pokemon.id)">remove</button>
      </div>
    </div>
    <PokeList></PokeList>
    <div class="like-list">
      <h1>You Hate</h1>
      <div
        v-for="(pokemon, index) in authStore.user.pokemon_hates"
        :key="'poke' + index"
      >
        <PokeCard
          :pokemon="{ id: pokemon.pokemon_id, name: pokemon.name }"
          @click="setActivePokemon(pokemon.pokemon_id)"
        ></PokeCard>
        <button @click="removeFromList(pokemon.id)">remove</button>
      </div>
    </div>
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
.container {
  display: flex;

  .like-list {
    width: 300px;
    display: flex;

    flex-direction: column;
    gap: 8px;
  }
}
</style>
