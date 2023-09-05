<template>
  <div>
    <p>Group: {{ route.params.group }}</p>
    <p>ID: {{ route.params.id }}</p>
  </div>
</template>
<script setup lang="ts">
const route = useRoute()
</script>
