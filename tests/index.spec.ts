import { describe, expect, test } from "vitest"
import { createPage } from "@nuxt/test-utils/e2e"
import { useSetup } from "./setup"

// TODO: this currently fails with GetPortError - not sure why
// const logger = console.log // this has to be declared here otherwise you will not be able to use it in tests. It will not show any logs
describe("Home Page", async () => {
	await useSetup().defaultSetup()

	test("Render home page", async () => {
		const page = await createPage("/en")
		const indexPageElement = page.locator(".page-index")

		expect(await indexPageElement.innerText()).toContain("WCMC Nuxt 3 Template")
	})
})
