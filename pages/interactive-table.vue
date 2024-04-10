<template>
  <div>
    <ClientOnly v-if="errorList.length === 0">
      <InteractiveTable
        id="interactiveTable1"
        v-model="usersList"
        v-bind="tableConfigurations"
        @update-table="updateTable"
        @update-filter-options="fetchFilters"
        @archive-restore-current-row="archiveRestoreCurrentRow"
      />
    </ClientOnly>
    <ul
      v-else
      class="wcmc-ct-user-management-panel__errors"
    >
      <li
        v-for="(error, index) in errorList"
        :key="`${index}wcmc-ct-user-management-panel__error`"
        class="wcmc-ct-user-management-panel__error"
        v-text="error"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type {
  EmitArchiveRestoreConfig,
  EmitTableAction,
  EmitUpdateTable,
  DataQueryDataReturn
} from '@unepwcmc/interactive-table'
import type {
  UsersAssociatedData,
  UsersModelData
} from '@unepwcmc/user-management'
import { InteractiveTable } from '@unepwcmc/interactive-table'

const { t } = useI18n()
const config = useRuntimeConfig()
const {
  getUserManagementTableConfig,
  getRailsAPIPaths,
  getTranslationsFromRailsAPIErrorResponse
} = useWcmcUserManagement()
const { fetchRailsAPI } = useRailsAPI()
const railsAPIs = getRailsAPIPaths(config)
const tableConfigurations = ref(getUserManagementTableConfig({ i18n: t, defaultStyle: 1 }))
const usersList = ref<DataQueryDataReturn<'users', UsersModelData, UsersAssociatedData> | undefined>()
const errorList: string[] = ref([])

async function archiveRestoreCurrentRow (archiveRestoreCurrentRowInfo: EmitTableAction<EmitArchiveRestoreConfig>) {
  setTableBusy(true)
  const row = archiveRestoreCurrentRowInfo.row.model_data as UserModelData
  const archiveOrRestore = archiveRestoreCurrentRowInfo.config.trueToArchiveFalseToRestore
  await fetchRailsAPI(railsAPIs.users.archiveRestoreUser(row.id, archiveOrRestore), {
    method: 'PATCH'
  }).catch((error) => {
    alert(getTranslationsFromRailsAPIErrorResponse(t, error).toString())
  })
  archiveRestoreCurrentRowInfo.triggerUpdateTable()
  setTableBusy(false)
}
async function updateTable (updateTableInfo: EmitUpdateTable) {
  errorList.value = []
  setTableBusy(true)
  const dataQuery = updateTableInfo.dataQuery
  await fetchRailsAPI(railsAPIs.users.getUsers, {
    method: 'POST',
    body: dataQuery
  })
    .then((data) => {
      usersList.value = data
    })
    .catch((error) => {
      errorList.value = getTranslationsFromRailsAPIErrorResponse(t, error)
    })
  setTableBusy(false)
}
async function fetchFilters (/** updateFiltersInfo: EmitUpdateFilterOptions**/) {
  setTableBusy(true)
  errorList.value = []
  const filters = tableConfigurations.value.filters
  const query = filters?.query
  if (filters && query) {
    await fetchRailsAPI(railsAPIs.users.getAvailableFilters, {
      method: 'POST',
      body: query
    }).then((data) => {
      filters.data = data
    })
      .catch((error) => {
        errorList.value = getTranslationsFromRailsAPIErrorResponse(t, error)
      })
    setTableBusy(false)
  } else {
    console.warn('No config provided')
  }
}
function setTableBusy (isTableBusy) {
  tableConfigurations.value.options.tableIsBusy = isTableBusy
}
</script>
