const fs = require('fs')
const plugin = require('tailwindcss/plugin')
const postcssJs = require('postcss-js')
const screens = require('./tailwind-breakpoints.config.js')
module.exports = {
  content: ['./src/**/*.{vue,ts,js}'],
  theme: {
    screens,
    extend: {
      colors: {
        primary: '#133568',
        secondary: '#00AAF1'
      }
    }
  },
  plugins: [
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
      const css = fs.readFileSync('./assets/css/components.pcss', 'utf-8')
      addComponents(postcssJs.objectify(postcss.parse(css)))
    })
  ]
}
