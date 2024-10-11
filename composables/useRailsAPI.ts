const { userDetails } = useWcmcUserManagementAuth()
const runtimeConfig = useRuntimeConfig()

function getRailsAPIHeaders() {
	return {
		"Authorization": `Bearer ${userDetails.value.user.token}`,
		"Content-Type": "application/json"
	}
}
function fetchRailsAPI(apiPath: string, config: Record<string, unknown>) {
	return $fetch(apiPath, { baseURL: runtimeConfig.public.RAILS_API_SERVER as string, headers: getRailsAPIHeaders(), ...config })
}
// The fetch below does exactly the same thing so if you don't need anything special you can use the one below
// const { fetch } = useWcmcUserManagementRailsFetch()
export default function () {
	return {
		getRailsAPIHeaders,
		fetchRailsAPI
	}
}
