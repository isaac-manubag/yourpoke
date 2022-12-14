<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const name = ref("");
const email = ref("");
const password = ref("");
const errors = ref("");

function submit(event: PointerEvent) {
  event.preventDefault();

  const store = useAuthStore();

  store
    .registerUser({
      name: name.value,
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
      <form>
        <input v-model="name" placeholder="name" />
        <input v-model="email" placeholder="email" />
        <input v-model="password" placeholder="password" type="password" />
        <button @click="submit">REGISTER</button>
      </form>
      <p>Already have an account? <RouterLink to="/login">LOGIN</RouterLink></p>

      <p>{{ errors }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
