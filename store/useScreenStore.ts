import { defineStore } from 'pinia'
import screenBreakpoints from '@/tailwind/tailwind-breakpoints.config'

const convertScreenSize = (size:string) => parseInt(String(size).replace('px', ''))
export const useScreenStore = defineStore('screenStore', () => {
  const screenBreakpointMD = convertScreenSize(screenBreakpoints.md)
  const screenBreakpointLG = convertScreenSize(screenBreakpoints.lg)
  const delay = 100 // delay between calls
  let throttled = false // are we currently throttled?
  const windowSize = ref(screenBreakpointLG)
  const isMobile = computed(() => windowSize.value < screenBreakpointMD)
  const isTablet = computed(() => windowSize.value >= screenBreakpointMD && windowSize.value < screenBreakpointLG)
  const isDesktop = computed(() => windowSize.value >= screenBreakpointLG)
  function updateScreenSize () {
    windowSize.value = window.innerWidth
  }
  onMounted(() => {
    updateScreenSize()
    window.addEventListener('resize', function () {
      // only run if we're not throttled
      if (!throttled) {
        updateScreenSize()
        // throttled
        throttled = true
        // un-throttle
        setTimeout(function () {
          throttled = false
        }, delay)
      }
    })
  })

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop
  }
})
