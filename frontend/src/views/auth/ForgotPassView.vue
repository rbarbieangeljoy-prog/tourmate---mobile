<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden overflow-y-hidden">
    <!-- Hero Banner -->
    <div class="h-[30vh] min-h-[200px] max-h-[280px] bg-gradient-to-b from-[#F7F5ED] to-[#075258] flex items-end justify-center pb-[30px] flex-shrink-0 w-full">
      <img src="/images/logos/girlvector.png" alt="Girl with luggage" class="w-[181.08px] h-[189px] object-contain relative">
    </div>

    <!-- Reset Password Card -->
    <div class="bg-white rounded-t-[40px] px-6 pt-9 pb-6 -mt-10 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto">
      <div class="text-[30px] font-bold mt-1 mb-2 text-center text-[#0c3437]">
        Reset Password
      </div>
      <p class="text-xs font-normal mb-10 text-center text-[#545454]">
        Enter your email address and we'll send you instructions to reset your password.
      </p>

      <form @submit.prevent="handleResetPassword">
        <!-- Email Field -->
        <div class="relative mb-5">
          <div class="relative">
            <input 
              type="email" 
              id="email" 
              v-model="email"
              placeholder=" "
              required
              class="peer w-full px-[18px] py-4 border-[1.5px] border-[#e1e5e9] rounded-[10px] text-sm font-normal bg-white transition-all duration-300 focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(31,79,90,0.1)]"
            />
            <label 
              for="email"
              class="absolute top-1/2 left-[18px] -translate-y-1/2 text-[#b6b6b6] text-sm font-normal pointer-events-none transition-all duration-300 bg-white px-0.5 peer-focus:top-0 peer-focus:scale-85 peer-focus:text-[#0c3437] peer-focus:font-medium peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-[#0c3437] peer-[:not(:placeholder-shown)]:font-medium">
              Email Address
            </label>
          </div>
        </div>

        <!-- Submit Button -->
        <button 
          type="submit"
          :disabled="!email || isLoading"
          class="w-full bg-[#0c3437] text-white border-none rounded-[28px] py-[13px] text-[15px] font-medium mt-2.5 cursor-pointer transition-colors hover:bg-[#163a43] disabled:bg-[#cccccc] disabled:cursor-not-allowed font-poppins">
          {{ isLoading ? 'Sending...' : 'Send Reset Instructions' }}
        </button>

        <!-- Back to Login -->
        <div class="text-center mt-5">
          <a 
            href="#" 
            @click.prevent="$router.push('/login')"
            class="text-[#0c3437] no-underline text-sm font-medium cursor-pointer transition-colors hover:text-[#075258]">
            Back to Sign In
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const isLoading = ref(false)

const handleResetPassword = async () => {
  isLoading.value = true
  try {
    const result = await authStore.resetPassword(email.value)
    alert(result.message)
    router.push('/login')
  } catch (error) {
    console.error('Reset password error:', error)
    alert('Failed to send reset email. Please try again.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 374px) {
  .bg-gradient-to-b { height: 28vh; min-height: 200px; padding-bottom: 25px; }
  img[alt="Girl with luggage"] { width: 180px; height: 189px; }
  .rounded-t-\[40px\] { padding: 32px 20px; margin-top: -35px; }
  .text-\[30px\] { font-size: 22px; }
  .text-xs { font-size: 14px; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .min-h-screen { max-width: 768px; margin: 0 auto; }
  .bg-gradient-to-b { height: 35vh; min-height: 250px; max-height: 300px; }
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
