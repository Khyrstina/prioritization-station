// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/vello.css'],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  colorMode: {
    preference: 'light',
  }
})
