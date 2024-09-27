<template>
	<div>
		<button @click="toggleMobileNavigation(true)">
			<IconBurger class="layout-navigation-mobile__burger" />
		</button>
		<nav
			v-if="openMobileNavigation"
			class="layout-navigation-mobile"
		>
			<button
				class="layout-navigation-mobile__go-back-button"
				@click="goBack()"
			>
				<IconArrowLeft class="layout-navigation-mobile__go-back-button-icon" />
				<span
					class="layout-navigation-mobile__go-back-button-text"
					v-text="t('button.back')"
				/>
			</button>
			<ul class="layout-navigation-mobile__items">
				<li
					v-for="(link, linkIndex) in currentMenu"
					:key="linkIndex"
					class="layout-navigation-mobile__item"
					:class="{ 'layout-navigation-mobile__item--active': route.path === link.path }"
					@click="openSubMenu(link)"
				>
					<button
						v-if="Array.isArray(link.sub)"
						class="layout-navigation-mobile__link layout-navigation-mobile__link--button"
					>
						<span v-text="link.title" />
					</button>
					<NuxtLink
						v-else
						class="layout-navigation-mobile__link"
						:to="link.path"
						@click="afterClick()"
					>
						<span v-text="link.title" />
					</NuxtLink>
				</li>
			</ul>
		</nav>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ links: MenuItem[] }>()
const route = useRoute()
const { t } = useI18n()
const openMobileNavigation = ref(false)
const subMenu = ref<MenuItem[]>([])
const currentMenu = computed(() => subMenu.value.length > 0 ? subMenu.value : props.links)
function toggleMobileNavigation(afterClick?: boolean) {
	if (afterClick !== undefined) {
		openMobileNavigation.value = afterClick
	}
	else { openMobileNavigation.value = !openMobileNavigation.value }
}
function openSubMenu(_subMenu: MenuItem) {
	if (Array.isArray(_subMenu.sub)) {
		const parentLink = { ..._subMenu }
		delete parentLink.sub
		subMenu.value = [parentLink]
		if (_subMenu.sub) {
			subMenu.value.push(..._subMenu.sub)
		}
	}
}
function afterClick() {
	openMobileNavigation.value = !openMobileNavigation.value
	subMenu.value = []
}
function goBack() {
	if (subMenu.value.length === 0) {
		toggleMobileNavigation(false)
	}
	else {
		subMenu.value = []
	}
}
</script>

<style lang="postcss" scoped>
.layout-navigation-mobile {
  @apply flex flex-col gap-[7.9rem] p-[1.5rem] z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-theme-primary text-white;

  &__burger {
    @apply w-[1.5rem] h-[1rem] text-white;
  }

  &__go-back-button {
    @apply flex gap-[0.75rem] items-center w-[4.817rem] h-[1.31rem];

    &__icon {
      @apply rotate-90 w-[0.76rem] h-[1rem];
    }
  }

  &__items {
    @apply flex flex-col h-full text-white;
  }

  &__item {
    @apply relative cursor-pointer hover:bg-theme-secondary border-b-white/25 border-b last:border-b-transparent;

    &--active {
      @apply bg-theme-secondary;
    }
  }

  &__link {
    @apply flex items-center h-full px-[1.5rem] py-[0.62rem] md:px-[0.75rem] md:py-[0.625rem];

  }

}
</style>
