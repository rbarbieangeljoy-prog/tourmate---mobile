<template>
  <div class="min-h-screen w-screen flex flex-col bg-white">
    <!-- Content -->
    <div class="flex-1 pb-16">
      <router-view />
    </div>

    <!-- Bottom nav -->
    <nav
      class="fixed bottom-0 left-0 z-50 w-full h-16 border-t border-gray-200 bg-white"
    >
      <div class="grid h-full max-w-lg grid-cols-4 mx-auto text-xs font-medium">
        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5"
          :class="isActive('home') ? 'text-[#075258]' : 'text-gray-500'"
          @click="go('home')"
        >
          <span class="material-icons-round text-[22px] mb-0.5">home</span>
          <span>Home</span>
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5"
          :class="isActive('trips') ? 'text-[#075258]' : 'text-gray-500'"
          @click="go('trips')"
        >
          <span class="material-icons-round text-[22px] mb-0.5">map</span>
          <span>Trips</span>
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5"
          :class="isActive('notifications') ? 'text-[#075258]' : 'text-gray-500'"
          @click="go('notifications')"
        >
          <span class="material-icons-round text-[22px] mb-0.5">notifications</span>
          <span>Alerts</span>
        </button>

        <button
          type="button"
          class="inline-flex flex-col items-center justify-center px-5"
          :class="isActive('profile') ? 'text-[#075258]' : 'text-gray-500'"
          @click="go('profile')"
        >
          <span class="material-icons-round text-[22px] mb-0.5">person</span>
          <span>Profile</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const go = (name: string) => {
  router.push({ name })
}

const isActive = (name: string) => route.name === name
</script>
