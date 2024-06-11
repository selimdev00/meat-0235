// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["@nuxtjs/tailwindcss"],
  ssr: false,
  css: ["~/assets/global.css"],
  app: {
    head: {
      title: "J-GUYS search",
    },
  },
  runtimeConfig: {
    public: {
      BACKEND_HOST: process.env.BACKEND_HOST,
    },
  },
});
