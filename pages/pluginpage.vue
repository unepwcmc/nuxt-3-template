<template>
  <h4>
    Greeting helper/function in plugin:
    {{ $greetings('Yue-Long') }}
  </h4>
  <hr class="m-5" />
  <h4>Use composable function in Plugin</h4>
  <h4 v-text="$provideRandomNumber()"></h4>
</template>

<script setup lang="ts">
const { $greetings, $provideRandomNumber } = useNuxtApp();
</script>

<style lang="scss" scoped></style>
