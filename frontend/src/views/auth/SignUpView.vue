<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden overflow-y-hidden">
    <!-- Hero Banner -->
    <div class="h-[30vh] min-h-[200px] max-h-[280px] bg-gradient-to-b from-[#F7F5ED] to-[#075258] flex items-end justify-center pb-[30px] flex-shrink-0 w-full">
      <img src="/images/logos/girlvector.png" alt="Girl with luggage" class="w-[181.08px] h-[189px] object-contain">
    </div>

    <!-- Signup Card -->
    <div class="bg-white rounded-t-[40px] px-6 pt-9 pb-6 -mt-10 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto">
      <div class="text-[30px] font-bold mt-1 mb-2 text-center text-[#0c3437]">
        Create an Account
      </div>
      <h2 class="text-xs font-normal mb-10 text-center text-[#545454]">
        Join now and start planning your trip.
      </h2>

      <form @submit.prevent="handleSignup">
        <!-- First Name and Last Name Row -->
        <div class="flex gap-3 mb-2.5">
          <!-- First Name -->
          <div class="relative flex-1 mb-5">
            <div class="relative">
              <input 
                type="text" 
                id="firstname" 
                v-model="form.firstName"
                placeholder=" "
                required
                class="peer w-full px-[18px] py-5 pb-2 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-[#fafbfc] transition-all duration-300 focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
              />
              <label 
                for="firstname"
                class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-1 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
                First Name
              </label>
            </div>
          </div>

          <!-- Last Name -->
          <div class="relative flex-1 mb-5">
            <div class="relative">
              <input 
                type="text" 
                id="lastname" 
                v-model="form.lastName"
                placeholder=" "
                required
                class="peer w-full px-[18px] py-5 pb-2 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-[#fafbfc] transition-all duration-300 focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
              />
              <label 
                for="lastname"
                class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-1 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
                Last Name
              </label>
            </div>
          </div>
        </div>

        <!-- Email -->
        <div class="relative mb-5">
          <div class="relative">
            <input 
              type="email" 
              id="email" 
              v-model="form.email"
              placeholder=" "
              required
              class="peer w-full px-[18px] py-5 pb-2 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-[#fafbfc] transition-all duration-300 focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
            />
            <label 
              for="email"
              class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-1 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
              Email Address
            </label>
          </div>
        </div>

        <!-- Password -->
        <div class="relative mb-5">
          <div class="relative">
            <input 
              type="password" 
              id="password" 
              v-model="form.password"
              @blur="validatePassword"
              placeholder=" "
              required
              :class="[
                'peer w-full px-[18px] py-5 pb-2 border-[1.5px] rounded-[10px] text-sm font-normal transition-all duration-300 focus:outline-none focus:px-[18px] focus:py-5 focus:pb-2 focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]',
                passwordError ? 'border-[#dc3545] bg-[#fff5f5]' : form.password && !passwordError ? 'border-[#28a745] bg-[#f8fff9]' : 'border-[#e1e5e9] bg-[#fafbfc]'
              ]"
            />
            <label 
              for="password"
              class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-1 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
              Password
            </label>
            <span v-if="passwordError" class="block text-[#dc3545] text-sm mt-1.5 font-medium">
              {{ passwordError }}
            </span>
            <span v-else-if="form.password && !passwordError" class="block text-[#28a745] text-sm mt-1.5 font-medium">
              Password looks good!
            </span>
          </div>
        </div>

        <!-- Confirm Password -->
        <div class="relative mb-5">
          <div class="relative">
            <input 
              type="password" 
              id="confirmPassword" 
              v-model="form.confirmPassword"
              @blur="validateConfirmPassword"
              placeholder=" "
              required
              :class="[
                'peer w-full px-[18px] py-5 pb-2 border-[1.5px] rounded-[10px] text-sm font-normal transition-all duration-300 focus:outline-none focus:px-[18px] focus:py-5 focus:pb-2 focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]',
                confirmPasswordError ? 'border-[#dc3545] bg-[#fff5f5]' : form.confirmPassword && !confirmPasswordError ? 'border-[#28a745] bg-[#f8fff9]' : 'border-[#e1e5e9] bg-[#fafbfc]'
              ]"
            />
            <label 
              for="confirmPassword"
              class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-1 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
              Confirm Password
            </label>
            <span v-if="confirmPasswordError" class="block text-[#dc3545] text-sm mt-1.5 font-medium">
              {{ confirmPasswordError }}
            </span>
            <span v-else-if="form.confirmPassword && !confirmPasswordError" class="block text-[#28a745] text-sm mt-1.5 font-medium">
              Passwords match!
            </span>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="!isFormValid || isLoading"
          class="w-full bg-[#0c3437] text-white border-none rounded-[28px] py-3.5 text-[15px] font-medium mt-2.5 cursor-pointer transition-colors hover:bg-[#163a43] disabled:bg-[#cccccc] disabled:cursor-not-allowed font-poppins">
          {{ isLoading ? 'Signing Up...' : 'Sign Up' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-5">
        <div class="flex-1 h-px bg-[#ddd]"></div>
        <div class="px-[18px] text-[#777] text-sm whitespace-nowrap">or continue with</div>
        <div class="flex-1 h-px bg-[#ddd]"></div>
      </div>

      <!-- Social Login -->
      <div class="flex gap-0">
        <button 
          @click="handleSocialLogin('google')"
          class="flex-1 w-[15px] flex items-center justify-center bg-transparent border border-white rounded-[14px] p-1.5 cursor-pointer transition-colors">
          <img src="/images/logos/icon-google.svg" alt="Google" class="w-5 h-5 object-contain">
        </button>
        <button 
          @click="handleSocialLogin('apple')"
          class="flex-1 w-[15px] flex items-center justify-center bg-transparent border border-white rounded-[14px] p-1.5 cursor-pointer transition-colors">
          <img src="/images/logos/icon-apple.webp" alt="Apple" class="w-5 h-5 object-contain">
        </button>
      </div>

      <!-- Login Link -->
      <div class="text-center mt-6 text-[13px] text-[#333]">
        Already have an account?
        <a 
          href="#" 
          @click.prevent="$router.push('/login')"
          class="text-[#ff1509] text-[13px] cursor-pointer no-underline">
          Log in.
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const authStore = useAuthStore()
const userStore = useUserStore()

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const passwordError = ref('')
const confirmPasswordError = ref('')
const isLoading = ref(false)

const isFormValid = computed(() => {
  return (
    form.value.firstName &&
    form.value.lastName &&
    form.value.email &&
    form.value.password &&
    form.value.confirmPassword &&
    !passwordError.value &&
    !confirmPasswordError.value
  )
})

const validatePassword = () => {
  const password = form.value.password
  if (password.length < 8) {
    passwordError.value = 'Password must be at least 8 characters long'
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    passwordError.value = 'Password must contain both uppercase and lowercase letters'
  } else if (!/\d/.test(password)) {
    passwordError.value = 'Password must contain at least one number'
  } else {
    passwordError.value = ''
  }
  if (form.value.confirmPassword) {
    validateConfirmPassword()
  }
}

const validateConfirmPassword = () => {
  if (form.value.password !== form.value.confirmPassword) {
    confirmPasswordError.value = 'Passwords do not match'
  } else {
    confirmPasswordError.value = ''
  }
}

const handleSignup = async () => {
  validatePassword()
  validateConfirmPassword()
  
  if (!isFormValid.value) {
    alert('Please fix the form errors before submitting.')
    return
  }

  isLoading.value = true
  try {
    // Save to user store
    userStore.updateFromSignup({
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email
    })

    // Sign up with auth store
    await authStore.signup(form.value)
    router.push('/')
  } catch (error) {
    console.error('Signup failed:', error)
    alert('Signup failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}

const handleSocialLogin = async (provider) => {
  isLoading.value = true
  try {
    await authStore.socialLogin(provider)
    router.push('/')
  } catch (error) {
    console.error('Social login failed:', error)
    alert('Social login failed. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 374px) {
  .bg-gradient-to-b { height: 28vh; min-height: 200px; padding-bottom: 25px; }
  .flex.gap-3 { gap: 8px; }
  img[alt="Girl with luggage"] { width: 180px; height: 189px; }
  .rounded-t-\[40px\] { padding: 32px 20px; margin-top: -35px; }
  .text-\[30px\] { font-size: 22px; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .min-h-screen { max-width: 768px; margin: 0 auto; }
  .rounded-t-\[40px\] { max-width: 768px; margin: -50px auto 0; border-radius: 24px; padding: 40px 32px; }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .min-h-screen { max-width: 1024px; margin: 0 auto; }
  .rounded-t-\[40px\] { max-width: 500px; margin: -60px auto 0; padding: 44px 36px; }
}

@supports(padding: max(0px)) {
  .min-h-screen {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
