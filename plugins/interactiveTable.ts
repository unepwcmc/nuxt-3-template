import { plugin } from '@unepwcmc/interactive-table'
import '@unepwcmc/interactive-table/style' // Optional, it is only needed when you are using defualt style

export default defineNuxtPlugin((nuxtApp) => {
  // If you are @unepwcmc/user-management then you don't use the plugin here again as it is already registered in @unepwcmc/user-management
  // nuxtApp.vueApp.use(plugin)
})
