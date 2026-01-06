<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50 safe-area-pb">
    <div class="max-w-screen-xl mx-auto px-4">
      <div class="flex justify-around items-center h-20">
        
        <!-- Home -->
        <button
          @click="$emit('navigate', 'homepage')"
          :class="[
            'flex flex-col items-center justify-center flex-1 h-full transition-all duration-200',
            activePage === 'homepage' ? 'text-teal-700' : 'text-gray-400'
          ]"
        >
          <i :class="['text-2xl mb-1', activePage === 'homepage' ? 'fas fa-home' : 'far fa-home']"></i>
          <span class="text-[10px] font-medium">Home</span>
        </button>

        <!-- Trips -->
        <button
          @click="$emit('navigate', 'trips')"
          :class="[
            'flex flex-col items-center justify-center flex-1 h-full transition-all duration-200',
            activePage === 'trips' ? 'text-teal-700' : 'text-gray-400'
          ]"
        >
          <i :class="['text-2xl mb-1', activePage === 'trips' ? 'fas fa-suitcase' : 'far fa-suitcase']"></i>
          <span class="text-[10px] font-medium">Trips</span>
        </button>

        <!-- Notifications -->
        <button
          @click="$emit('navigate', 'notifications')"
          :class="[
            'flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 relative',
            activePage === 'notifications' ? 'text-teal-700' : 'text-gray-400'
          ]"
        >
          <div class="relative">
            <i :class="['text-2xl mb-1', activePage === 'notifications' ? 'fas fa-bell' : 'far fa-bell']"></i>
            <span v-if="notificationCount > 0" class="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
              {{ notificationCount > 9 ? '9+' : notificationCount }}
            </span>
          </div>
          <span class="text-[10px] font-medium">Notifications</span>
        </button>

        <!-- Profile -->
        <button
          @click="$emit('navigate', 'profile')"
          :class="[
            'flex flex-col items-center justify-center flex-1 h-full transition-all duration-200',
            activePage === 'profile' ? 'text-teal-700' : 'text-gray-400'
          ]"
        >
          <i :class="['text-2xl mb-1', activePage === 'profile' ? 'fas fa-user' : 'far fa-user']"></i>
          <span class="text-[10px] font-medium">Profile</span>
        </button>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationsStore } from '../stores/notification'

defineProps({
  activePage: {
    type: String,
    required: true
  }
})

defineEmits(['navigate'])

const notificationsStore = useNotificationsStore()
const notificationCount = computed(() => notificationsStore.unreadCount)
</script>

<style scoped>
/* Safe area for notched devices */
@supports (padding: max(0px)) {
  .safe-area-pb {
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}

/* Touch optimization */
@media (hover: none) and (pointer: coarse) {
  button:active {
    transform: scale(0.95);
  }
}
</style>