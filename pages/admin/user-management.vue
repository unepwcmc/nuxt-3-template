<template>
  <!-- For most of users use this one. Make sure only one <UserManagementPanel /> is allowed in one page! -->
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

  <!-- Use this when you need to modify the panel. NOT RECOMMENDED!!! -->
  <UserManagementPanel
    :table-configrations="tableConfigrations"
    :edit-user-attributes="editUserAttributes"
    :create-new-user-attributes="createNewUserAttributes"
    v-bind="{
      defaultStyle: 1, // Optional, Hide this prop if you are using your own styles
      enableCreateUser:true
    }"
  />
</template>

<script setup lang="ts">
import type {
  GetEditUserAttributes,
  GetCreateNewUserAttributes
} from '@unepwcmc/user-management'
import type { InteractiveTableConfigurations } from '@unepwcmc/interactive-table'

const {
  getUserManagementTableConfig,
  getEditUserAttributes,
  getCreateNewUserAttributes
} = useWcmcUserManagement()
const i18n = useI18n()
const tableConfigrations = ref<InteractiveTableConfigurations>(
  getUserManagementTableConfig({ i18n, defaultStyle: 1 })
)
tableConfigrations.value.options.search.enable = false
tableConfigrations.value.filters?.query?.model_data.attributes.splice(1, 1) // remove first name for filter

const editUserAttributes = ref<GetEditUserAttributes>(
  getEditUserAttributes({ i18n })
)
editUserAttributes.value.splice(1, 1) // remove first name in edit user modal

// delete editUserAttributes.value[1] // remove first name in edit user modal
const createNewUserAttributes = ref<GetCreateNewUserAttributes>(
  getCreateNewUserAttributes({ i18n })
)
</script>

<!-- <style lang="postcss" scoped>

</style> -->
