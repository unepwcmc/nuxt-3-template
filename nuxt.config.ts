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
    '@sidebase/nuxt-auth',
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
  },

  // #TODO Not working yet
  auth: {
    // The module is enabled. Change this to disable the module
    isEnabled: false,
    // The origin is set to the development origin. Change this when deploying to production by setting `origin` in this config before build-time or by exporting `AUTH_ORIGIN` by running `export AUTH_ORIGIN=...`
    // origin: 'http://localhost:3000',

    // The base path to the authentication endpoints. Change this if you want to add your auth-endpoints at a non-default location
    basePath: '/api/auth',
    // Whether to periodically refresh the session. Change this to `true` for a refresh every seconds or set this to a number like `5000` for a refresh every 5000 milliseconds (aka: 5 seconds)
    enableSessionRefreshPeriodically: false,
    // Whether to refresh the session whenever a window focus event happens, i.e, when your user refocuses the window. Set this to `false` to turn this off
    enableSessionRefreshOnWindowFocus: true,
    // Whether to add a global authentication middleware that will protect all pages without exclusion
    globalAppMiddleware: false,
    // Select the default-provider to use when `signIn` is called. Setting this here will also effect the global middleware behavior: E.g., when you set it to `github` and the user is unauthorized, they will be directly forwarded to the Github OAuth page instead of seeing the app-login page
    defaultProvider: undefined,
    // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path.
    addDefaultCallbackUrl: true,
    // Configuration of the global auth-middleware (only applies if you set `globalAppMiddleware: true` above!)
    globalMiddlewareOptions: {
      // Whether to allow access to 404 pages without authentication. Set this to `false` to force users to sign-in before seeing `404` pages. Setting this to false may lead to vue-router problems (as the target page does not exist)
      allow404WithoutAuth: true,
      // Whether to automatically set the callback url to the page the user tried to visit when the middleware stopped them. This is useful to disable this when using the credentials provider, as it does not allow a `callbackUrl`. Setting this to a string-value will result in that being used as the callbackUrl path. Note: You also need to set the global `addDefaultCallbackUrl` setting to `false` if you want to fully disable this for the global middleware.
      addDefaultCallbackUrl: true
    }
  }
})
