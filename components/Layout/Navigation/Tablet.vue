<template>
  <ul class="layout-navigation-tablet__items">
    <li
      v-for="(link, linkIndex) in links"
      :key="linkIndex"
      class="layout-navigation-tablet__item"
      :class="{ 'layout-navigation-tablet__item--active': route.path.includes(localePath(link.path)) }"
      @mouseenter="toggleModal(link)"
      @mouseleave="toggleModal()"
    >
      <NuxtLink
        class="layout-navigation-tablet__link"
        :to="localePath(link.path)"
      >
        <span v-text="link.title" />
      </NuxtLink>
      <ul
        v-show="Array.isArray(link.sub) && currentOpenSubMenu === link"
        class="layout-navigation-tablet__sub-menu"
      >
        <li
          v-for="(subLink, index) in link.sub"
          :key="`${index}subLink`"
          class="layout-navigation-tablet__item layout-navigation-tablet__item--bottom-border"
          :class="{ 'layout-navigation-tablet__item--active': route.path === localePath(subLink.path) }"
        >
          <NuxtLink
            class="layout-navigation-tablet__link"
            :to="localePath(subLink.path)"
          >
            <span v-text="subLink.title" />
          </NuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  links: MenuItem[],
  isMobile?: boolean
}>()
const route = useRoute()
const localePath = useLocalePath()
const currentOpenSubMenu = ref<MenuItem | undefined>()
function toggleModal (menuItem: MenuItem | undefined) {
  currentOpenSubMenu.value = menuItem
}
</script>

<style lang="postcss" scoped>
.layout-navigation-tablet {
  &__items {
    @apply flex flex-col md:flex-row h-full text-white;
  }

  &__item {
    @apply relative cursor-pointer;

    &--bottom-border {
      @apply border-b-white/25 border-b last:border-b-transparent;
    }

    &--active {
      @apply bg-theme-secondary;
    }
  }

  &__link {
    @apply flex items-center h-full px-[1.5rem] py-[0.62rem] md:px-[0.75rem] md:py-[0.625rem] hover:bg-theme-secondary;

  }

  &__sub-menu {
    @apply absolute flex flex-col right-0 z-10 rounded-sm bg-theme-primary-light min-w-[20rem];
  }
}
</style>
