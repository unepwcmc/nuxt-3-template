<template>
  <UserManagementPanel
    v-bind="{
      defaultStyle: 1, // Optional, Hide this prop if you are using your own styles
      enableCreateUser:true
    }"
  >
    <!--
    <template #iconCreateNewUser />
    <template #iconCloseCreateUserPanel />
    <template #iconSortingDefault />
    <template #iconSortingAscending />
    <template #iconSortingDescending />
    <template #iconSearch />
    <template #iconArchive />
    <template #iconRestore />
    <template #iconEditRecord />
    <template #iconSeeDataInModal />
    <template #iconCloseDataEditModal />
    <template #iconPaginationFirstPage="iconPaginationFirstPage">
      {{ iconPaginationFirstPage }}
    </template>
    <template #iconPaginationPreviousPage="iconPaginationPreviousPage">
      {{ iconPaginationPreviousPage }}
    </template>
    <template #iconPaginationNextPage="iconPaginationNextPage">
      {{ iconPaginationNextPage }}
    </template>
    <template #iconPaginationLastPage="iconPaginationLastPage">
      {{ iconPaginationLastPage }}
    </template> -->
  </UserManagementPanel>
</template>

<script setup lang="ts">
</script>

<!-- <style lang="postcss" scoped>

</style> -->
