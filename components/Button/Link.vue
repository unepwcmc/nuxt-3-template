<template>
	<NuxtLink
		:class="props.class"
		class="ct-click-button"
		:to="props.to"
		@mouseover="isHovering = true"
		@mouseleave="isHovering = false"
	>
		<slot />
		<span />
		<IconArrowRight
			class="animate__animated ct-click-button__arrow"
			:class="getArrowClass"
		/>
	</NuxtLink>
</template>

<script setup lang="ts">
type ClassType = { [key: string]: boolean }
const props = defineProps<{
	class?: ClassType | string
	arrowClass?: ClassType | string
	disabled?: boolean
	to: string
}>()
const isHovering = ref(false)
const getArrowClass = computed(() => {
	let _arrowClass: ClassType = {
		animate__slideInLeft: isHovering.value && !props.disabled,
	}
	if (typeof props.arrowClass === "string") {
		_arrowClass[props.arrowClass] = true
	}
	else if (typeof props.arrowClass === "object") {
		_arrowClass = { ..._arrowClass, ...props.arrowClass }
	}
	return _arrowClass
})
</script>

<style scoped lang="postcss">
.ct-click-button {
    @apply text-base button__default flex gap-2;

    &__arrow {
        @apply w-4;
    }
}
</style>
