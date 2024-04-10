<template>
  <div class="page-index">
    <h1
      v-if="te('title')"
      class="page-index__title"
      v-text="t('title')"
    />

    <hr>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false
})
const { status, data } = useAuth()
const { t, te } = useI18n()
console.log(status.value, data.value)
</script>

<style scoped lang="postcss">
.page-index {
  @apply py-3 px-8 flex flex-col gap-3 items-center justify-between border-b-theme-primary border-b;

  &__title{
    @apply text-2xl;
  }

  &__log-in-out {
    @apply button w-40 ;
  }
}
</style>
