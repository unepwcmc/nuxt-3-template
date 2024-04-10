<template>
  <UserManagementUpdateCurrentUserPassword
    v-bind="{ defaultStyle: 1 }"
  >
    <template #beforePanel>
      <NuxtLink :to="localePath({name:'index'})">
        <span
          class="page-index__log-in-out"
          v-text="'Home'"
        />
      </NuxtLink>
    </template>
    <template #successfullySavedNewPassword>
      <NuxtLink :to="localePath({name:'index'})">
        <span
          class="page-index__log-in-out"
          v-text="'Go Home'"
        />
      </NuxtLink>
    </template>
  </UserManagementUpdateCurrentUserPassword>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
</script>
