<template>
  <div>
    Test Page
    <NuxtLink :to="toSignInOutLink">
      <span class="ct-header-default__log-in-out" v-text="toSignInOutText" />
    </NuxtLink>
    <hr>
    {{ status }}
  </div>
</template>

<script setup lang="ts">
const { status } = useAuth()
const localePath = useLocalePath()

const toSignInOutLink = computed(() => localePath({ name: status.value === 'authenticated' ? 'sign-out' : 'sign-in' }))
const toSignInOutText = computed(() => status.value === 'authenticated' ? 'Logout' : 'SignIn')
</script>

<style scoped lang="postcss">
.ct-header-default {
    @apply py-3 px-8 flex gap-3 items-center justify-between border-b-theme-primary border-b;

    &__log-in-out {
        @apply button w-32;
    }
}
</style>
