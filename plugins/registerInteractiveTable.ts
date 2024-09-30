import { plugin } from "@unepwcmc/interactive-table"
import "@unepwcmc/interactive-table/style"
import screenBreakpoints from "../tailwind/tailwind-breakpoints.config"

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(plugin, { screenBreakpoints })
})
