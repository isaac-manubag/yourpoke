<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const email = ref("");
const password = ref("");
const errors = ref("");

function submit(event: PointerEvent) {
  event.preventDefault();

  const store = useAuthStore();

  store
    .loginUser({
      email: email.value,
      password: password.value,
    })
    .then(() => {
      store.fetchUserProfile().then(() => {
        router.push("/");
      });
    })
    .catch((e) => {
      const err = JSON.parse(e.message);
      errors.value = err.message;
    });
}
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h1>Your Poke Login</h1>
      <form>
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" type="password" />
        <button @click="submit">LOGIN</button>
      </form>

      <p>Need an account? <RouterLink to="/register">SIGN UP</RouterLink></p>

      <p>{{ errors }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .form-container {
    display: grid;
    place-items: center;

    form {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>
