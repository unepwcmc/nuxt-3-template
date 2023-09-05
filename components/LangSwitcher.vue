<template>
  <ul class="ct-lang-switcher">
    <li v-for="locale in localeObj" :key="locale.code">
      <NuxtLink :to="switchLocalePath(locale.code)">
        {{ locale.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables';

const { locale, locales } = useI18n();
const localeObj: ComputedRef<LocaleObject[]> = locales as ComputedRef<
  LocaleObject[]
>;
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return localeObj.value.filter((i) => i.code !== locale.value);
});
</script>

<style lang="postcss" scoped>
.ct-lang-switcher {
  @apply flex  
    gap-4;
}
</style>
