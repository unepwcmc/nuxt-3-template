declare global {
  type MenuBasic = {
  	path: string
  	title: string
  }
  type MenuItem = {
  	sub?: MenuBasic[]
  } & MenuBasic
}

export {}
