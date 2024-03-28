<template>
  <div class="default">
    <div class="nuxt nuxt__centre">
      <div class="nuxt__container">
        <slot />
        <PageFooter />
      </div>
    </div>
  </div>
</template>

<script setup>
import PageFooter from '~/components/page/footer.vue'
</script>
