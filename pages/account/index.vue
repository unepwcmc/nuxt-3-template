<template>
	<div>
		<ul>
			<li
				v-for="(adminMenuItem, index) in accountMenuItems"
				:key="`${index}adminMenuItem`"
			>
				<NuxtLink :to="adminMenuItem.path">
					<span v-text="adminMenuItem.title" />
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script setup>
const { accountMenuItems } = useNavigation()
</script>

<style lang="scss" scoped>
</style>
