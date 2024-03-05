/* stylelint-disable block-no-empty */

<template>
  <div class="page-sign-in">
    <SignIn
      class="page-sign-in__component"
      v-bind="{
        defaultStyle: 1,
        useAuth:auth
      }"
      @after-signin-successful="afterSignInSuccessful"
    >
      <template #passwordResetLink>
        <span class="page-sign-in__password-reset">
          <span
            class="page-sign-in__password-reset--title"
            v-text="t('wcmcUserManagement.signIn.passwordReset.title')"
          />
          <NuxtLink class="page-sign-in__password-reset--link" :to="localePath({ name: 'password-reset' })">
            {{ t('wcmcUserManagement.signIn.passwordReset.link') }}
          </NuxtLink>
        </span>
      </template>
    </SignIn>
    <hr>
    {{ status }}
    {{ data }}
  </div>
</template>

<script setup lang="ts">

definePageMeta({
  auth: {
    /**
     * By default, when we are not logged in and access a page then nuxt-auth would redirect us to this page
     * so we will have to set unauthenticatedOnly to true to make this page accessible
     */
    unauthenticatedOnly: false
  }
})
const i18n = useI18n()
const localePath = useLocalePath()
const { t } = i18n
const auth = useAuth()
const { status, data } = auth

function afterSignInSuccessful () {
  /**
   * By default because we set unauthenticatedOnly to true so after logging in successfully we will be redirected to home page.
   * if you want to go to a specific page then
   * set unauthenticatedOnly to false and
   * use navigateTo(localePath({ name: 'your page names' }))
   *  */
  const localePath = useLocalePath()

  navigateTo(localePath({ name: 'index' }))
}

</script>

<style lang="postcss" scoped>
.page-sign-in {
  @apply flex flex-col items-center justify-between mt-10;
}

/* To define your own style please uncommend and look into the following file */

/* @import url('../assets/components/sign-in.pcss'); */
</style>
