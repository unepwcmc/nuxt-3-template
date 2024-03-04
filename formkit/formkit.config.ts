/**
 * This file is mainly used for generating styles for tailwind used in formkit elements
 * This file was copied/pasted from https://formkit.com/essentials/styling#using-the-cli
 * You do not need to change anything here unless you know what you are doing
 *  */

import { defineFormKitConfig } from '@formkit/vue'
import { generateClasses } from '@formkit/themes'
// import { en } from '@formkit/i18n'
import tailwindFormkit from './tailwind-formkit'

export default defineFormKitConfig({
  // locales: { en },
  // locale: 'en',
  config: {
    // You only need to confid this if you want to have a 'global' style for all your forkit input elements
    //  In other words, if you don't want all formkit elements to have the same style then remove the 'classes' below
    classes: generateClasses(tailwindFormkit)
  }
})
