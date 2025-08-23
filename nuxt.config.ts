// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/ui", "nuxt-auth-sanctum"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Pintumas - Pusat Informasi Terpadu Pelabuhan Tanjung Mas",
    },
  },

  ui: {},

  sanctum: {
    baseUrl: "http://localhost:8000", // Laravel API
    endpoints: {
      user: "/api/me",
    },
  },
});
