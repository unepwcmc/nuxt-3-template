import type { RouteLocationNamedRaw } from "#vue-router"

declare global {
  type MenuBasic = {
  	path: RouteLocationNamedRaw
  	title: string
  }
  type MenuItem = {
  	sub: MenuBasic[]
  } & MenuBasic
}

export {}
