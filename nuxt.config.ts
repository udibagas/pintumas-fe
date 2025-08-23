// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxt/ui", "nuxt-fortify"],

  css: ["~/assets/css/main.css"],

  app: {
    head: {
      title: "Pintumas - Pusat Informasi Terpadu Pelabuhan Tanjung Mas",
    },
  },

  nuxtFortify: {
    baseUrl: "http://localhost:8000",
    origin: "http://localhost:3000",
    authMode: "cookie",
    authHome: "/dashboard",
    features: {
      registration: true,
      resetPasswords: true,
    },
    endpoints: {
      // user: "/api/user",
    },
  },
});
