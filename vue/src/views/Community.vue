<script setup lang="ts">
import Navigation from "@/components/Navigation.vue";
import PokeCard from "@/components/PokeCard.vue";
import { useCommunityStore } from "@/stores/community";
import { onMounted } from "vue";

const communityStore = useCommunityStore();

onMounted(() => {
  communityStore.fetchCommunity();
});
</script>

<template>
  <Navigation></Navigation>
  <div class="container">
    <div>
      <div
        class="user-container"
        v-for="(user, index) in communityStore.community"
        :key="'comm' + index"
      >
        <h2>{{ user.name }}</h2>
        <h3>{{ user.email }}</h3>

        <div class="like-list">
          <h4 class="wf">Likes</h4>
          <div
            v-for="(pokemon, index) in user.pokemon_likes"
            :key="'poke' + index"
            class="card-container"
          >
            <PokeCard
              :pokemon="{ id: pokemon.pokemon_id, name: pokemon.name }"
            ></PokeCard>
          </div>
        </div>
        <br>
        <div class="like-list">
          <h4 class="wf">Hates</h4>
          <div
            v-for="(pokemon, index) in user.pokemon_hates"
            :key="'poke' + index"
            class="card-container"
          >
            <PokeCard
              :pokemon="{ id: pokemon.pokemon_id, name: pokemon.name }"
            ></PokeCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;

  .user-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 1rem;


    .like-list {
      display: flex;
      gap: 8px;
    }
  }
  .wf {
    width: 40px;
  }
}
</style>
