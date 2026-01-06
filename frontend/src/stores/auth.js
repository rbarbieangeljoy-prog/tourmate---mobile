import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useUserStore } from './user'

export const useAuthStore = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false)
  const currentScreen = ref('splash') // 'splash', 'onboarding', 'login'
  const hasSeenOnboarding = ref(false)
  const loginForm = ref({
    email: '',
    password: ''
  })
  const signupForm = ref({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordError: '',
    confirmPasswordError: ''
  })

  // Computed
  const isSignupFormValid = computed(() => {
    return !!(
      signupForm.value.firstName &&
      signupForm.value.lastName &&
      signupForm.value.email &&
      signupForm.value.password &&
      signupForm.value.confirmPassword &&
      !signupForm.value.passwordError &&
      !signupForm.value.confirmPasswordError
    )
  })

  // Initialize auth state
  const init = () => {
    const storedOnboarding = localStorage.getItem('hasSeenOnboarding')
    const storedAuth = localStorage.getItem('isAuthenticated')
    
    if (storedOnboarding === 'true') {
      hasSeenOnboarding.value = true
      currentScreen.value = 'login'
    } else {
      currentScreen.value = 'splash'
      // Auto-transition to onboarding after splash
      setTimeout(() => {
        if (currentScreen.value === 'splash') {
          currentScreen.value = 'onboarding'
        }
      }, 5000) // 5 seconds splash screen
    }

    if (storedAuth === 'true') {
      isAuthenticated.value = true
    }

    console.log('✅ Auth initialized:', {
      hasSeenOnboarding: hasSeenOnboarding.value,
      isAuthenticated: isAuthenticated.value,
      currentScreen: currentScreen.value
    })
  }

  // Finish onboarding
  const finishOnboarding = () => {
    hasSeenOnboarding.value = true
    localStorage.setItem('hasSeenOnboarding', 'true')
    currentScreen.value = 'login'
    console.log('✅ Onboarding completed')
  }

  // Validation helpers
  const validatePassword = () => {
    const password = signupForm.value.password

    if (password.length < 8) {
      signupForm.value.passwordError = 'Password must be at least 8 characters long'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
      signupForm.value.passwordError = 'Password must contain both uppercase and lowercase letters'
    } else if (!/(?=.*\d)/.test(password)) {
      signupForm.value.passwordError = 'Password must contain at least one number'
    } else {
      signupForm.value.passwordError = ''
    }

    if (signupForm.value.confirmPassword) {
      validateConfirmPassword()
    }
  }

  const validateConfirmPassword = () => {
    if (signupForm.value.password !== signupForm.value.confirmPassword) {
      signupForm.value.confirmPasswordError = 'Passwords do not match'
    } else {
      signupForm.value.confirmPasswordError = ''
    }
  }

  const updateSignupField = (field, value) => {
    signupForm.value[field] = value
  }

  // Login
  const login = (credentials = null) => {
    const userStore = useUserStore()
    
    const email = credentials?.email || loginForm.value.email
    const password = credentials?.password || loginForm.value.password

    if (!email) {
      console.error('Email is required')
      return false
    }

    // Save to user store
    userStore.login(email)
    
    // Set auth state
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    
    // Extract name from email for display
    const nameFromEmail = email.split('@')[0]
    const userName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1)
    localStorage.setItem('userName', userName)

    // Clear login form
    loginForm.value = {
      email: '',
      password: ''
    }

    console.log('✅ User logged in:', email)
    return true
  }

  // Signup
  const signup = () => {
    const userStore = useUserStore()

    // Validate
    validatePassword()
    validateConfirmPassword()

    if (!isSignupFormValid.value) {
      console.error('Signup form is invalid')
      return false
    }

    // Save to user store
    const success = userStore.updateFromSignup({
      firstName: signupForm.value.firstName,
      lastName: signupForm.value.lastName,
      email: signupForm.value.email
    })

    if (!success) {
      console.error('Failed to create user profile')
      return false
    }

    // Set auth state
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    
    // Set display name
    const userName = signupForm.value.firstName || signupForm.value.email.split('@')[0]
    localStorage.setItem('userName', userName)

    // Clear signup form
    signupForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    }

    console.log('✅ User signed up:', userStore.userProfile.email)
    return true
  }

  // Social login
  const socialLogin = (provider) => {
    const userStore = useUserStore()

    console.log(`Social login with ${provider}`)

    // Mock social login - in real app, this would call OAuth
    const mockEmail = `user@${provider}.com`
    
    userStore.login(mockEmail)
    isAuthenticated.value = true
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('userName', 'User')

    console.log(`✅ Social login successful: ${provider}`)
    return true
  }

  // Logout
  const logout = () => {
    const userStore = useUserStore()

    userStore.logout()
    isAuthenticated.value = false
    
    // Clear forms
    loginForm.value = { email: '', password: '' }
    signupForm.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      passwordError: '',
      confirmPasswordError: ''
    }

    console.log('✅ User logged out')
  }

  // Reset password
  const resetPassword = (email) => {
    if (!email) {
      console.error('Email is required for password reset')
      return false
    }

    // Mock password reset - in real app, this would send email
    console.log(`Password reset email sent to: ${email}`)
    alert(`Password reset instructions sent to ${email}`)
    
    return true
  }

  // Check if user is authenticated
  const checkAuth = () => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    isAuthenticated.value = storedAuth === 'true'
    return isAuthenticated.value
  }

  return {
    // State
    isAuthenticated,
    currentScreen,
    hasSeenOnboarding,
    loginForm,
    signupForm,
    
    // Computed
    isSignupFormValid,
    
    // Actions
    init,
    finishOnboarding,
    validatePassword,
    validateConfirmPassword,
    updateSignupField,
    login,
    signup,
    socialLogin,
    logout,
    resetPassword,
    checkAuth
  }
})
