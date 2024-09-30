<template>
	<LayoutFetchError
		:error-list
		:error-redirect="{
			path: localePath({ name: 'admin' }),
			title: t('button.goBackTo', { name: t('navigation.admin.index') })
		}"
	>
		<ClientOnly>
			<!-- For most of users use this one. Make sure only one <UserManagementPanel /> is allowed in one page! -->
			<UserManagementUsersList
				v-bind="{
					useDefaultStyle: 1, // Optional, Hide this prop if you are using your own styles
					enableComponents: allowedActions
				}"
				@error-occured="errorOccured"
			>
				<template
					v-if="allowedActions.seeUserDetails"
					#extraActions="dataBind"
				>
					<NuxtLink
						class="page-admin-user-users__link"
						:to="
							localePath({
								name: 'admin-user-userId',
								params: {
									userId: dataBind.row.model_data.id
								}
							})
						"
					>
						<IconArrow class="page-admin-user-users__icon" />
					</NuxtLink>
				</template>
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
					</template>
				-->
			</UserManagementUsersList>

			<!-- Use this when you need to modify the panel. NOT RECOMMENDED!!! -->
			<UserManagementUsersList
				:table-configrations="tableConfigrations"
				:create-new-user-attributes="createNewUserAttributes"
				v-bind="{
					useDefaultStyle: 1, // Optional, Hide this prop if you are using your own styles
					enableCreateUser: true
				}"
			/>
		</ClientOnly>
	</LayoutFetchError>
</template>

<script lang="ts" setup>
import type { InteractiveTableConfigurations } from "@unepwcmc/interactive-table"
import type { GetCreateNewUserAttributes } from "@unepwcmc/user-management/types"

const { policyStore } = useWcmcUserManagementPolicy()

definePageMeta({
	checkPolicies: {
		checkThesePoliciesIfCurrentUserCanDo: [
			POLICY_NAMES_LIST.USERS_DATA_LIST,
			POLICY_NAMES_LIST.USER_SHOW,
			POLICY_NAMES_LIST.CREATE_USER_WITH_ROLE,
			POLICY_NAMES_LIST.ARCHIVE_USER,
			POLICY_NAMES_LIST.UNARCHIVE_USER,
			POLICY_NAMES_LIST.ROLES_DATA_LIST
		],
		redirect: {
			whenFailedInThesePolicies: [POLICY_NAMES_LIST.USERS_DATA_LIST],
			to: { name: "index" }
		}
	}
})

/**
 * In your page if you need to do more checks before deciding if an user can visit the page or not then you can do following
 */
// const { redirectTo } = policyStore()
// // Method 1
// redirectTo({
// 	whenFailedInThesePolicies: [POLICY_NAMES_LIST.XXXXX],
// 	to: { name: "index" },
// })
// // Method 2
// const { currentUserHasThePolicies } = policyStore()

// // don't have policy A and B
// if (!currentUserHasThePolicies([
// 	POLICY_NAMES_LIST.A,
// 	POLICY_NAMES_LIST.B
// ])) {
// 	navigateTo({
// 		name: "index"
// 	})
// }
const { t } = useI18n()
useHead({
	title: t("navigation.user.users")
})
const { currentUserHasThePolicy, currentUserHasThePolicies } = policyStore()
const localePath = useLocalePath()
const allowedActions = computed(() => ({
	viewUsersList: currentUserHasThePolicy(POLICY_NAMES_LIST.USERS_DATA_LIST),
	archiveUsers: currentUserHasThePolicies([
		POLICY_NAMES_LIST.ARCHIVE_USER,
		POLICY_NAMES_LIST.UNARCHIVE_USER
	]),
	createUsers: currentUserHasThePolicies([
		POLICY_NAMES_LIST.CREATE_USER_WITH_ROLE,
		POLICY_NAMES_LIST.ROLES_DATA_LIST
	]),
	seeUserDetails: currentUserHasThePolicies([
		POLICY_NAMES_LIST.USER_SHOW,
		POLICY_NAMES_LIST.ROLES_DATA_LIST
	])
}))
const errorList = ref<string[]>([])
function errorOccured(errors: string[]) {
	errorList.value = errors
}

// The following are only needed when you are using your own table configuration
const {
	getUserManagementTableConfig,
	getCreateNewUserAttributes
} = useWcmcUserManagement()
const i18n = useI18n()
const tableConfigrations = ref<InteractiveTableConfigurations>(
	getUserManagementTableConfig({ i18n, useDefaultStyle: 1 })
)
if (tableConfigrations.value.options.search) {
	tableConfigrations.value.options.search.enable = false
}
if (tableConfigrations.value.filters?.query?.model_data) {
	tableConfigrations.value.filters?.query?.model_data.attributes.splice(1, 1) // remove first name for filter
}
const createNewUserAttributes = ref<GetCreateNewUserAttributes>(
	getCreateNewUserAttributes({ i18n })
)
</script>

<style lang="postcss" scoped>
.page-admin-user-users {
  &__link {
    @apply order-1;
  }

  &__icon {
    @apply h-8 text-theme-primary;
  }
}
</style>
