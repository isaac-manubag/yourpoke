<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import router from "@/router";

const email = ref("isaac@yourpoke.com");
const password = ref("isaacyourpoke");
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
  <div class="form-container">
    <form>
      <input v-model="email" placeholder="email" />
      <input v-model="password" placeholder="password" type="password" />
      <button @click="submit">LOGIN</button>
    </form>

    <p><RouterLink to="/register">SIGN UP</RouterLink></p>

    <p>{{ errors }}</p>
  </div>
</template>

<style scoped>
.form-container {
  display: grid;
  place-items: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
