export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/stylelint-module",
    ["@nuxtjs/eslint-module", { fix: true }],
    "@pinia/nuxt",
  ],
  i18n: {
    experimental: {
      jsTsFormatResource: true,
    },
    locales: [
      {
        name: "English",
        code: "en",
        file: "en.ts",
      },
      {
        name: "Traditonal Chinese",
        code: "tw",
        file: "tw.json",
      },
    ],
    // lazy: true,
    langDir: "lang",
    defaultLocale: "en",
  },
  tailwindcss: {
    cssPath: "~/assets/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: "first",
    viewer: true,
  },
  // css:['~/assets/css/tailwind.css'],

  stylelint: {
    /* module options */
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: "123",
    // Keys within public are also exposed client-side
    public: {
      apiBase: "/api",
    },
  },
  experimental: {
    componentIslands: true,
  },
});
