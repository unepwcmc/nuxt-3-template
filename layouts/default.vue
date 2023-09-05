<template>
  <div class="default">
    <nuxt-link
      class="mx-3"
      :to="{ path: '/' }"
    >
      <button>Home</button>
    </nuxt-link>
    <h4 class="text-center">
      I am a Header this is the default layout which is white background
    </h4>
    <hr class="mb-10">
    <div class="nuxt">
      <slot />
    </div>
  </div>
</template>
