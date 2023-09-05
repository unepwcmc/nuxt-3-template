<template>
  <div class="pages-language">
    <LangSwitcher />
    <h3 v-text="$t('welcome')" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'custom',
});
// const { locale } = useI18n();
</script>

<style lang="postcss" scoped>
.pages-language {
  @apply flex 
    flex-col
    gap-4;
}
</style>
