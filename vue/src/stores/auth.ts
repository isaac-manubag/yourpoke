import { ref } from "vue";
import { defineStore } from "pinia";
import router from "@/router";
import type { PokemonCollection } from "@/interface/pokemon";
import type { User } from "@/interface/user";

const accessToken = "access_token";
const backendUrl = "http://localhost";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);

  async function loginUser(data: any) {
    return await fetch(`${backendUrl}/api/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((d) => {
          localStorage.setItem(accessToken, d.access_token);
          return d;
        });
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    });
  }

  async function registerUser(data: any) {
    return await fetch(`${backendUrl}/api/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json().then((d) => {
          localStorage.setItem(accessToken, d.access_token);
          return d;
        });
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    });
  }

  async function fetchUserProfile() {
    return await fetch(`${backendUrl}/api/user`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json().then((d) => {
          user.value = d.data;
          return d.data;
        });
      } else {
        return res.text().then((text) => {
          throw new Error(text);
        });
      }
    });
  }

  async function addPokemonToCollection(data: any) {
    return await fetch(`${backendUrl}/api/add-to-collection`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((res) => {
        const data: PokemonCollection = res.data;
        const userData: User = user.value as any;

        if (data.type === "like") {
          user.value = {
            ...userData,
            pokemon_likes: [...userData.pokemon_likes, data],
          };
        } else {
          user.value = {
            ...userData,
            pokemon_hates: [...userData.pokemon_hates, data],
          };
        }

        return res.data;
      });
  }

  async function removePokemonFromCollection(id: number) {
    console.log("id", id);
    return await fetch(`${backendUrl}/api/remove-from-collection`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((res) => {
        const userData: User = user.value as any;

        user.value = {
          ...userData,
          pokemon_likes: [...userData.pokemon_likes.filter((p) => p.id !== id)],
          pokemon_hates: [...userData.pokemon_hates.filter((p) => p.id !== id)],
        };

        return res.data;
      });
  }

  async function logout() {
    user.value = null;
    localStorage.removeItem(accessToken);
    await router.push("/login");
  }

  return {
    user,
    loginUser,
    registerUser,
    fetchUserProfile,
    addPokemonToCollection,
    removePokemonFromCollection,
    logout,
  };
});
