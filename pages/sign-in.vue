<template>
  <div class="page-sign-in">
    <SignIn
      class="page-sign-in__component"
      v-bind="{
        defaultStyle: 1
      }"
      @after-sign-in-successful="afterSignInSuccessful"
    >
      <template #passwordResetLink>
        <span
          v-if="passwordReset"
          class="page-sign-in__password-reset"
        >
          <span
            class="page-sign-in__password-reset--title"
            v-text="t('wcmcUserManagement.signIn.passwordReset.title')"
          />

          <NuxtLink
            class="page-sign-in__password-reset--link"
            :to="localePath(passwordReset)"
          >
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

// import { navigateTo } from '#app'

definePageMeta({
  auth: {
    /**
     * By default, when we are not logged in and access a page then nuxt-auth would redirect us to this page
     * so we will have to set unauthenticatedOnly to true to make this page accessible
     */
    unauthenticatedOnly: true
  }
})
const config = useRuntimeConfig()
const i18n = useI18n()
const localePath = useLocalePath()
const { t } = i18n
const { status, data } = useAuth()
const passwordReset = config.public.authPages?.passwordReset
function afterSignInSuccessful () {
  /**
   * By default because we set unauthenticatedOnly to true so after logging in successfully we will be redirected to home page.
   * if you want to go to a specific page then
   * set unauthenticatedOnly to false and
   * use navigateTo(localePath({ name: 'your page names' }))
   *  */
  // const localePath = useLocalePath()
  // navigateTo(localePath({ name: 'test' }))
}
</script>
<style lang="postcss" scoped>
.page-sign-in {
  @apply flex flex-col items-center justify-between mt-10;
}

:deep(.page-sign-in__component) {
  /*  For styling the sign in component you can do the following
      - find class names using dev tool and define your styling below
      - use pre defined styling
      - use both above together (but you might end up using a lot !important)

      * If you would like to use default style then set defaultStyle to 1 (Currently only one style is created)
       <SignIn :defaultStyle="1"  />
  */
  .page-sign-in__title {

  }

  .page-sign-in__panel {
    @apply w-[40rem];
  }
}
</style>
