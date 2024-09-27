<template>
	<NuxtLayout>
		<div class="layout-error">
			<h2
				class="layout-error__title"
				v-text="error.statusMessage||error.message"
			/>
			<ul v-if="Array.isArray(error.data)">
				<li
					v-for="(message, index) in error.data"
					:key="`${index}errorMsg`"
				>
					<span v-text="message" />
				</li>
			</ul>
			<span
				v-else-if="error.data"
				v-text="error.data"
			/>
			<button
				class="layout-error__go-home"
				@click="handleError"
			>
				<span v-text="t('navigation.home')" />
			</button>
		</div>
	</NuxtLayout>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app"

const { t } = useI18n()
defineProps<{ error: NuxtError<string[]> }>()
const localePath = useLocalePath()
function handleError() {
	clearError({ redirect: localePath({ name: "index" }) })
}
</script>

<style lang="postcss" scoped>
.layout-error{
  @apply flex flex-col gap-10 h-full justify-center items-center;

&__title{
  @apply text-3xl;
}

  &__go-home{
    @apply button__default text-2xl;
  }
}
</style>
