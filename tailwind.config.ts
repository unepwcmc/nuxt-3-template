const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const postcssJs = require('postcss-js')
const FormKitVariants = require('@formkit/themes/tailwindcss')
const screens = require('./tailwind/tailwind-breakpoints.config')
const theme = require('./tailwind/theme')

module.exports = {
  mode: 'jit',
  content: [
    './components/**/*.{vue,ts}',
    './pages/**/*.vue',
    // you will need the following to be here if you plan to have global styles for formkit elements
    './formkit/**/*.ts',
    './formkit/tailwind-formkit.ts'
  ],
  theme: {
    screens,
    extend: theme
  },
  plugins: [
    FormKitVariants,
    function ({ addBase, theme }) {
      const screens = theme('screens', {})
      const breakpoints = Object.keys(screens)

      addBase({
        ':root': {
          '--current-breakpoint': 0
        },
        ...breakpoints.reduce((acc, current) => {
          acc[`@media (min-width: ${screens[current]})`] = {
            ':root': {
              '--current-breakpoint': screens[current]
            }
          }
          return acc
        }, {})
      })
    },
    plugin(function ({ addComponents, postcss }) {
      // Styles defined in extended-tailwind-styles.pcss will be precompiled while launching nuxt server
      const css = fs.readFileSync('./assets/css/extended-tailwind-styles.pcss', 'utf-8')
      addComponents(postcssJs.objectify(postcss.parse(css)))
    })
  ]
}
