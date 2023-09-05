const API_ENDPOINT = process.env.RAILS_ENDPOINT
const DEV_PORT = process.env.DEV_PORT || '8080'
const SITE_TITLE = process.env.SITE_TITLE || ''
const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION || ''

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    port: DEV_PORT
  },

  app: {
    // https://nuxt.com/docs/getting-started/seo-meta#title-template
    head: {
      title: SITE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: SITE_DESCRIPTION
        },
        { name: 'format-detection', content: 'telephone=no' }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  },
  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    },
    meta: {
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      author: 'WCMC'
    },
    disable: process.env.NODE_ENV === 'development',
    register: true,
    scope: '/',
    dest: 'public',
    swSrc: 'service-worker.js',
    noscript: [{ children: 'Javascript is required' }]
  },
  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/stylelint-module',
    // ['@nuxtjs/eslint-module', { fix: true }],
    '@pinia/nuxt'
  ],
  i18n: {
    experimental: {
      jsTsFormatResource: true
    },
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en.ts'
      },
      {
        name: 'Traditonal Chinese',
        code: 'tw',
        file: 'tw.json'
      }
    ],
    // lazy: true,
    langDir: 'lang',
    defaultLocale: 'en'
  },
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: 'tailwind.config',
    exposeConfig: false,
    exposeLevel: 2,
    injectPosition: 'first',
    viewer: true
  },

  stylelint: {
    /* module options */
  },
  runtimeConfig: {
    // The private keys which are only available server-side
    apiSecret: '123',
    // Keys within public are also exposed client-side
    public: {
      apiBase: '/api'
    }
  },
  experimental: {
    componentIslands: true
  }
})
