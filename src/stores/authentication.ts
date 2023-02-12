import { defineStore } from "pinia";
import userManager from "@/api/authApi";
import type { User } from "oidc-client";

let called = false;
async function getUserFromStorage(): Promise<User | null> {
  called = true;
  try {
    let user = await userManager.getUser();
    return user;
  } catch (err) {
    console.log("Error while getting the current user:", err);
    return null;
  }
}

// Define the store
const buildStore = defineStore("authentication", {
  state: () => {
    return {
      user: null as User | null,
    };
  },
  getters: {
    isAuthenticated(): boolean {
      return this.user != null;
    },
  },
  actions: {
    async ensureAuthenticated(returnUrl?: string) {
      const user = await getUserFromStorage(); // Check if the user details are in local storage
      if (!!user && user.expires_at < Date.now()) {
        this.user = user;
      } else {
        await this.signIn(returnUrl);
      }
    },

    async signIn(returnUrl?: string) {
      if (returnUrl != null) {
        await userManager.signinRedirect({ state: returnUrl });
      } else {
        await userManager.signinRedirect();
      }
    },

    async signinRedirectCallback(): Promise<User> {
      return await userManager.signinRedirectCallback();
    },
    async signoutRedirect() {
      await userManager.signoutRedirect();
    },
  },
});

// Add a wrapper that gets the user when the store is initialized the first time
export const useAuthenticationStore = (getUser: boolean = true) => {
  // Build the store
  const store = buildStore();

  // Get the current user and put it in the store
  if (getUser && !called) {
    getUserFromStorage().then((user) => (store.user = user));
  }

  // Return the store
  return store;
};
