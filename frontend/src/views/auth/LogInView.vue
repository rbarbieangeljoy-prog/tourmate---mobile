<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <!-- Hero Banner -->
    <div class="h-[30vh] min-h-[200px] max-h-[280px] bg-gradient-to-b from-[#F7F5ED] to-[#075258] flex items-end justify-center pb-[30px] flex-shrink-0 w-full">
      <img 
        src="/images/logos/girlvector.png" 
        alt="Girl with luggage" 
        class="w-[181px] h-[189px] object-contain relative"
      >
    </div>

    <!-- Login Card -->
    <div class="bg-white rounded-t-[40px] px-6 pt-9 pb-6 -mt-10 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border">
      <!-- Header -->
      <h1 class="text-[30px] font-bold mt-1 mb-2 text-center text-[#0c3437]">
        Welcome back, traveler!
      </h1>
      <p class="text-xs font-normal mb-10 text-center text-[#545454]">
        Let's continue your travel plans. Enter your details to sign in.
      </p>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email Field -->
        <div class="relative">
          <input 
            type="email" 
            id="email" 
            v-model="form.email"
            placeholder=" "
            required
            class="peer w-full px-[18px] py-4 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-white transition-all duration-300 ease-in-out outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
          />
          <label 
            for="email"
            class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 ease-in-out bg-white px-1 
            peer-focus:top-0 peer-focus:scale-[0.85] peer-focus:text-[#0c3437] peer-focus:font-medium 
            peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:scale-[0.85] peer-[&:not(:placeholder-shown)]:text-[#0c3437] peer-[&:not(:placeholder-shown)]:font-medium"
          >
            Email
          </label>
        </div>

        <!-- Password Field -->
        <div class="relative mb-2">
          <input 
            type="password" 
            id="password" 
            v-model="form.password"
            placeholder=" "
            required
            class="peer w-full px-[18px] py-4 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-white transition-all duration-300 ease-in-out outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
          />
          <label 
            for="password"
            class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 ease-in-out bg-white px-1 
            peer-focus:top-0 peer-focus:scale-[0.85] peer-focus:text-[#0c3437] peer-focus:font-medium 
            peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:scale-[0.85] peer-[&:not(:placeholder-shown)]:text-[#0c3437] peer-[&:not(:placeholder-shown)]:font-medium"
          >
            Password
          </label>
        </div>

        <!-- Forgot Password Link -->
        <div class="text-right -mt-1 mb-4">
          <button
            type="button"
            @click="$router.push('/forgot-password')"
            class="text-[#ff1509] text-xs font-medium hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="isLoading"
          class="w-full bg-[#0c3437] text-white border-none rounded-[28px] py-3.5 text-[15px] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#163a43] disabled:bg-[#cccccc] disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Logging in...' : 'Log In' }}
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center my-5">
        <div class="flex-1 h-px bg-[#ddd]"></div>
        <span class="px-[18px] text-[#777] text-sm whitespace-nowrap">or continue with</span>
        <div class="flex-1 h-px bg-[#ddd]"></div>
      </div>

      <!-- Social Login Buttons -->
      <div class="flex justify-center gap-4 mb-6">
        <button 
          type="button"
          @click="handleSocialLogin('google')"
          class="w-14 h-14 flex items-center justify-center bg-white border-2 border-[#e1e5e9] rounded-full cursor-pointer transition-all duration-200 hover:border-[#0c3437] hover:bg-gray-50"
        >
          <img 
            src="/images/logos/icon-google.svg" 
            alt="Google" 
            class="w-6 h-6 object-contain"
          >
        </button>
        <button 
          type="button"
          @click="handleSocialLogin('apple')"
          class="w-14 h-14 flex items-center justify-center bg-white border-2 border-[#e1e5e9] rounded-full cursor-pointer transition-all duration-200 hover:border-[#0c3437] hover:bg-gray-50"
        >
          <img 
            src="/images/logos/icon-apple.webp" 
            alt="Apple" 
            class="w-6 h-6 object-contain"
          >
        </button>
      </div>

      <!-- Sign Up Link -->
      <p class="text-center text-[13px] text-[#333]">
        New here? 
        <button
          type="button"
          @click="$router.push('/signup')"
          class="text-[#ff1509] font-semibold hover:underline"
        >
          Sign Up
        </button> 
        to begin your journey!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  try {
    await authStore.login(form.value)
    router.push('/home')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Please check your credentials.')
  } finally {
    isLoading.value = false
  }
}

const handleSocialLogin = async (provider) => {
  isLoading.value = true
  try {
    await authStore.socialLogin(provider)
    router.push('/home')
  } catch (error) {
    console.error('Social login failed:', error)
    alert(`${provider} login coming soon!`)
  } finally {
    isLoading.value = false
  }
}
</script>
