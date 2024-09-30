import { defineConfig } from "vitest/config"

export default defineConfig({
	// resolver: {
	//   conditions: process.env.VITEST ? ['development'] : undefined
	// },
	test: {
		globals: true,
		/**
     * Sometimes you might need to increase the time default is set to 30000 I think.
     */
		testTimeout: 200000
	}
})
