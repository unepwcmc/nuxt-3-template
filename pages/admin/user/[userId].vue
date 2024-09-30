<template>
	<ButtonGoTo
		v-bind="{
			goTo: _BUTTON_GOTO.LINK,
			link: localePath({
				name: 'admin-users'
			})
		}"
	/>
	<ClientOnly>
		<LayoutFetchError
			:errorList
			:errorRedirect="{
				path: localePath({ name: 'admin-user-roles' }),
				title: t('button.goBackTo', { name: t('navigation.admin.userRoles') })
			}"
		>
			<UserManagementUsersEditUserInfo
				:userId="Number(currentParams.userId)"
				:useDefaultStyle="1"
				:enableComponents="allowedActions"
				@errorOccured="errorOccured"
			/>
		</LayoutFetchError>
	</ClientOnly>
</template>

<script setup lang="ts">
const _BUTTON_GOTO = BUTTON_GOTO
const { params } = useRoute()
const localePath = useLocalePath()
const { userDetails } = useWcmcUserManagementAuth()
const { t } = useI18n()
const { policyStore } = useWcmcUserManagementPolicy()
const { currentUserHasThePolicy } = policyStore()
const currentParams = computed(() => {
	return {
		params,
		userId: params.userId as string
	}
})
const errorList = ref<string[]>([])
function errorOccured(errors: string[]) {
	errorList.value = errors
}
useHead({
	title: t("navigation.user.index", {
		id: currentParams.value.userId
	})
})
definePageMeta({
	checkPolicies: {
		checkThesePoliciesIfCurrentUserCanDo: [
			POLICY_NAMES_LIST.USER_SHOW,
			POLICY_NAMES_LIST.ROLES_DATA_LIST,
			POLICY_NAMES_LIST.UPDATE_USER_WITH_ROLE,
			POLICY_NAMES_LIST.LIST_POLICIES_DATA,
			POLICY_NAMES_LIST.ASSIGN_POLICIES_TO_USER
		],
		redirect: {
			whenFailedInThesePolicies: [
				POLICY_NAMES_LIST.USER_SHOW,
				POLICY_NAMES_LIST.ROLES_DATA_LIST
			],
			to: { name: "admin-users" },
		}
	}
})
const allowedActions = computed(() => ({
	updateCurrentUserDetails: currentUserHasThePolicy(POLICY_NAMES_LIST.UPDATE_USER_WITH_ROLE),
	viewPoliciesForCurrentUser: currentUserHasThePolicy(POLICY_NAMES_LIST.LIST_POLICIES_DATA),
	updatePoliciesToCurrentUser: currentUserHasThePolicy(POLICY_NAMES_LIST.ASSIGN_POLICIES_TO_USER),
	updateUserRoles: userDetails.value.user.id !== Number(currentParams.value.userId)
}))
</script>
