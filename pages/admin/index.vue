<template>
	<div>
		<ul>
			<li
				v-for="(adminMenuItem, index) in adminMenuItems"
				:key="`${index}adminMenuItem`"
			>
				<NuxtLink :to="adminMenuItem.path">
					<span v-text="adminMenuItem.title" />
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
const { adminMenuItems } = useNavigation()
const localePath = useLocalePath()

watchEffect(() => {
	if (adminMenuItems.value.length === 0) {
		navigateTo(localePath({ name: "index" }))
	}
})
</script>

<style lang="scss" scoped>

</style>
