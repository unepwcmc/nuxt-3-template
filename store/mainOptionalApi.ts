import { defineStore } from 'pinia'

/* We don't need mutation in Pinia, it is replaced by action */
export const useMainStore = defineStore('main', {
  state: () => ({
    likes: 0,
    name: 'Optional API'
  }),

  getters: {
    likesCount: state => state.likes
  },

  actions: {
    addOne (): number {
      return this.likes++
    },
    deductOne (): number {
      return this.likes--
    }
  }
})
