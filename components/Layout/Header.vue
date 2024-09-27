<template>
	<div class="layout-header">
		<div class="layout-header__container">
			<NuxtLink
				:to="localePath({ name: 'index' })"
			>
				<img
					class="layout-header__logo"
					src="/img/UNEP-WCMC_white.png"
				>
			</NuxtLink>
			<LayoutNavigationMobile
				v-if="isTablet|| isMobile"
				v-bind="{ links: mainMenuItems }"
				class="layout-header__menu layout-header__menu--mobile"
			/>
			<LayoutNavigationDesktop
				v-else
				v-bind="{ links: mainMenuItems }"
				class="layout-header__menu layout-header__menu--desktop"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useScreenStore } from "@/store/useScreenStore"

const localePath = useLocalePath()
const { mainMenuItems } = useNavigation()
const screenStore = useScreenStore()
const { isTablet, isMobile } = storeToRefs(screenStore)
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
    &--desktop {
      @apply hidden lg:flex;
    }

    &--mobile {
      @apply flex items-center lg:hidden;
    }
  }
}
</style>
