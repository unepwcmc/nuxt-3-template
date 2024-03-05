/**
 * -  In general, You can now do some extra fetching/anything beefore returning the translations
 * -  If you don't need this extra feature then you can name this file as a .json file or just returning translations
 * - There are 2 ways to use this file see
 * - Only use this file When you want to change some of our module translations, Otherwise use enSimpleUsuage.ts instead.
 */

import lodash from 'lodash'
const { merge } = lodash // Don't do -> import lodash from 'lodash' , for some reason it gives an error

export default defineI18nLocale((locale: string) => {
  const defaultUserManagementTranslations = getDefaultUserManagementTranslations()
  /**
   * If you would like to change translations then you can do this.
   * In node_modules/wcmc_user_management module there is a file src/runtime/composables/translations.ts which has all options there
   */
  defaultUserManagementTranslations.wcmcUserManagement.signIn.buttons.azureSignIn = 'WCMC Employee Sign In'
  const translations = {
    title: 'WCMC Nuxt 3 Template',
    someTranslations: fetchSomeTranslations(locale), // Example of how you can use this
    // These are not from rails so you can search in our wcmc created modules to see how they might be used, they must be defined here!
    apiErrorResponse: {
      '999-999-995': 'Method is not supported.', // (for devs, this is used in APIs created in Nuxt Server
      '999-999-996': 'Your user information was not sent by server',
      '999-999-997': 'We cannot connect to the server.',
      '999-999-998': 'Unknown Error Occurred.',
      '999-999-999': 'Unknown Error Code. -> {code}.'
    }
  }
  // You have to use deep merge. Don't use shallow merge otherwise some objects might be overwritten!
  return merge(translations, defaultUserManagementTranslations)
})

function getDefaultUserManagementTranslations () {
  // get default translations from user management module
  // useWcmcUserManagement is defined/registered alias in wcmc_user_management module
  const { getUserManagementTranslations } = useWcmcUserManagement()
  return getUserManagementTranslations('en')
}
function fetchSomeTranslations (locale) {
  // add async next to the fucntion
  // await $fetch(`/api/someTranslations/${locale}`).then(res => res.data)
  // Do something
  return { locale }
}
