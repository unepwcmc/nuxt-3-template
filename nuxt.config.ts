const RAILS_API_SERVER = process.env.RAILS_API_SERVER
const SITE_TITLE = process.env.SITE_TITLE || ''
const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION || ''
const PRODUCTION_MODE = process.env.NODE_ENV === 'production'

if (!RAILS_API_SERVER) {
  throw new Error('RAILS_API_SERVER Not Provided!!!!')
}
const wcmcUserManagement = {
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs'
    },
    globalAppMiddleware: {
      isEnabled: true,
      allow404WithoutAuth: true
    }
  },
  configurationsPrivate: {
    NUXT_SECRET: process.env.NUXT_SECRET,
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID
  },
  configurationsPublic: {
    enableAzureSignIn: true,
    /*
      for RAILS_USER_ACCOUNT_API_PREFIX_NAME For example:
      mount WcmcUserManager::Engine, at: "/user_management"
      is inserted in routes.rb
      whatever is put after 'at:' will be matched up here as the auth API path
    */
    RAILS_USER_ACCOUNT_API_PREFIX_NAME: '/user_management',
    USER_MANAGEMENT_RAILS_BASE_URL: RAILS_API_SERVER,
    AUTH_PAGES: {
      // Same as the path in ~/pages/*
      signIn: '/sign-in',
      signOut: '/sign-out',
      error: '/sign-in',
      passwordReset: { name: 'password-reset' } // Or /password-reset
    }
  }
}
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    // https://nuxt.com/docs/getting-started/seo-meta#title-template
    head: {
      title: SITE_TITLE,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: SITE_TITLE,
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
    disable: !PRODUCTION_MODE,
    register: true,
    scope: '/',
    dest: 'public',
    swSrc: 'service-worker.js',
    noscript: [{ children: 'Javascript is required' }]
  },
  modules: [
    '@vite-pwa/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/eslint-module', { fix: true }],
    ['@pinia/nuxt', { disableVuex: false }],
    '@unepwcmc/user-management',
    /*
      for @unepwcmc/user-management
      - If you want to use '@nuxtjs/tailwindcss' make sure it is after @unepwcmc/user-management module.
      - @nuxtjs/i18n is required and to place after @unepwcmc/user-management module
    */
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@formkit/nuxt' // You can comment this out if you don't plan to use formkit. It is a powerful/easy to use tool to simplyfy form elements. https://formkit.com/
  ],
  formkit: {
    configFile: './formkit/formkit.config.ts'
  },
  wcmcUserManagement,
  i18n: {
    strategy: 'prefix',
    experimental: {
      // https://v8.i18n.nuxtjs.org/options/misc#experimental in oder to use lazy load for en.ts
      jsTsFormatResource: true
    },
    locales: [
      {
        name: 'English',
        code: 'en',
        file: 'en.ts'
      }
    ],
    lazy: true,
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
  build: {
    // Do not create a ~/postcss.config.cjs file it will not work with Nuxt, instead put the config here
    postcss: {
      plugins: {
        'tailwindcss/nesting': {},
        'postcss-import': {},
        tailwindcss: {},
        autoprefixer: {}
      }
    },
    plugins: {},
    transpile: ['@formkit/vue']
  },
  runtimeConfig: {},
  experimental: {
    componentIslands: true
  },
  alias: {}
})
