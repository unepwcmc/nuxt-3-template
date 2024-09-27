<template>
	<ButtonGoTo
		v-bind="{
			goTo: _BUTTON_GOTO.LINK,
			link: localePath({ name: 'admin-user-roles' })
		}"
	/>
	<LayoutFetchError :errorList>
		<div class="page-admin-user-role-user-role-id__container">
			<UserManagementViewUserRole
				:userRoleId="Number(currentParams.userRoleId)"
				:useDefaultStyle="1"
				:enableComponents="allowedActions"
				@errorOccured="errorOccured"
			/>
		</div>
	</LayoutFetchError>
</template>

<script lang="ts" setup>
import { usePolicyStore } from "@/store/usePolicyStore"

const _BUTTON_GOTO = BUTTON_GOTO
const { currentUserHasThePolicies, currentUserHasThePolicy } = usePolicyStore()
const { userDetails } = useWcmcUserManagementAuth()

definePageMeta({
	checkPolicies: {
		checkThesePoliciesIfCurrentUserCanDo: [
			POLICY_NAMES_LIST.LIST_POLICIES_DATA,
			POLICY_NAMES_LIST.ROLES_DATA_LIST,
			POLICY_NAMES_LIST.ASSIGN_POLICIES_TO_ROLE,
			POLICY_NAMES_LIST.USERS_DATA_LIST,
			POLICY_NAMES_LIST.ADD_ROLE_TO_USERS,
			POLICY_NAMES_LIST.REMOVE_ROLE_FROM_USERS
		],
		redirect: {
			whenFailedInThesePolicies: [
				POLICY_NAMES_LIST.LIST_POLICIES_DATA,
				POLICY_NAMES_LIST.ROLES_DATA_LIST
			],
			to: { name: "admin-user-roles" },
		}
	}
})
const { params } = useRoute()
const localePath = useLocalePath()
const { t } = useI18n()
const currentParams = computed(() => {
	return {
		params,
		userRoleId: params.userRoleId as string
	}
})
useHead({
	title: t("navigation.user.role", {
		id: currentParams.value.userRoleId
	})
})
const allowedActions = computed(() => ({
	viewPoliciesForCurrentRole: currentUserHasThePolicies([POLICY_NAMES_LIST.LIST_POLICIES_DATA, POLICY_NAMES_LIST.ROLES_DATA_LIST]),
	// A user who has user role 'X' cannot edit User role X (its own) policies
	updatePoliciesForCurrentRole: currentUserHasThePolicy(POLICY_NAMES_LIST.ASSIGN_POLICIES_TO_ROLE) && userDetails.value.user.userRoles.find(userRole => userRole.id === Number(currentParams.value.userRoleId)) === undefined,
	viewAllUsersInCurrentRole: currentUserHasThePolicy(POLICY_NAMES_LIST.USERS_DATA_LIST),
	addUsersToCurrentRole: currentUserHasThePolicy(POLICY_NAMES_LIST.ADD_ROLE_TO_USERS),
	canRevomeUsersWithCurrentRole: currentUserHasThePolicy(POLICY_NAMES_LIST.REMOVE_ROLE_FROM_USERS)
}))
const errorList = ref<string[]>([])
function errorOccured(errors: string[]) {
	errorList.value = errors
	console.log(errors)
}
</script>

<style lang="postcss" scoped>
.page-admin-user-role-user-role-id{
	&--margin-right{
		@apply mr-1;
	}

	&__container{
		@apply flex flex-col gap-6;
	}

	&__notices{
		@apply list-disc list-inside mt-10;
	}

}
</style>
