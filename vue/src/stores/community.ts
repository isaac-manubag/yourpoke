import { ref } from "vue";
import { defineStore } from "pinia";
import type { User } from "@/interface/user";

const accessToken = "access_token";
const backendUrl = "http://localhost";

export const useCommunityStore = defineStore("community", () => {
  const community = ref<User[]>([]);

  async function fetchCommunity() {
    return await fetch(`${backendUrl}/api/community`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem(accessToken)}`,
        "Content-Type": "application/json",
      },
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
        community.value = res.data;
      });
  }

  return { community, fetchCommunity };
});
