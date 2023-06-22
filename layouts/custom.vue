<template>
  <div class="class-in-tailwindcss">
    <nuxt-link class="mx-3" :to="{ path: '/' }"
      ><button>Home</button></nuxt-link
    >

    <h4 class="text-center mb-4">
      I am a Header this is a custom layout which is grey backgroud
    </h4>
    <hr class="mb-10 border-white" />
    <div class="nuxt">
      <slot />
    </div>
  </div>
</template>
