// import { checker } from 'vite-plugin-checker'

/**
 * Do not put SITE_TITLE and SITE_DESCRIPTION in .env and use process.env.SITE_TITLE
 * Reason: When you run yarn build the SITE_TITLE you set in your local .env and assign to app.head and pwa. The two transform to the actual value
 *   head: {
 *     title: process.env.SITE_TITLE
 *    }
 * becomes head: {title:'aaaaa'} when you run yarn build not head: {title: process.env.SITE_TITLE}
 * In short, if you have a different value on server it will not take effect
 */
const SITE_TITLE = 'PP Data Management Portal'
const SITE_DESCRIPTION = 'A WCMC data portal for managing ICCA/WDPA data'
export default defineNuxtConfig({
  vite: {
    plugins: [
      // checker({
      //   vueTsc: true
      // })
      /**
       * Install vite-plugin-checker
       * enable this to check typescript on run dev
       * */
    ]
  },
  typescript: {
		strict: true,
	},
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
    disable: process.env.NODE_ENV !== 'production',
    register: true,
    scope: '/',
    dest: 'public',
    swSrc: 'service-worker.js',
    noscript: [{ children: 'Javascript is required' }]
  },
  modules: [
    "@vite-pwa/nuxt",
		"@vueuse/nuxt",
    '@nuxt/test-utils/module',
    '@nuxtjs/stylelint-module',
    "@nuxt/eslint",
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
  eslint: {
		config: {
			stylistic: true,
		},
	},
  formkit: {
    configFile: './formkit/formkit.config.ts'
  },
  wcmcUserManagement: {
    auth: {
      isEnabled: true,
      baseURL: process.env.AUTH_ORIGIN,
      provider: {
        type: 'authjs'
      },
      globalAppMiddleware: {
        isEnabled: true,
        allow404WithoutAuth: true
      }
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
      AUTH_PAGES: {
        // Same as the path in ~/pages/*
        signIn: '/en/sign-in',
        signOut: '/en/sign-out',
        error: '/en/sign-in',
        passwordReset: { name: 'password-reset' }, // Or /password-reset
        viewUserRoles: { name: "admin-user-roles" }
      }
    }
  },
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
    cssPath: ['~/assets/css/tailwind.css', { injectPosition: 'first' }],
    configPath: 'tailwind.config',
    exposeConfig: false,
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
  runtimeConfig: {
    /**
       * Anything inside here are linked with anything stating with NUXT_xxxxx in .env
       * i,e: aSecret and A_SECRET below both use the value of NUXT_A_SECRET in .env
       * You can simply assign a default value for aSecret or A_SECRET  the value only gets changed when NUXT_A_SECRET is present in .env
       */
    aSecret: '',
    A_SECRET: '',
    public: {
      /**
       * Anything inside here are linked with anything stating with NUXT_PUBLIC_xxxxx in .env
       * i,e: railsApiServer and RAILS_API_SERVER below both use the value of NUXT_PUBLIC_RAILS_API_SERVER in .env
       * You can simply assign a default value for railsApiServer or RAILS_API_SERVER, the value only gets changed when NUXT_PUBLIC_RAILS_API_SERVER is present in .env
       */
      railsApiServer: '',
      RAILS_API_SERVER: ''
    }
  },
  experimental: {
    // This can be remoeved once the functionality becomes avaliable permanently in future Nuxt versions
    componentIslands: true
  },
  alias: {},
  // Auto import all types in ./types.ts
  imports: {
		dirs: ["types/**/*.ts", "store"],
		global: true
	},
	compatibilityDate: "2024-07-30",
})
