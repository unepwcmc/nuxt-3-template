<template>
  <div class="page-index">
    <h2
      v-if="te('title')"
      class="page-index__title"
      v-text="t('title')"
    />
    <NuxtLink :to="toSignInOutLink" class="ct-header-default__log-in-out">
      {{ toSignInOutText }}
    </NuxtLink>
    <hr>
    <div>
      <code class="whitespace-normal" v-text="status" />
      <hr>
      <code class="whitespace-normal" v-text="data" />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false
})
const { status, data } = useAuth()
const localePath = useLocalePath()
const { t, te } = useI18n()
const toSignInOutLink = computed(() => localePath({ name: status.value === 'authenticated' ? 'sign-out' : 'sign-in' }))
const toSignInOutText = computed(() => status.value === 'authenticated' ? 'Sign Out' : 'Sign In')
</script>

<style scoped lang="postcss">
.page-index {
  @apply py-3 px-8 flex flex-col gap-3 items-center justify-between border-b-theme-primary border-b;

  &__log-in-out {
    @apply button w-32;
  }
}
</style>
