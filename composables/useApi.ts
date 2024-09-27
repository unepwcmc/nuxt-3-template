const getAPIPaths = {
	post: {
		policies: {
			check_user_user_allowed: "/policies/check_user_policies"
		}
	}
} as const
export function useApi() {
	return {
		getAPIPaths,
	}
}
