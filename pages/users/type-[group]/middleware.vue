<template>
  <H3>Hi Your user group is {{ route.params.group }}</H3>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-me'],
});
const route = useRoute();
</script>

<style lang="scss" scoped></style>
