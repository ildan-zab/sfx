export default defineNuxtConfig({
  srcDir: 'src/',
  devtools: { enabled: false },
  modules: ['nuxt-icons', '@pinia/nuxt'],
  css: ['~/assets/scss/index.scss'],
  vite: {
    build: {
      minify: 'esbuild',
      cssMinify: 'esbuild',
      cssCodeSplit: true,
      reportCompressedSize: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/_variables.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1 maximum-scale=1',
      htmlAttrs: { lang: 'ru' },
      title: 'SFX Frontender',
    },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
  nitro: {
    minify: true,
    compressPublicAssets: { gzip: true, brotli: true },
  },
  compatibilityDate: '2024-10-25',
});
