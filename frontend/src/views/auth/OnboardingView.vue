<template>
  <div class="min-h-screen w-full max-w-[480px] mx-auto">
    <!-- Splash Screen -->
    <div v-if="currentScreen === 'splash'" 
         class="min-h-screen w-full flex justify-center items-center bg-white">
      <img
        src="/images/logos/tourmate-logo.png"
        alt="Tourmate logo"
        class="w-[400px] h-auto object-contain"
      />
    </div>

    <!-- Explore Screen -->
    <div v-else-if="currentScreen === 'explore'"
         class="h-screen w-full flex justify-center items-stretch bg-gradient-to-b from-[#F7F5ED] to-[#075258] text-black">
      <div class="flex-1 px-8 pt-12 pb-8 flex flex-col">
        <header class="mt-[75px] pl-20">
          <h1 class="text-[32px] leading-tight font-semibold">
            Plan trips.<br />
            Explore more.
          </h1>
          <p class="mt-2 text-sm leading-relaxed opacity-90 italic">
            Plan, organize, and enjoy every trip—<br/>effortlessly.
          </p>
        </header>

        <img
          src="/images/logos/onboarding-beach.png"
          alt="Beach illustration"
          class="mt-[30px] w-[130dvw] object-contain"
        />

        <button 
          @click="handleGetStarted"
          class="w-fit mx-auto block px-[90px] py-3.5 rounded-[50px] border-none bg-[#d3d4d429] text-white text-base font-semibold font-poppins mt-auto hover:bg-[#d3d4d450] transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const currentScreen = ref('splash')

onMounted(() => {
  // Show splash for 2 seconds then show explore screen
  setTimeout(() => {
    currentScreen.value = 'explore'
  }, 2000)
})

const handleGetStarted = () => {
  authStore.completeOnboarding()
  router.push('/signup')
}
</script>
