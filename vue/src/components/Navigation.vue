<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

function logout() {
  authStore.logout();
}
</script>

<template>
  <nav >
    <p>Your Poke | {{ authStore.user.name }} </p>
    <div class="nav-links">
      <RouterLink to="/">All Pokemon</RouterLink>
      <RouterLink to="/community">Community</RouterLink>
      <RouterLink to="/profile">Profile</RouterLink>
    </div>
    <button @click="logout">logout</button>
  </nav>
</template>

<style lang="scss" scoped>
nav {
  height: 64px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  .nav-links {
    gap: 1rem;
    display: flex;
    cursor: pointer;
  }
}
</style>
