import { usePolicyStore } from "@/store/usePolicyStore"

/**
	 * Be careful as we don't do await (in setup) for checkPolicies
	 * If anything (menu items) you don't want people to see before policiesCurrentUserHas is updated then you need to return empty first.
	 * We include POLICY_NAMES_LIST.DRAFT_ICCAS_DATA_LIST here so we can check if ICCA is allowed in allDataSourcesInformation
	 * If policy check is needed for any menu items below then you need to add it to checkPolicies() otherwise it will never show up!!!!
	 *  */
function checkPolicies() {
	const policyStore = usePolicyStore()
	const { checkPoliciesWithServer } = policyStore
	const { status } = useWcmcUserManagementAuth()
	if (status.value === "authenticated") {
		checkPoliciesWithServer([POLICY_NAMES_LIST.USERS_DATA_LIST, POLICY_NAMES_LIST.ROLES_DATA_LIST])
	}
}
function getAdminMenuItems() {
	const { t } = useI18n()
	const policyStore = usePolicyStore()
	const localePath = useLocalePath()
	const { policiesCurrentUserHas } = storeToRefs(policyStore)
	return computed<MenuItem[]>(() => {
		const _adminMenuItems: MenuItem[] = []
		if (policiesCurrentUserHas.value.includes(POLICY_NAMES_LIST.USERS_DATA_LIST)) {
			_adminMenuItems.push({
				path: localePath({ name: "admin-users" }),
				title: t("navigation.admin.userManagement")
			})
		}
		if (policiesCurrentUserHas.value.includes(POLICY_NAMES_LIST.ROLES_DATA_LIST)) {
			_adminMenuItems.push({
				path: localePath({ name: "admin-user-roles" }),
				title: t("navigation.admin.userRoles")
			})
		}
		return _adminMenuItems
	})
}
function getAccountItems() {
	const { t } = useI18n()
	const localePath = useLocalePath()
	const { userDetails } = useWcmcUserManagementAuth()
	return computed<MenuItem[]>(() => {
		const _accountMenuItems = []
		if (!userDetails.value.user.isSsoSignedIn) {
			_accountMenuItems.push({
				path: localePath({ name: "account-update-password" }),
				title: t("navigation.account.updatePassword")
			})
		}
		return _accountMenuItems
	})
}
function getMainMenuItems({
	adminMenuItems,
	accountMenuItems
}: {
	adminMenuItems: ComputedRef<MenuItem[]>
	accountMenuItems: ComputedRef<MenuItem[]>
}) {
	const { status } = useWcmcUserManagementAuth()
	const { t } = useI18n()
	const localePath = useLocalePath()
	return computed<MenuItem[]>(() => {
		const _mainMenuItems: MenuItem[] = []
		if (status.value === "authenticated") {
			if (accountMenuItems.value.length > 0) {
				_mainMenuItems.push({
					path: localePath({ name: "account" }),
					title: t("navigation.account.index"),
					sub: accountMenuItems.value
				})
			}
			if (adminMenuItems.value.length > 0) {
				_mainMenuItems.push({
					path: localePath({ name: "admin" }),
					title: t("navigation.admin.index"),
					sub: adminMenuItems.value
				})
			}
		}

		_mainMenuItems.push({
			path: localePath({
				name: status.value === "authenticated" ? "sign-out" : "sign-in"
			}),
			title:
        status.value === "authenticated"
        	? t("navigation.signOut")
        	: t("navigation.signIn")
		})

		return _mainMenuItems
	})
}
export function useNavigation() {
	/**
	 * Be careful as we don't await for checkPolicies
	 * If anything (menu items) you don't want people to see before policiesCurrentUserHas is updated then you need to return empty first.
	 * If policy check is needed for any menu items below then you need to add it to checkPolicies() otherwise it will never show up!!!!
	 *  */
	checkPolicies()
	const adminMenuItems = getAdminMenuItems()
	const accountMenuItems = getAccountItems()
	const mainMenuItems = getMainMenuItems({
		adminMenuItems,
		accountMenuItems
	})
	return {
		adminMenuItems,
		accountMenuItems,
		mainMenuItems
	}
}
