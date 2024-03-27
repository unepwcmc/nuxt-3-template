<template>
  <div>
    Test Page
    <NuxtLink :to="toSignInOutLink">
      <span class="ct-header-default__log-in-out" v-text="toSignInOutText" />
    </NuxtLink>
    <hr>
    <ClientOnly>
      <InteractiveTable
        id="interactiveTable1"
        v-model="mockData"
        class="ct-app-table__default"
        v-bind="{
          options: config.options,
          attributes: config.attributes,
          filters: config.filters,
          dataQuery: config.dataQuery
        }"
        @update-table="updateTableNoPagination"
        @update-filter-options="fetchFilters"
        @archive-restore-current-row="archiveRestoreCurrentRow"
        @edit-current-row="editCurrentRow"
      >
        <!-- Extra Action can be added to here -->
        <template #extraActions="{ row, dataQuery }">
          <span
            v-if="false"
            v-text="row"
          />
          <span
            v-if="false"
            v-text="dataQuery"
          />
        </template>
        <template #tableIsBusy>
          Loading icon
        </template>
      </InteractiveTable>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import type {
  EmitArchiveRestoreConfig,
  EmitEditCurrentRowConfig,
  EmitTableAction,
  EmitUpdateFilterOptions,
  EmitUpdateTable
} from '@unepwcmc/interactive-table/types/emit'
import { defaultValues, InteractiveTable } from '@unepwcmc/interactive-table'

const { status } = useAuth()
const localePath = useLocalePath()
const toSignInOutLink = computed(() => localePath({ name: status.value === 'authenticated' ? 'sign-out' : 'sign-in' }))
const toSignInOutText = computed(() => status.value === 'authenticated' ? 'Logout' : 'SignIn')
// function routeInternalLink(internalLinkInfo: EmitTableAction<EmitInternalLinkInfo>) {
//   console.log('routeInternalLink is called', internalLinkInfo)
// }
const { mockData, config } = useInterativeTable()
const fetchConfig = {
  server: 'http://127.0.0.1:3000',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE3MTEyMDU0NTYsImp3dF9zZWNyZXQiOiI0OWQwYTYzZDhmMWMyMGJjOTJiM2JlMDQxNzYzM2RmMSJ9.zZhOXv_nivOm2JYaLjjXTThfssP3AzJiebw-ncracRU',
    'Content-Type': 'application/json'
  }
}
function archiveRestoreCurrentRow (archiveRestoreCurrentRowInfo: EmitTableAction<EmitArchiveRestoreConfig>) {
  console.log('archiveRestoreCurrentRow', archiveRestoreCurrentRowInfo)
}
function editCurrentRow (editCurrentRowInfo: EmitTableAction<EmitEditCurrentRowConfig>) {
  console.log('editCurrentRow', editCurrentRowInfo)
}
// async function updateTable (updateTableInfo: EmitUpdateTable) {
//   console.log(updateTableInfo.dataQuery)
//   config.value.options.tableIsBusy = true
//   const dataQuery = updateTableInfo.dataQuery
//   const data = await fetch(`${fetchConfig.server}/users`, {
//     method: 'POST',
//     headers: fetchConfig.headers,
//     body: JSON.stringify(dataQuery)
//   })

//   if (data.status === 200) {
//     const responseData = await data.json()
//     mockData.value = responseData
//   }
//   console.log('Fetched')

//   config.value.options.tableIsBusy = false
// }
async function updateTableNoPagination (updateTableInfo: EmitUpdateTable) {
  console.log(defaultValues.emit)
  config.value.options.tableIsBusy = true
  const dataQuery = updateTableInfo.dataQuery
  const data = await fetch(`${fetchConfig.server}/users`, {
    method: 'POST',
    headers: fetchConfig.headers,
    body: JSON.stringify(dataQuery)
  })

  if (data.status === 200) {
    const responseData: DataType = await data.json()
    console.log(defaultValues)

    if (updateTableInfo.updateTableReason === defaultValues.emit.UPDATE_TABLE_REASONS.LOAD_MORE_DATA) {
      // make sure to add exisisting list to the 'NEW' returned list and use unshift to the front
      // or alternativelty you can do mockData.value.users.push(...responseData.users ) but you will need to also update reqeustedPage other settings etc...
      if (mockData.value) {
        responseData.users.unshift(...mockData.value.users)
      }
    }
    mockData.value = responseData
  }
  console.log('Fetched')

  config.value.options.tableIsBusy = false
}
async function fetchFilters (updateFiltersInfo: EmitUpdateFilterOptions) {
  console.log(updateFiltersInfo)
  const filters = config.value.filters
  const query = filters?.query
  if (filters && query) {
    const data = await fetch(`${fetchConfig.server}/users/available_filters`, {
      method: 'POST',
      headers: fetchConfig.headers,
      body: JSON.stringify(query)
    })
    if (data.status === 200) {
      const responseData = await data.json()
      filters.data = responseData
    }

    config.value.options.tableIsBusy = false
  } else {
    console.warn('No config provided')
  }
}
</script>

<style scoped lang="postcss">
.ct-header-default {
    @apply py-3 px-8 flex gap-3 items-center justify-between border-b-theme-primary border-b;

    &__log-in-out {
        @apply button w-32;
    }
}
</style>
