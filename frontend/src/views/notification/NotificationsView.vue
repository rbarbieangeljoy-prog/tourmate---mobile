<template>
  <div class="min-h-screen bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-3xl p-0 mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full flex flex-col overflow-y-auto pb-24">
      
      <!-- Header -->
      <header class="flex items-center px-5 py-6 pb-3 bg-white border-b border-gray-200">
        <button 
          @click="$emit('go-back')"
          class="bg-none border-none text-lg text-gray-900 p-2 cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-black/[0.03]"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-lg font-semibold text-gray-900 m-0 ml-2">Notification</h1>
      </header>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col items-center justify-center px-5 py-5">
        
        <!-- Empty State -->
        <div v-if="notificationsStore.notifications.length === 0" class="text-center">
          <!-- Notification Graphic -->
          <div class="mb-8">
            <div class="flex justify-center items-center relative rounded-[20px] overflow-hidden">
              <img 
                src="/images/no_notif.jpg" 
                alt="No Notifications" 
                class="w-[200px] h-[200px] object-contain rounded-[20px] blur-[1.2px] brightness-95 opacity-85 transition-all duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-white/20 rounded-[20px] pointer-events-none"></div>
            </div>
          </div>

          <!-- Message -->
          <div class="text-center max-w-[280px] mx-auto">
            <h2 class="text-lg font-semibold m-0 mb-2 text-gray-900 leading-tight">
              You have no notifications
            </h2>
            <p class="text-sm m-0 leading-relaxed text-gray-500">
              You don't have any trip updates or notifications right now. Start planning your next adventure to receive trip alerts and updates here!
            </p>
          </div>
        </div>

        <!-- Notifications List -->
        <div v-else class="w-full max-w-2xl space-y-3">
          <div
            v-for="notification in notificationsStore.sortedNotifications"
            :key="notification.id"
            @click="handleNotificationClick(notification)"
            :class="[
              'bg-white border rounded-xl p-4 cursor-pointer transition-all duration-200',
              notification.read ? 'border-gray-200' : 'border-teal-700 bg-teal-50/30'
            ]"
          >
            <div class="flex items-start gap-3">
              <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', notification.color]">
                <i :class="['fas', notification.icon]"></i>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-gray-900 text-sm mb-1">{{ notification.title }}</h3>
                <p class="text-sm text-gray-600 mb-2">{{ notification.message }}</p>
                <span class="text-xs text-gray-400">{{ formatTime(notification.timestamp) }}</span>
              </div>
              <button
                @click.stop="deleteNotification(notification.id)"
                class="text-gray-400 hover:text-red-500 p-1"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
          </div>

          <!-- Mark All as Read Button -->
          <button
            v-if="notificationsStore.unreadCount > 0"
            @click="markAllAsRead"
            class="w-full py-3 text-teal-700 font-medium text-sm border border-teal-700 rounded-xl hover:bg-teal-50 transition-colors"
          >
            Mark All as Read
          </button>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { useNotificationsStore } from '../../stores/notification'

defineEmits(['go-back', 'go-to-page'])

const notificationsStore = useNotificationsStore()

const handleNotificationClick = (notification) => {
  notificationsStore.markAsRead(notification.id)
}

const deleteNotification = (id) => {
  notificationsStore.deleteNotification(id)
}

const markAllAsRead = () => {
  notificationsStore.markAllAsRead()
}

const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
@supports (padding: max(0px)) {
  .w-screen {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>