import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: () => {
        const authStore = useAuthStore();
        if (authStore?.user) {
          return true;
        } else if (localStorage.getItem("access_token")) {
          return authStore.fetchUserProfile().then(() => true);
        }

        return { path: "/login" };
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      beforeEnter: () => {
        const authStore = useAuthStore();
        if (authStore?.user) {
          return { path: "/" };
        }

        return true;
      },
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
      beforeEnter: () => {
        const authStore = useAuthStore();
        if (authStore?.user) {
          return { path: "/" };
        }

        return true;
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/about2",
      name: "about2",
      component: () => import("../views/AboutView.vue"),
      beforeEnter: () => {
        return { path: "/about3" };
      },
    },
    {
      path: "/about3",
      name: "about3",
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
