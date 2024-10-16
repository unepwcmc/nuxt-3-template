// By default creating a pinia store in composition structure is recommended
import { defineStore } from "pinia"

export const useMainCompositionStore = defineStore("MainComposition", () => {
	const compostionLikes = ref<number>(1000)
	const compostionName = ref<string>("Composition API")

	function addOneforComposition() {
		compostionLikes.value++
	}
	function deductOneforComposition() {
		compostionLikes.value--
	}

	return {
		compostionLikes,
		compostionName,
		addOneforComposition,
		deductOneforComposition
	}
})
