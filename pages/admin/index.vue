<template>
  <div>
    <ul>
      <li
        v-for="(adminMenuItem,index) in adminMenuItems"
        :key="`${index}adminMenuItem`"
      >
        <NuxtLink :to="localePath(adminMenuItem.path)">
          <span v-text="adminMenuItem.title" />
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { adminMenuItems } = useNavigation()
const localePath = useLocalePath()
</script>

<style lang="scss" scoped>

</style>
