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
      return this.user != null && this.user.expires_at < Date.now();
    },
  },
  actions: {
    // Loads the user object from the session storage
    async loadUserFromStorage() {
      if (this.isAuthenticated) {
        return;
      }

      const user = await getUserFromStorage(); // Check if the user details are in local storage
      if (!!user && user.expires_at < Date.now()) {
        this.user = user;
      } else {
        this.user = null;
      }
    },

    // Redirects the browser to idsrv (login), if you are not authenticated
    async signIn(returnUrl?: string) {
      if (this.isAuthenticated) {
        return;
      }

      if (returnUrl != null) {
        await userManager.signinRedirect({ state: returnUrl });
      } else {
        await userManager.signinRedirect();
      }
    },
    // Extracts the user from the url provided by idsrv
    async signInCallback(): Promise<User> {
      return await userManager.signinRedirectCallback();
    },

    // Redirects the browser to idsrv (logout)
    async signOut() {
      await userManager.signoutRedirect();
    },
  },
});

// Add a wrapper that gets the user when the store is initialized the first time
export const useAuthenticationStore = (getUser: boolean = false) => {
  // Build the store
  const store = buildStore();

  // Get the current user and put it in the store
  if (getUser && !called) {
    getUserFromStorage().then((user) => (store.user = user));
  }

  // Return the store
  return store;
};
