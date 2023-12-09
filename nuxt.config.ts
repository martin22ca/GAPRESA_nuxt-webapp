// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_URL || '/api'
    }
  },
  modules: ["@pinia/nuxt", '@nuxtjs/tailwindcss', '@nuxtjs/color-mode', '@vee-validate/nuxt', 'nuxt-icon'],
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: '',
  },
})
