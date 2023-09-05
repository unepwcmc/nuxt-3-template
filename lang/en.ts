export default defineI18nLocale((locale: string) => {
  console.log(locale)

  return {
    welcome: 'Welcome'
  }
  // return $fetch(`/api/${locale}`)
})

// or

//   export default {
//     welcome: 'Welcome'
//   }
