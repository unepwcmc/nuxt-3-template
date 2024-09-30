export default defineNuxtPlugin((/* nuxtApp */) => {
	return {
		provide: {
			greetings: (msg: string) => `Hello ${msg}!`,
			provideRandomNumber: () => {
				/* We can access composable function useExample defined in ~/composables/useExample.ts here */
				const { giveRandomNum } = useExample()
				const randomNumber = giveRandomNum()
				return `Number is: ${randomNumber.value}`
			}
		}
	}
})
