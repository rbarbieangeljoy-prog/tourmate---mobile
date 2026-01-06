import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useOnboardingStore = defineStore('onboarding', () => {
  // State
  const currentScreen = ref('splash') // 'splash', 'onboarding', 'login'
  const hasSeenOnboarding = ref(false)

  // Initialize
  const init = () => {
    const stored = localStorage.getItem('hasSeenOnboarding')
    
    if (stored === 'true') {
      hasSeenOnboarding.value = true
      currentScreen.value = 'login'
    } else {
      currentScreen.value = 'splash'
      // Auto-transition to onboarding after 5 seconds
      setTimeout(() => {
        if (currentScreen.value === 'splash') {
          currentScreen.value = 'onboarding'
        }
      }, 5000)
    }

    console.log('✅ Onboarding initialized:', currentScreen.value)
  }

  // Finish onboarding
  const finishOnboarding = () => {
    hasSeenOnboarding.value = true
    localStorage.setItem('hasSeenOnboarding', 'true')
    currentScreen.value = 'login'
    console.log('✅ Onboarding finished')
  }

  return {
    // State
    currentScreen,
    hasSeenOnboarding,
    
    // Actions
    init,
    finishOnboarding
  }
})
