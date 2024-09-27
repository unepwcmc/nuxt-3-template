<template>
	<div />
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { signOut } = useAuth()

onBeforeMount(async () => {
	// When coming from other pages then it will either sign out and redirect to the page you set or redirect to signin page (if not logged in)
	await signOut({ callbackUrl: localePath({ name: "index" }) })
})
</script>
