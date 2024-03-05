import { describe, expect, test } from 'vitest'
import { createPage } from '@nuxt/test-utils/e2e'
import { useWcmcUserManagementTranslations } from '../../src/runtime/composables/translations'
import { useSetup } from './setup'
const { getUserManagementTranslations } = useWcmcUserManagementTranslations()
const allTranslations = getUserManagementTranslations('en')
const { inputs: inputsTranslations } = allTranslations.wcmcUserManagement.signIn

// assign console.log before setup
const logger = console.log

describe('Login Page', async () => {
  await useSetup().defaultSetup()
  async function signInPage () {
    const page = await createPage('/en/sign-in')
    return {
      page,
      signInComponentContainer: page.locator('.wcmc-ct-user-management-sign-in--use-default-style--container'),
      emailSignInForm: page.locator('.wcmc-ct-user-management-sign-in__container--email-password-sign-in'),
      email: page.locator('.wcmc-ct-user-management-sign-in__input--email'),
      password: page.locator('.wcmc-ct-user-management-sign-in__input--password'),
      usernamePasswordSubmitButton: page.locator('.wcmc-ct-user-management-sign-in__button--emailPasswordSignIn'),
      pause: () => page.pause
    }
  }
  async function fillInUsernamePassword (pageObject) {
    const { validation } = inputsTranslations
    const { email: emailInput, password: passwordInput, usernamePasswordSubmitButton, signInComponentContainer, emailSignInForm } = pageObject
    /**
   * when no username password then submittion btn is disabled
   */
    expect(await usernamePasswordSubmitButton.isDisabled()).toBeTruthy()

    // /**
    //  * Email/password are valid, not showing error message, submittion btn is enabled
    //  */
    await emailInput.click()
    await emailInput.fill('abccc@jjkok.com')
    await passwordInput.click()
    await passwordInput.fill('ewfwe12123')
    await signInComponentContainer.click()
    await new Promise(resolve => setTimeout(resolve, 3000))
    expect(await emailSignInForm.innerHTML()).not.toContain(validation.emailFormat)
    expect(await usernamePasswordSubmitButton.isDisabled()).toBeFalsy()
  }
  // it('Sign in component is mounted', async () => {
  //   const { signInComponentContainer } = await signInPage()
  //   expect(await signInComponentContainer.isVisible()).toBeTruthy()
  // })
  // it('i18n is working', async () => {
  //   const { emailSignInForm } = await signInPage()
  //   expect(await emailSignInForm.innerHTML()).toBe(panelTitle)
  // })
  // it('Sign In form validation - Email is not valid, showing error message, submittion btn is disabled', async () => {
  //   const { validation } = inputsTranslations
  //   const { email: emailInput, usernamePasswordSubmitButton, signInComponentContainer, emailSignInForm } = await signInPage()
  //   /**
  //    * when no username password then submittion btn is disabled
  //    */
  //   expect(await usernamePasswordSubmitButton.isDisabled()).toBeTruthy()
  //   /**
  //    * Email is not valid, showing error message, submittion btn is disabled
  //    */
  //   await emailInput.click()
  //   await emailInput.fill('abccc')
  //   await signInComponentContainer.click()
  //   await new Promise(r => setTimeout(r, 3000))
  //   expect(await emailSignInForm.innerHTML()).toContain(validation.emailFormat)
  //   expect(await usernamePasswordSubmitButton.isDisabled()).toBeTruthy()
  // })

  // it('Sign In form validation - Email/password are valid, not showing error message, submittion btn is enabled', async () => {
  // const signInPageObject = await signInPage()
  // fillInUsernamePassword(signInPageObject)
  // })

  test('Login Successfully', async () => {
    const signInPageObject = await signInPage()
    const { usernamePasswordSubmitButton, emailSignInForm, pause } = signInPageObject
    await fillInUsernamePassword(signInPageObject)
    await emailSignInForm.click()
    // const responsePromise = page.waitForResponse('http://localhost:8080/api/auth/providers')
    // const responsePromise1 = page.waitForResponse('http://localhost:8080/api/auth/csrf')
    // const responsePromise2 = page.waitForResponse('http://localhost:8080/api/auth/callback/credentials')
    // const responsePromise3 = page.waitForResponse('http://localhost:8080/api/auth/session')
    await usernamePasswordSubmitButton.click()
    await new Promise(resolve => setTimeout(resolve, 30))

    // await responsePromise
    // await responsePromise1
    // await responsePromise2
    // await responsePromise3
    logger('ABCCCC', await emailSignInForm.innerHTML())

    expect(await emailSignInForm.innerText()).toContain('Wrong email or password.')
    await pause()
  })
})
