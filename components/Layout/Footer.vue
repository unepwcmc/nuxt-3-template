<template>
	<footer class="ct-layout-footer">
		<span class="ct-layout-footer__copyright">
			<span v-text="'&copy;'" />
			<span
				v-if="te('component.PageFooter.copyright')"
				v-text="t('component.PageFooter.copyright')"
			/>
			<span v-text="currentYear" />
		</span>
		<img
			class="ct-layout-footer__logo"
			src="/img/UNEP-WCMC_white.png"
		>
	</footer>
</template>

<script setup lang="ts">
const { t, te } = useI18n()
const currentYear = ref(new Date().getFullYear())
</script>

<style scoped lang="postcss">
.ct-layout-footer {
  @apply w-full py-3 px-4 bg-theme-primary text-white text-xs lg:flex space-y-8 lg:justify-between lg:items-center lg:space-x-24 lg:space-y-0;

  &__copyright {
    @apply flex gap-1 text-sm lg:text-base;
  }

  &__logo{
   @apply h-7;
  }
}
</style>
