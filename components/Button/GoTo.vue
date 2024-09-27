<template>
	<div class="ct-button-go-to">
		<NuxtLink
			v-if="goTo === _BUTTON_GOTO.LINK"
			class="ct-button-go-to__main ct-button-go-to__main--link"
			:to="link"
		>
			<IconArrowLeft
				class="ct-button-go-to__icon"
				:class="{ 'ct-button-go-to__icon--right': arrowPosition === 'right' }"
			/>
		</NuxtLink>
		<button
			v-else
			class="ct-button-go-to__main ct-button-go-to__main--button"
			:class="[
				`ct-button-go-to--${goTo}`

			]"
			@click="goToFn"
		>
			<IconArrowLeft
				class="ct-button-go-to__icon"
				:class="{ 'ct-button-go-to__icon--right': arrowPosition === 'right' }"
			/>
		</button>
	</div>
</template>

<script setup lang="ts">
const _BUTTON_GOTO = BUTTON_GOTO
type COMMON = {
	arrowPosition?: "left" | "right"
}
type PROPS_LINK_GOTO = {
	goTo: BUTTON_GOTO.LINK
	link: string
}
type PROPS_BUTTON_GOTO = {
	goTo?: BUTTON_GOTO.FORWARD | BUTTON_GOTO.BACKWARD
}
const props = withDefaults(defineProps<COMMON &(PROPS_LINK_GOTO | PROPS_BUTTON_GOTO)>(), {
	goTo: BUTTON_GOTO.BACKWARD,
	arrowPosition: "left",
	link: "",
})
const router = useRouter()
const link = computed(() => {
	const _props = props as COMMON & PROPS_LINK_GOTO
	return _props.link ? _props.link : ""
})
function goToFn() {
	let index = -1
	if (props.goTo === BUTTON_GOTO.FORWARD) {
		index = 1
	}
	router.go(index)
}
</script>

<style scoped lang="postcss">
.ct-button-go-to {
  @apply flex;

  &__icon {
    @apply w-6 text-theme-primary;

    &--right {
      @apply rotate-180;
    }
  }
}
</style>
