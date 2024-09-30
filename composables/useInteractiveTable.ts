import { ref } from "vue"
import { defaultValues } from "@unepwcmc/interactive-table"
import type { InteractiveTableConfigurations } from "@unepwcmc/interactive-table/types/config"
import type { DataQueryDataReturn } from "@unepwcmc/interactive-table/types/data"

const { HEADER_SHOW_IN_OPTIONS } = defaultValues.config
type UserModelData = {
	id: number
	email: string
	first_name: string
	last_name: string
}
type AssociatedData = {
	roles: {
		name: string
	}[]
	posts: string[]
}
const mockData = ref<DataQueryDataReturn<"users", UserModelData, AssociatedData> | undefined>()
const config = ref<InteractiveTableConfigurations>({
	attributes: [
		{
			field: "id",
			title: "ID",
			enableSorting: true,
			type: "number",
			onlyShowIn: HEADER_SHOW_IN_OPTIONS.modal
		},
		{
			field: "email",
			title: "Email",
			enableSorting: true,
			type: "number"
		},
		{
			field: "first_name",
			title: "firstname",
			enableSorting: true,
			type: "number"
		},
		{
			field: "last_name",
			title: "lastname",
			enableSorting: true,
			type: "number",
			onlyShowIn: HEADER_SHOW_IN_OPTIONS.TABLE
		},
		{
			field: "roles.name",
			title: "User Role",
			enableSorting: true
		},
		{
			field: "posts.title",
			title: "Post Title",
			enableSorting: true
		},
		{
			field: "posts.body",
			title: "Post body",
			enableSorting: true
		}
		// {
		//   field: 'aaa.fvv',
		//   title: 'aaa.fvv',
		//   enableSorting: true
		// }
	],
	options: {
		useDefaultStyle: 1,
		actions: {
			showEdit: true,
			showArchived: true,
			enableCurrentRowAllDataInModal: true
		},
		filters: {
			enable: true
		},
		search: {
			enable: true,
			debounceTimeout: 800 // default 1000 so it doesn't trigger search immediately/ too many API reuests while an user is typing
		},
		pagination: {
			enable: true,
			style: 1, // default style is 1 which is with numbers style 2 is with buttons only
			recordsPerPageSelect: {
				enable: true, // Also requires pagination -> enable to be true to see me appear
				options: [1, 2, 5, 10, 25, 50, 100] // If it was only returning 23 records then any option above 25 will not show in the select, Please avoid having more then the limit (how many entires can be returned per return) set by backend it will not cause errors but likely to confuse end users
			}
		},
		text: {
			numberOfEntriesPerPageSelect: {
				before: "",
				after: "entries per page",
				placeholder: "Select One",
				all: "All"
			},
			search: {
				before: "",
				placeholder: "Please enter a search term",
				after: ""
			},
			filters: {
				apply: "Apply",
				closeModal: "Close",
				clear: "Clear",
				hasNoOptions: "This filter has no options"
			},
			pagination: {
				withNumbering: {
					seperator: "-", // default to ... if you don't pass this
					previousPage: "Previous",
					nextPage: "Next"
				}
			},
			loadMoreData: "Load more data",
			noResult: "No Results Found",
			totalEntriesMessage: "Showing {showingFrom} - {showingTo} of {totalRecords} records",
			listValuesSeperatedBy: "||" // default to , if not present
		}
	},
	dataQuery: {
		object_name: "users",
		model_data: { attributes: ["id", "email", "first_name", "last_name", "password"] },
		associated_data: {
			roles: { attributes: ["name", "created_at"] },
			posts: { attributes: ["title", "body"] }
		},
		filters: [
		],
		sorting_by: [
		],
		search: "",
		records_per_page: 100,
		requested_page: 1
	},
	filters: {
		query: {
			model_data: {
				attributes: ["id", "email", "first_name", "password"]
			},
			associated_data: {
				roles: {
					attributes: ["name"]
				},
				posts: {
					attributes: ["title", "body"]
				}
			}
		}
	}
})

export function useInterativeTable() {
	return {
		config, mockData
	}
}
