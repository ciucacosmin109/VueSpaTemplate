<template>
    <nav class="h-100 shadow">
        <div class="h-100 d-flex flex-column p-2" style="width: 200px">
            <!-- Logo -->
            <div class="navbar-brand">
                <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="32" height="32" />
                <span class="fs-4 ms-3">Vue app</span>
            </div>
            <hr />

            <!-- Links -->
            <ul class="flex-grow-1 nav nav-pills d-flex flex-column">
                <!-- Main links -->
                <li 
                    v-for="(route, index) of sideBarRoutes" :key="index"
                    class="d-flex flex-column"
                >
                    <div class="d-flex">
                        <RouterLink 
                            :to="route.route" 
                            class="px-3 py-1 nav-link flex-grow-1"
                            :class="{'partially-active': $route.name === route.route.name}"
                            active-class="partially-active" exact-active-class="active" 
                        >
                            <i :class="route.icon" class="me-2"></i>
                            {{ route.text }}
                        </RouterLink>
                        <button
                            v-if="route.children.length > 0"
                            class="btn btn-link py-0 ps-2 pe-1" 
                            data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"
                        >
                            <i class="fas fa-caret-down"></i>
                        </button>
                    </div>

                    <!-- Children -->
                    <div 
                        v-if="route.children.length > 0"
                        class="collapse" id="collapseExample"
                    >
                        <ul>
                            <li v-for="(child, childIndex) of route.children" :key="index * 1000 + childIndex">
                                <RouterLink 
                                    :to="child.route" 
                                    class="px-3 py-1 nav-link" 
                                    active-class="partially-active" exact-active-class="active"
                                >
                                    <i :class="child.icon" class="me-2"></i>
                                    {{ child.text }}
                                </RouterLink>
                            </li> 
                        </ul>
                    </div>

                </li>
            </ul>

            <!-- Footer -->
            <div class="dropdown">
                <button class="btn btn-sm btn-outline-primary w-100 d-flex align-items-center dropdown-toggle"
                    id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/avatar.jpg" alt="" class="rounded-circle me-2" width="32" height="32" />
                    <strong>User</strong>
                </button>
                <ul class="w-100 dropdown-menu shadow" aria-labelledby="dropdownUser1">
                    <!-- With children :D -->
                    <li class="cursor-pointer">
                        <!-- Default dropend button -->
                        <div class="btn-group w-100 dropend">
                            <span class="dropdown-item dropdown-toggle"  @click.stop data-bs-toggle="dropdown" aria-expanded="false">
                                Change theme
                            </span>
                            <ul class="dropdown-menu">
                                <!-- Dropdown menu links -->
                                <li v-for="themeName of allThemes.map(x => x.name)" 
                                    class="dropdown-item cursor-pointer" 
                                    :class="currentTheme.name === themeName ? 'active' : ''"
                                    @click="changeTheme(themeName)"
                                > 
                                    {{ themeName }} 
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li>
                        <hr class="dropdown-divider" />
                    </li>
                    <li class="dropdown-item cursor-pointer" @click="printUserInfo">Print user info</li>
                    <li class="dropdown-item cursor-pointer" @click="signOut">Sign out</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { useAuthenticationStore } from "@/stores/authentication";
import { useThemeStore } from "@/stores/theme";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";
import { sideBarRoutes } from "./sideBarRoutes";

export default defineComponent({
  data() {
    const themeStore = useThemeStore();
    const authStore = useAuthenticationStore();

    return {
      sideBarRoutes: sideBarRoutes,

      themeStore: themeStore,
      authStore: authStore,

      allThemes: themeStore.allThemes,
      currentTheme: storeToRefs(themeStore).currentTheme,
    }
  },
  methods: {
    changeTheme(theme: string) {
      this.themeStore.changeTheme(theme);
    },
    async signOut() {
        await this.authStore.userManager.signoutRedirect();
    },
    async printUserInfo() {
        console.log(this.authStore.user);
    }
  }});
</script>

<style lang="scss" scoped>
.cursor-pointer {
    cursor: pointer;
    user-select: none;
}
.partially-active {
    border: 1px solid var(--bs-nav-pills-link-active-bg) !important;
}
</style>