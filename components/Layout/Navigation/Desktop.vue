<template>
	<ul class="layout-navigation-desktop__items">
		<li
			v-for="(link, linkIndex) in links"
			:key="linkIndex"
			class="layout-navigation-desktop__item"
			:class="{ 'layout-navigation-desktop__item--active': route.path.includes(link.path) }"
			@mouseenter="toggleModal(link)"
			@mouseleave="toggleModal()"
		>
			<NuxtLink
				class="layout-navigation-desktop__link"
				:to="link.path"
			>
				<span v-text="link.title" />
			</NuxtLink>
			<ul
				v-show="Array.isArray(link.sub) && currentOpenSubMenu?.path === link.path"
				class="layout-navigation-desktop__sub-menu"
			>
				<li
					v-for="(subLink, index) in link.sub"
					:key="`${index}subLink`"
					class="layout-navigation-desktop__item layout-navigation-desktop__item--bottom-border"
					:class="{ 'layout-navigation-desktop__item--active': route.path.includes(subLink.path) }"
				>
					<NuxtLink
						class="layout-navigation-desktop__link"
						:to="subLink.path"
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
	links: MenuItem[]
}>()
const route = useRoute()
const currentOpenSubMenu = ref<MenuItem | undefined>()
function toggleModal(menuItem?: MenuItem) {
	currentOpenSubMenu.value = menuItem
}
</script>

<style lang="postcss" scoped>
.layout-navigation-desktop {
  &__items {
    @apply flex flex-row h-full text-white;
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
    @apply flex items-center h-full px-[0.75rem] py-[0.625rem] hover:bg-theme-secondary;

  }

  &__sub-menu {
    @apply absolute flex flex-col right-0 z-10 rounded-sm bg-theme-primary-light min-w-[20rem];
  }
}
</style>
