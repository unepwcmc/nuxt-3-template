import { usePolicyStore } from '@/store/usePolicyStore'

export default defineNuxtRouteMiddleware(async (to) => {
  const { status } = useWcmcUserManagementAuth()
  if (status.value === 'authenticated') {
    const policyStore = usePolicyStore()
    const { checkPoliciesWithServer, redirectTo } = policyStore
    const checkPolicies = to.meta.checkPolicies
    if (checkPolicies) {
      const checkThesePoliciesIfCurrentUserCanDo = checkPolicies.checkThesePoliciesIfCurrentUserCanDo ?? []
      const redirectWhenFailedInThesePolicies = checkPolicies.redirect?.whenFailedInThesePolicies
      if (Array.isArray(redirectWhenFailedInThesePolicies)) {
        // filter out the ones in redirectWhenFailedInThesePolicies that are already in checkThesePoliciesIfCurrentUserCanDo
        const policiesNotInMainList = redirectWhenFailedInThesePolicies.filter(policy => !checkThesePoliciesIfCurrentUserCanDo.includes(policy))
        // Conbine both list for checking in server
        checkThesePoliciesIfCurrentUserCanDo.push(...policiesNotInMainList)
      }
      await checkPoliciesWithServer(checkThesePoliciesIfCurrentUserCanDo)
      return redirectTo(checkPolicies.redirect)
    }
  }
})
