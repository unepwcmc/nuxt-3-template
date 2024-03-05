<template>
  <div class="page-password-reset">
    <!--
      If you don't have passwordReset present in authPages in module setup then
      you might see Maximum call stack size exceeded rather then component not registered!
    -->
    <PasswordReset
      class="page-password-reset__component"
      v-bind="{
        defaultStyle: 1
      }"
      @user-is-currently="userIsCurrently"
      @after-requested-password-reset="afterRequestedPasswordReset"
      @after-saved-new-password="afterSavedNewPassword"
    >
      <template #beforePanel>
        <!--
          The elements added here will be displayed before in both request password reset and save new password forms
          if you want to have different elemnts showing before both panels please use
          beforeRequestPasswordResetPanel or beforeSaveNewPasswordPanel
        -->
      </template>

      <template #beforeRequestPasswordResetPanel>
        <NuxtLink :to="localePath({ name: 'sign-in' })">
          Go To Sign in
        </NuxtLink>
      </template>

      <template #beforeSaveNewPasswordPanel>
        <NuxtLink :to="localePath({ name: 'index' })">
          Go Back Home
        </NuxtLink>
      </template>

      <template #successfullyRequestedPasswordReset>
        <!--
          After sucussfully requested password reset the form is hidden and there will be a panel with message saying you have sucessfully requested password reset.
          Search successfullyRequestedPasswordReset in your translation to set the message you want to display
          you can also add a link to show to end users or you can use afterRequestedPasswordReset to do anything you want
        -->
        <NuxtLink :to="localePath({ name: 'index' })">
          Go Home
        </NuxtLink>
      </template>

      <template #successfullySavedNewPassword>
        <!--
            After sucussfully saved user's new password the form is hidden and there will be a panel with message saying you have sucessfully saved your new password
            Search successfullySavedNewPasswordInPassordResetPage in your translation to set the message you want to display
            you can also add a link to show to end users or you can use afterSavedNewPassword to do anything you want
          -->
        <NuxtLink :to="localePath({ name: 'sign-in' })">
          Go to Sign in
        </NuxtLink>
      </template>
    </PasswordReset>
    <hr>
    {{ status }}
    {{ data }}
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  /**
   * We reccomend you to set unauthenticatedOnly to true so user can only use this page when they are not signed in
  */
  auth: {
    unauthenticatedOnly: true
  }
})
const localePath = useLocalePath()
const { status, data } = useAuth()
function afterRequestedPasswordReset () {
  /**
   * By default we don't do anything other than showing the message to end users that they have successfully requested their password reset.
   * if you want to go to a specific page then
   * use navigateTo(localePath({ name: 'your page names' }))
   *  */
  // const localePath = useLocalePath()
  // navigateTo(localePath({ name: 'test' }))
  console.log('afterRequestedPasswordReset is called in page')
}
function afterSavedNewPassword () {
  /**
   * By default we don't do anything other than showing the message to end users that they have successfully saved their new password.
   * if you want to go to a specific page then
   * use navigateTo(localePath({ name: 'your page names' }))
   *  */
  // const localePath = useLocalePath()
  // navigateTo(localePath({ name: 'test' }))
  console.log('afterSavedNewPassword is called in page')
}
function userIsCurrently ({ state }: { state: 'requestingPasswordReset' | 'savingNewPassword' }) {
  // It gives you the idea that what is current user lands to this page for
  console.log(`User is currently ${state}`)
}
</script>

<style lang="postcss" scoped>
.page-password-reset {
  @apply flex flex-col items-center justify-between mt-10;
}

/* To define your own style please uncommend and look into the following file */

/* @import url('../assets/components/password-reset.pcss'); */
</style>
