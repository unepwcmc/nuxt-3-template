// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat"

export default createConfigForNuxt({
	features: {
		stylistic: {
			semi: false,
			indent: "tab", // 4 or 'tab'
			quotes: "double",
			commaDangle: "never",
			blockSpacing: true
		},
	},

}).append({
	rules: {
		"import/first": "off",
		"vue/no-multiple-template-root": "off",
		"@typescript-eslint/no-var-requires": "off",
		"vue/multi-word-component-names": 0,
		"vue/v-on-event-hyphenation": 0,
		"vue/attribute-hyphenation": 0,
		"vue/no-v-html": 0,
		"no-console": 0,
		"@stylistic/no-mixed-spaces-and-tabs": 0,
		"@stylistic/comma-dangle": "off",
	} })
