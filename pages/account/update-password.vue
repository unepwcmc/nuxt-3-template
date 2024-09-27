<template>
  <div class="page-account-update-password">
    <UserManagementUpdateCurrentUserPassword
      :use-default-style="1"
    >
      <template #beforePanel>
        <NuxtLink :to="localePath({ name: 'index' })">
          <span
            class="page-index__log-in-out"
            v-text="'Home'"
          />
        </NuxtLink>
      </template>
      <template #successfullySavedNewPassword>
        <NuxtLink :to="localePath({ name: 'index' })">
          <span
            class="page-index__log-in-out"
            v-text="'Go Home'"
          />
        </NuxtLink>
      </template>
    </UserManagementUpdateCurrentUserPassword>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()
useHead({
  title: t('navigation.account.updatePassword')
})
</script>

<style lang="postcss" scoped>
.page-account-update-password{
  @apply h-full flex flex-col justify-center items-center;
}
</style>
