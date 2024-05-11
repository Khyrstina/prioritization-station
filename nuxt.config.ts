// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['~/assets/vello.css'],
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui', '@vueuse/nuxt'],
  colorMode: {
    preference: 'light',
  }
})
