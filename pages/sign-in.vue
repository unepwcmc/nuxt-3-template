<template>
  <div class="page-sign-in">
    <UserManagementSignIn
      class="page-sign-in__component"
      v-bind="{
        defaultStyle: 1, // Optional, Hide this prop if you are using your own styles
        redirectLinkAfterSignIn // Optional, You can set redirectLinkAfterSignIn with the path i,e localePath({ name: 'test' }, localePath('test')
      }"
      @after-signin-successful="afterSignInSuccessful"
    >
      <template #passwordResetLink>
        <span class="page-sign-in__password-reset">
          <span class="page-sign-in__password-reset--title" v-text="t('signIn.passwordReset.title')" />
          <NuxtLink class="page-sign-in__password-reset--link" :to="localePath({ name: 'password-reset' })">
            <span v-text="t('signIn.passwordReset.link') " />
          </NuxtLink>
        </span>
      </template>
    </UserManagementSignIn>
    <NuxtLink class="page-sign-in__password-reset--link" :to="localePath({ name: 'password-reset' })">
      <span v-text="t('signIn.passwordReset.link') " />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: {
    /**
     * By default, when we are not logged in and access a page then nuxt-auth would redirect us to this page
     * so we will have to set unauthenticatedOnly to true to make this page accessible
     */
    unauthenticatedOnly: true
  }
})
const i18n = useI18n()
const { t } = i18n
const localePath = useLocalePath()
const redirectLinkAfterSignIn = computed(() => localePath({ name: 'test' }))
function afterSignInSuccessful () {
  /**
   * By default because we set unauthenticatedOnly to true so after logging in successfully we will be redirected to home page.
   * if you want to go to a specific page then either
   * set redirectLinkAfterSignIn with the path i,e localePath({ name: 'test' }, localePath('test')
   * or
   * set unauthenticatedOnly to false and
   * put navigateTo(localePath({ name: 'your page names' })) in this function
   *  */
  // const localePath = useLocalePath()
  // navigateTo(localePath({ name: 'index' }))
}
</script>

<style lang="postcss" scoped>
/* To define your own style please uncommend and look into the following file */

/* @import url('@/assets/css/components/sign-in.pcss'); */

.page-sign-in {
  @apply flex flex-col items-center justify-between mt-10;

  &__password-reset {
    @apply flex gap-1;
  }
}

</style>
