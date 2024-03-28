<template>
  <div class="page-footer">
    <span
      v-if="te('component.PageFooter.copyright')"
      class="page-footer__copyright"
      v-text="t('component.PageFooter.copyright')"
    />
  </div>
</template>

<script setup lang="ts">
const { t, te } = useI18n()
</script>

<style scoped lang="postcss">
.page-footer {
  @apply py-3 px-8;
}
</style>
