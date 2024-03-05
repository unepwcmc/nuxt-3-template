const RAILS_API_SERVER = process.env.RAILS_API_SERVER
const SITE_TITLE = process.env.SITE_TITLE || ''
const SITE_DESCRIPTION = process.env.SITE_DESCRIPTION || ''
const NUXT_SERVER = process.env.HOST
const PRODUCTION_MODE = process.env.NODE_ENV === 'production'

if (!RAILS_API_SERVER) {
  throw new Error('RAILS_API_SERVER Not Provided!!!!')
}
if (!NUXT_SERVER) {
  let errorMsg = 'You are in development mode. However, development server path is not detected! Please configure your environment'
  if (PRODUCTION_MODE) { errorMsg = 'You are in production mode. However, production server path is not detected! Please configure your environment' }
  throw new Error(errorMsg)
}
const WCMCUSERMANAGEMENTCONFIG = {
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
  config: {
    enableAzureSignIn: true
  },
  enviromentVariablesPrivate: {
    /*
      for RAILS_USER_ACCOUNT_API_PREFIX_NAME For example:
      mount WcmcUserManager::Engine, at: "/user_management"
      is inserted in routes.rb
      whatever is put after 'at:' will be matched up here as the auth API path
    */
    RAILS_USER_ACCOUNT_API_PREFIX_NAME: '/user_management',
    NUXT_SECRET: process.env.NUXT_SECRET,
    AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
    AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
    AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
    USER_MANAGEMENT_RAILS_BASE_URL: RAILS_API_SERVER
  },
  enviromentVariablesPublic: {
    /*
    You will need AUTH_PAGES otherwise Nuxt Auth will use their default sign in/out pages (If that is what you want then you don't need to define this)
    https://sidebase.io/nuxt-auth/application-side/custom-sign-in-page#configure-authjs-to-redirect-to-the-custom-sign-in-page
  */

    AUTH_PAGES: {
      /**
       * Change the default behavior to use `/sign-in` as the path for the sign-in page
       * see https://next-auth.js.org/configuration/pages for all possiable pages (FYI, Nuxt-auth was created based on Next-auth)
       * */
      signIn: '/sign-in',
      signOut: '/sign-out',
      /**
       * error page should be same as sign-in as it will be returning to sign-in page with error message
       * It will look something like this when an error occured during sign in (You should only see this when using Azure login) -> localhost:8080/sign-in?error=1-0-1
       * */
      error: '/sign-in',

      /*  The above are used by nuxt-auth so please follow the official documentation for setup
            - The following ones are used in components so you can give options that you normally use in 'to' props <NuxtLink :to=" "/>
              MAKE SURE NO localePath!!! I çwill apply localePath for you! Use passwordReset: { name: 'password-reset' } not passwordReset: localePath({ name: 'pameassessment' })
            - If passwordReset is not present then you will not see this option in the sign in page and we will not register ResetPassword component which means
            you cannot use <ResetPassword> component
         */
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
    '@formkit/nuxt',
    // '../wcmc_user_management/dist/module'
    ['wcmc_user_management', WCMCUSERMANAGEMENTCONFIG],
    /*
        Make sure wcmc_user_management module is
        - before '@nuxtjs/tailwindcss' Otherwise tailwind config in the module gets ignored and tailwind will not work properly for the module
        - before '@nuxtjs/i18n' as the module will hook up the needed configs when Nuxt registers @nuxtjs/i18n

    */
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n'
  ],
  formkit: {
    // https://github.com/formkit/formkit/issues/995
    autoImport: false,
    configFile: './formkit/formkit.config.ts'
  },
  i18n: {
    strategy: 'prefix',
    experimental: {
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
