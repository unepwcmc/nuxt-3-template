<template>
  <div class="layout-header">
    <div class="layout-header__container">
      <NuxtLink
        :to="localePath({name:'index'})"
      >
        <img
          class="layout-header__logo"
          src="/img/UNEP-WCMC_white.png"
        >
      </NuxtLink>
      <LayoutNavigationTablet
        v-bind="{links:mainMenuItems}"
        class="layout-header__menu layout-header__menu--tablet"
      />
      <LayoutNavigationMobile
        v-bind="{links:mainMenuItems}"
        class="layout-header__menu layout-header__menu--mobile"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { mainMenuItems } = useNavigation()
</script>

<style lang="postcss" scoped>
.layout-header {
  @apply z-40 h-[3rem] lg:h-[6rem] relative;

  &__container {
    @apply h-[3rem] lg:h-[6rem] fixed top-0 left-0 right-0 flex bg-theme-primary items-center justify-between px-[1rem] lg:px-[8rem] py-0;
  }

  &__link {
    @apply flex items-center;
  }

  &__logo {
    @apply h-7 lg:h-12;

  }

  &__menu {
    &--tablet {
      @apply hidden md:flex;
    }

    &--mobile {
      @apply flex items-center md:hidden;
    }
  }
}
</style>
