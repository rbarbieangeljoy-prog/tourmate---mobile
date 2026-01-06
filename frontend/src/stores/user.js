import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const userProfile = ref({
    firstName: '',
    lastName: '',
    email: '',
    location: 'Butuan City, Philippines',
    avatar: '/images/profilepicture.png'
  })

  const isAuthenticated = ref(false)

  // Computed
  const fullName = computed(() => {
    const first = userProfile.value.firstName
    const last = userProfile.value.lastName
    
    if (first && last) {
      return `${first} ${last}`
    } else if (first) {
      return first
    } else if (last) {
      return last
    }
    return 'User'
  })

  const displayName = computed(() => {
    return userProfile.value.firstName || fullName.value
  })

  const initials = computed(() => {
    const first = userProfile.value.firstName?.charAt(0) || ''
    const last = userProfile.value.lastName?.charAt(0) || ''
    return (first + last).toUpperCase() || 'U'
  })

  const hasCompleteProfile = computed(() => {
    return !!(
      userProfile.value.firstName &&
      userProfile.value.lastName &&
      userProfile.value.email &&
      userProfile.value.location
    )
  })

  // Actions
  const updateFromSignup = (data) => {
    if (!data || !data.email) {
      console.error('Invalid signup data')
      return false
    }

    userProfile.value.firstName = data.firstName || ''
    userProfile.value.lastName = data.lastName || ''
    userProfile.value.email = data.email
    
    if (data.location) {
      userProfile.value.location = data.location
    }

    isAuthenticated.value = true
    saveToLocalStorage()
    
    console.log('✅ User profile created from signup')
    return true
  }

  const updateProfile = (updates) => {
    if (!updates || typeof updates !== 'object') {
      console.error('Invalid profile updates')
      return false
    }

    userProfile.value = {
      ...userProfile.value,
      ...updates
    }

    saveToLocalStorage()
    console.log('✅ User profile updated')
    return true
  }

  const loadFromLocalStorage = () => {
    try {
      const savedProfile = localStorage.getItem('userProfile')
      const savedAuth = localStorage.getItem('isAuthenticated')
      
      if (savedProfile) {
        const data = JSON.parse(savedProfile)
        userProfile.value = { ...userProfile.value, ...data }
        console.log('✅ User profile loaded from localStorage')
      }

      if (savedAuth === 'true') {
        isAuthenticated.value = true
      }
    } catch (error) {
      console.error('Error loading user profile from localStorage:', error)
    }
  }

  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('userProfile', JSON.stringify(userProfile.value))
      localStorage.setItem('isAuthenticated', isAuthenticated.value.toString())
      console.log('✅ User profile saved to localStorage')
    } catch (error) {
      console.error('Error saving user profile to localStorage:', error)
    }
  }

  const clearUserProfile = () => {
    userProfile.value = {
      firstName: '',
      lastName: '',
      email: '',
      location: 'Tampakan, PH',
      avatar: '/images/profilepicture.png'
    }
    isAuthenticated.value = false
    
    localStorage.removeItem('userProfile')
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('userName')
    
    console.log('✅ User profile cleared')
  }

  const login = (email) => {
    if (!email) {
      console.error('Email required for login')
      return false
    }

    if (!userProfile.value.email) {
      userProfile.value.email = email
    }

    isAuthenticated.value = true
    saveToLocalStorage()
    
    console.log('✅ User logged in')
    return true
  }

  const logout = () => {
    clearUserProfile()
    console.log('✅ User logged out')
  }

  return {
    // State
    userProfile,
    isAuthenticated,
    
    // Computed
    fullName,
    displayName,
    initials,
    hasCompleteProfile,
    
    // Actions
    updateFromSignup,
    updateProfile,
    loadFromLocalStorage,
    saveToLocalStorage,
    clearUserProfile,
    login,
    logout
  }
})
