import { defineStore } from "pinia";
import userManager from "@/api/authApi";
import type { User } from "oidc-client";

export const useAuthenticationStore = defineStore("authentication", {
  state: () => {
    return {
      userManager: userManager,
      user: null as User | null,
    };
  },
  getters: {
    isAuthenticated(): boolean {
      return this.user != null;
    },
  },
  actions: {
    async authenticate(returnUrl?: string) {
      const user = await this.getUser(); // Check if the user details are in local storage
      if (!!user) {
        this.user = user;
      } else {
        await this.signIn(returnUrl);
      }
    },
    async getUser() {
      try {
        let user = await this.userManager.getUser();
        return user;
      } catch (err) {
        console.log("Error while getting the current user:", err);
      }
    },
    async signIn(returnUrl?: string) {
      if (returnUrl != null) {
        await this.userManager.signinRedirect({ state: returnUrl });
      } else {
        await this.userManager.signinRedirect();
      }
    },
  },
});
