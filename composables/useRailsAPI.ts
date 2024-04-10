const { data } = useAuth()
const runtimeConfig = useRuntimeConfig()

function getRailsAPIHeaders () {
  return {
    Authorization: `Bearer ${data.value.token}`,
    'Content-Type': 'application/json'
  }
}
function fetchRailsAPI (apiPath:string, config) {
  return $fetch(apiPath, { baseURL: runtimeConfig.public.RAILS_API_SERVER, headers: getRailsAPIHeaders(), ...config })
}
export default function () {
  return {
    getRailsAPIHeaders,
    fetchRailsAPI
  }
}
