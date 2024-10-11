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
	DataQueryModelAssociatedDataReturn,
	FiltersModelAssociatedData
} from "@unepwcmc/interactive-table"

import { InteractiveTable } from "@unepwcmc/interactive-table"
import type { RailsAPIErrorResponse } from "@unepwcmc/user-management/types"

const i18n = useI18n()
const config = useRuntimeConfig()
const {
	getUserManagementTableConfig,
	getRailsAPIPaths,
	getTranslationsFromRailsAPIErrorResponse
} = useWcmcUserManagement()
const { fetch } = useWcmcUserManagementRailsFetch()
const railsAPIs = getRailsAPIPaths(config)
const tableConfigurations = ref(getUserManagementTableConfig({ i18n, useDefaultStyle: 1 }))
// So you can see the table config
console.log(tableConfigurations.value)
// DataQueryModelAssociatedDataReturn the fist unknown should be the model data type, second unknown should be associated data type
type UserList = DataQueryModelAssociatedDataReturn<"users", unknown, unknown> | undefined
const usersList = ref<UserList | undefined>()
const errorList = ref< string[]>([])

async function archiveRestoreCurrentRow(archiveRestoreCurrentRowInfo: EmitTableAction<EmitArchiveRestoreConfig>) {
	setTableBusy(true)
	const row = archiveRestoreCurrentRowInfo.row.model_data
	const archiveOrRestore = archiveRestoreCurrentRowInfo.config.trueToArchiveFalseToRestore
	await fetch(railsAPIs.users.archiveRestoreUser(row.id, archiveOrRestore), {
		method: "PATCH"
	}).catch((response) => {
		alert(getTranslationsFromRailsAPIErrorResponse({ i18n, response }).toString())
	})
	archiveRestoreCurrentRowInfo.triggerUpdateTable()
	setTableBusy(false)
}
async function updateTable(updateTableInfo: EmitUpdateTable) {
	errorList.value = []
	setTableBusy(true)
	const dataQuery = updateTableInfo.dataQuery
	await fetch(railsAPIs.users.getUsers, {
		method: "POST",
		body: dataQuery
	})
		.then((data: unknown) => {
			usersList.value = data as UserList
		})
		.catch((response) => {
			errorList.value = getTranslationsFromRailsAPIErrorResponse({ i18n, response })
		})
	setTableBusy(false)
}
async function fetchFilters(/** updateFiltersInfo: EmitUpdateFilterOptions**/) {
	setTableBusy(true)
	errorList.value = []
	const filters = tableConfigurations.value.filters
	const query = filters?.query
	if (filters && query) {
		await fetch(railsAPIs.users.getAvailableFilters, {
			method: "POST",
			body: query
		}).then((data: unknown) => {
			filters.data = data as FiltersModelAssociatedData
		})
			.catch((response: RailsAPIErrorResponse) => {
				errorList.value = getTranslationsFromRailsAPIErrorResponse({ i18n, response })
			})
		setTableBusy(false)
	}
	else {
		console.warn("No config provided")
	}
}
function setTableBusy(isTableBusy: boolean) {
	tableConfigurations.value.options.tableIsBusy = isTableBusy
}
</script>
