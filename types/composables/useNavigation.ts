declare global {
    type MenuBasic={

        path:{name:string},
        title:string,
      }
    type MenuItem={
        sub:MenuBasic[]
      } & MenuBasic

}

export {}
