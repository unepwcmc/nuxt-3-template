export default defineNuxtRouteMiddleware((to, from) => {
  console.log('example of a middleware', from, to)

  // if (to.params.group === 'admin') {
  //   alert('You will not be directed to the page')
  //   return abortNavigation()
  // } else if (to.params.group === 'manager') {
  //   alert('You are being redirected to client render page')
  //   return navigateTo('/clientrender')
  // }
})
