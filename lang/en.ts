/**
 * - In general, You can now do some extra fetching/anything beefore returning the translations
 * - If you don't need this extra feature then you can name this file as a .json file or just returning translations
 * - There are 2 ways to use this file see
 * - Only use this file When you want to change some of our module translations, Otherwise use enSimpleUsuage.ts instead.
 */
import { defaultsDeep } from 'lodash'

export default defineI18nLocale((locale: string) => {
  const defaultUserManagementTranslations = getDefaultUserManagementTranslations()
  /**
   * If you would like to change translations for a module then you can do like this.
   */
  defaultUserManagementTranslations.wcmcModules.userManagement.signIn.buttons.azureSignIn = 'WCMC Employee Sign In'
  const translations = {
    title: 'WCMC Nuxt 3 Template',
    someTranslations: fetchSomeTranslations(locale), // Example of how you can use this
    signIn: {
      passwordReset: {
        title: 'Do you need to reset your password?',
        link: 'Password Reset'
      }
    },
    component: {
      PageFooter: {
        copyright: 'Copyright UNEP-WCMC'
      }
    },
    buttons: {
      signOut: 'Sign out',
      signIn: 'Sign in',
      back: 'Back'
    },
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
  return defaultsDeep(translations, defaultUserManagementTranslations)
})

function getDefaultUserManagementTranslations () {
  // useWcmcUserManagement is defined/registered alias in @unepwcmc/user-management module
  const { getUserManagementTranslations } = useWcmcUserManagement()
  return getUserManagementTranslations('en')
}
function fetchSomeTranslations (locale) {
  // add async next to the fucntion
  // await $fetch(`/api/someTranslations/${locale}`).then(res => res.data)
  // Do something
  return { locale }
}
