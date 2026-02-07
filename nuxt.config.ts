export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  // Nuxt 4 uses app directory as srcDir by default
  future: {
    compatibilityVersion: 4,
  },

  modules: ['@nuxtjs/tailwindcss'],

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: '../tailwind.config.js', // Relative to srcDir (app/)
  },
})