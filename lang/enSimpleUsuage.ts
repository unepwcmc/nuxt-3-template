/**
 * - In general, You can now do some extra fetching/anything beefore returning the translations
 * - If you don't need this extra feature then you can name this file as a .json file or just returning translations
 * - If you don't plan to change translations for any of wcmc created modules then do the following
 * - If you do require changes of WCMC Module translations then use en.ts instead
 * - WCMC Module translations are already registered when installing them so you only need to add translations used in your project
 */

export default defineI18nLocale((locale: string) => {
	return {
		title: "WCMC Nuxt 3 Template",
		someTranslations: fetchSomeTranslations(locale), // Example of how you can use this
		// These are not from rails so you can search in our wcmc created modules to see how they might be used, they must be defined here!
		apiErrorResponse: {
			"999-999-995": "Method is not supported.", // (for devs, this is used in APIs created in Nuxt Server
			"999-999-996": "Your user information was not sent by server",
			"999-999-997": "We cannot connect to the server.",
			"999-999-998": "Unknown Error Occurred.",
			"999-999-999": "Unknown Error Code. -> {code}."
		}
	}
})

function fetchSomeTranslations(locale) {
	// add async next to the fucntion
	// await $fetch(`/api/someTranslations/${locale}`).then(res => res.data)
	// Do something
	return { locale }
}
