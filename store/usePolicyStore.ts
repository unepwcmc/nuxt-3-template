import type { RailsAPIErrorResponse } from "@unepwcmc/user-management/types"
import { defineStore } from "pinia"
import type { FetchResponse } from "ofetch"

export const usePolicyStore = defineStore("usePolicyStore", () => {
	const policiesCurrentUserHas = ref<POLICY_NAMES_LIST[]>([])
	const policiesCurrentUserCannotDo = ref<POLICY_NAMES_LIST[]>([]) // This is only for testing
	const policiesNotRecognised = ref<POLICY_NAMES_LIST[]>([])
	const fetchErrors = ref<string[]>()
	const localePath = useLocalePath()
	function updatePoliciesList(canAccessList: POLICY_NAMES_LIST[], canNotAccessList: POLICY_NAMES_LIST[]) {
		// Add canAccessList to can access list
		for (const policy of canAccessList) {
			if (!policiesCurrentUserHas.value.includes(policy)) {
				policiesCurrentUserHas.value.push(policy)
			}
		}
		// Add canNotAccessList to can't access list
		for (const policy of canNotAccessList) {
			if (!policiesCurrentUserCannotDo.value.includes(policy)) {
				policiesCurrentUserCannotDo.value.push(policy)
			}
		}
		// filter out the policies that are not allowed but in the allowed list to triple check in case there is a policy already in the allowed list that are not allowed now
		// If this happened the other way round then user has to refresh their page in order for the list to be cleared and start fresh.
		policiesCurrentUserHas.value = policiesCurrentUserHas.value.filter(policyCurrentUserHas => !canNotAccessList.includes(policyCurrentUserHas))
	}
	// This should be only used here within store don't make it export this is supposed to be testing usuage only
	function currentUserDoNotHaveThePolicy(policy: POLICY_NAMES_LIST) {
		return policiesCurrentUserCannotDo.value.includes(policy)
	}
	function currentUserHasThePolicy(policy: POLICY_NAMES_LIST) {
		const _currentUserHasThePolicy = policiesCurrentUserHas.value.includes(policy)
		if (!currentUserDoNotHaveThePolicy(policy) && !_currentUserHasThePolicy) {
			console.warn(`The policy '${policy}'has not been checked by server. Did you add it to checkThesePoliciesIfCurrentUserCanDo in definePageMeta`)
		}
		return _currentUserHasThePolicy
	}
	function currentUserHasThePolicies(policies: POLICY_NAMES_LIST[]) {
		for (const policy of policies) {
			const _currentUserHasThePolicy = policiesCurrentUserHas.value.includes(policy)
			if (!currentUserDoNotHaveThePolicy(policy) && !_currentUserHasThePolicy) {
				console.warn(`The policy '${policy}'has not been checked by server. Did you add it to checkThesePoliciesIfCurrentUserCanDo in definePageMeta`)
			}
			if (!_currentUserHasThePolicy) {
				return false
			}
		}
		return true
	}
	async function checkPoliciesWithServer(policies: POLICY_NAMES_LIST[]) {
		const { fetch } = useWcmcUserManagementRailsFetch()
		const { $i18n: i18n } = useNuxtApp()
		const { getTranslationsFromRailsAPIErrorResponse } = useWcmcUserManagement()
		const { getAPIPaths } = useApi()
		fetchErrors.value = []
		const policiesNotCheckedWithServerYet = policies.filter(policy => !(policiesCurrentUserHas.value.includes(policy) || policiesCurrentUserCannotDo.value.includes(policy)))
		// We only call server when any policies are not checked before yet
		if (policiesNotCheckedWithServerYet.length > 0) {
			await fetch(getAPIPaths.post.policies.check_user_user_allowed, {
				method: "POST",
				body: { policy_names: policies },
				onRequestError({ error }: { error: RailsAPIErrorResponse }) {
					throw createError<string[]>({
						statusCode: 404,
						statusMessage: i18n.t("nuxtError.checkPoliciesFailed"),
						data: getTranslationsFromRailsAPIErrorResponse({ i18n, response: error })
					})
				},
				onResponseError({ response }: { response: RailsAPIErrorResponse }) {
					throw createError<string[]>({
						statusCode: 404,
						statusMessage: i18n.t("nuxtError.checkPoliciesFailed"),
						data: getTranslationsFromRailsAPIErrorResponse({ i18n, response })
					})
				},
				onResponse({ response }: {
					response: FetchResponse<{
						can_access: POLICY_NAMES_LIST[]
						not_allowed: POLICY_NAMES_LIST[]
						not_recognised: string[]
					}> }) {
					if (response.ok) {
						if (response._data) {
							const { can_access: CanAccess, not_allowed: notAllowed, not_recognised: notRecognised } = response._data
							updatePoliciesList(CanAccess, notAllowed)
							if (notRecognised.length > 0) {
								console.warn(i18n.t("warning.policiesNotRecognised"))
							}
						}
						else {
							throw createError<string[]>({
								statusCode: 404,
								statusMessage: i18n.t("nuxtError.checkPoliciesFailed"),
								data: [i18n.t("apiErrorResponse.999-999-998")]
							})
						}
					}
				}
			})
		}
		// console.log("checked with server these policies", policies)
		return Promise.resolve(policiesCurrentUserHas.value)
	}
	function redirectTo(redirectInfo?: PolicyCheckFailedRedirect) {
		if (Array.isArray(redirectInfo?.whenFailedInThesePolicies)) {
			// if any policies that are in whenFailedInThesePolicies current user cannot do them then redirect to redirectPath provided
			for (const redirectWhenFailedThePolicy of redirectInfo.whenFailedInThesePolicies) {
				if (!policiesCurrentUserHas.value.includes(redirectWhenFailedThePolicy)) {
					const homePagePath = localePath({ name: "index" })
					const redirectPath = redirectInfo.to ? localePath(redirectInfo.to) : null
					if (redirectPath) {
						return navigateTo(redirectPath)
					}
					// If redirectPath provided not found then redirect to home
					else if (homePagePath) {
						console.log("The redirect path provided is not recognised so redirecting to home page.")
						return navigateTo(redirectPath)
					}
					else {
						console.log("The redirect path provided is not recognised and second choice home page path is not set correctly in UsePolicyStore so redirect to '/'.")
						return navigateTo("/")
					}
				}
			}
		}
	}
	return {
		policiesCurrentUserHas,
		policiesCurrentUserCannotDo,
		policiesNotRecognised,
		fetchErrors,
		updatePoliciesList,
		currentUserHasThePolicy,
		currentUserHasThePolicies,
		checkPoliciesWithServer,
		redirectTo

	}
})
