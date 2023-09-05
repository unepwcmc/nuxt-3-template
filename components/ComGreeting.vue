<template>
  <h4 :class="{ 'border-2 border-blue-600': showBorder }" v-text="title" />
</template>

<script setup lang="ts">
/* add types to props */

// defineProps<{
//   title:string,
//   showBorder?:boolean,
// }>()

/* add types and default value to props */
defineProps({
  title: { type: String, default: 'Hi' },
  showBorder: { type: Boolean, default: false }
})
</script>
