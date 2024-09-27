<template>
	<div class="ct-layout-fetch-error">
		<slot v-if="errorList.length === 0" />
		<div
			v-else
			class="ct-layout-fetch-error__error"
		>
			<ul class="ct-layout-fetch-error__error--items">
				<li
					v-for="(error, index) in errorList"
					:key="`${index}wcmc-ct-user-management-panel__error-item`"
					class="ct-layout-fetch-error__error--item"
					v-text="error"
				/>
			</ul>
			<NuxtLink
				v-if="errorRedirect?.path"
				class="ct-layout-fetch-error__error--link"
				:to="errorRedirect.path"
			>
				<span v-text="errorRedirect.title" />
			</NuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
defineProps<{
	errorList: string[]
	errorRedirect?: {
		path: string
		title: string }
}>()
</script>

<style scoped lang="postcss">
 .ct-layout-fetch-error{
  &__error {
    @apply flex flex-col gap-3 h-full w-full items-center justify-center;

    &--items {
      @apply flex flex-col gap-3;
    }

    &--item {
      @apply text-base;
    }

    &--not-recognisable {
      @apply text-base;
    }

    &--link {
      @apply button__default;
    }
  }
}
</style>
