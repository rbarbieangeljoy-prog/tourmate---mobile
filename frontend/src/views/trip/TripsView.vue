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
        <h1 class="text-lg font-semibold text-gray-900 m-0 ml-2">Trips</h1>
      </header>

      <!-- Tab Navigation -->
      <div class="flex gap-2 px-6 pt-4 bg-white border-b border-gray-200">
        <button
          @click="activeTab = 'upcoming'"
          :class="[
            'flex-1 py-3 px-4 bg-transparent border-none border-b-2 text-sm font-medium cursor-pointer transition-all duration-200',
            activeTab === 'upcoming' 
              ? 'text-teal-800 border-teal-800' 
              : 'text-teal-800/30 border-transparent hover:bg-black/[0.02]'
          ]"
        >
          Upcoming
        </button>
        <button
          @click="activeTab = 'past'"
          :class="[
            'flex-1 py-3 px-4 bg-transparent border-none border-b-2 text-sm font-medium cursor-pointer transition-all duration-200',
            activeTab === 'past' 
              ? 'text-teal-800 border-teal-800' 
              : 'text-teal-800/30 border-transparent hover:bg-black/[0.02]'
          ]"
        >
          Past
        </button>
      </div>

      <!-- Main Content -->
      <main class="flex-1 flex flex-col px-6">
        
        <!-- Upcoming Trips Tab -->
        <div v-if="activeTab === 'upcoming'">
          <!-- Empty State -->
          <div v-if="tripsStore.upcomingTrips.length === 0" class="text-center max-w-[280px] py-10 px-5 mx-auto">
            <div class="text-[40px] text-gray-200 mb-4">
              <i class="fas fa-suitcase-rolling"></i>
            </div>
            <h2 class="text-lg font-semibold m-0 mb-2 text-gray-900">No Upcoming Trips</h2>
            <p class="text-sm m-0 leading-relaxed text-gray-500">Your upcoming trips will appear here</p>
          </div>

          <!-- Trips List -->
          <div v-else class="flex flex-col pt-2">
            <div
              v-for="trip in tripsStore.upcomingTrips"
              :key="trip.id"
              class="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
              @click="viewTripDetails(trip)"
            >
              <div class="w-[50px] h-[50px] rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img 
                  :src="getTripImage(trip)" 
                  :alt="trip.destinationName"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div class="flex-1 flex flex-col">
                <div class="text-sm font-semibold text-gray-900 mb-0.5">{{ trip.destinationName }}</div>
                <div v-if="trip.dates" class="text-xs text-gray-400 mb-0.5">{{ trip.dates }}</div>
                <button
                  @click.stop="viewTripDetails(trip)"
                  class="bg-none border-none p-0 m-0 text-xs text-teal-800 underline self-start cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Past Trips Tab -->
        <div v-if="activeTab === 'past'">
          <!-- Empty State -->
          <div v-if="tripsStore.pastTrips.length === 0" class="text-center max-w-[280px] py-10 px-5 mx-auto">
            <div class="text-[40px] text-gray-200 mb-4">
              <i class="fas fa-history"></i>
            </div>
            <h2 class="text-lg font-semibold m-0 mb-2 text-gray-900">No Past Trips</h2>
            <p class="text-sm m-0 leading-relaxed text-gray-500">Your past trips will appear here</p>
          </div>

          <!-- Trips List -->
          <div v-else class="flex flex-col pt-2">
            <div
              v-for="trip in tripsStore.pastTrips"
              :key="trip.id"
              class="flex items-center py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded-lg transition-colors"
              @click="viewTripDetails(trip)"
            >
              <div class="w-[50px] h-[50px] rounded-md overflow-hidden mr-3 flex-shrink-0">
                <img 
                  :src="getTripImage(trip)" 
                  :alt="trip.destinationName"
                  class="w-full h-full object-cover"
                  @error="handleImageError"
                />
              </div>
              <div class="flex-1 flex flex-col">
                <div class="text-sm font-semibold text-gray-900 mb-0.5">{{ trip.destinationName }}</div>
                <div v-if="trip.dates" class="text-xs text-gray-400 mb-0.5">{{ trip.dates }}</div>
                <button
                  @click.stop="viewTripDetails(trip)"
                  class="bg-none border-none p-0 m-0 text-xs text-teal-800 underline self-start cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTripsStore } from '../../stores/trip'

const emit = defineEmits(['go-back', 'plan-trip', 'go-to-page', 'open-details'])

const tripsStore = useTripsStore()
const activeTab = ref('upcoming')

onMounted(() => {
  tripsStore.loadFromLocalStorage()
  tripsStore.checkAndUpdateTripStatuses()
})

const getTripImage = (trip) => {
  if (trip.image) return trip.image
  if (trip.property?.image) return trip.property.image
  if (trip.destinationImage) return trip.destinationImage

  if (trip.destinationId) {
    const destinationImages = {
      1: '/images/destinations/siargao.jpg',
      2: '/images/destinations/naked-island1.jpg',
      3: '/images/destinations/guyam1.jpg',
      4: '/images/destinations/cloud91.jpg'
    }
    return destinationImages[trip.destinationId] || '/images/destinations/siargao.jpg'
  }

  return '/images/destinations/siargao.jpg'
}

const handleImageError = (event) => {
  event.target.src = '/images/destinations/siargao.jpg'
}

const viewTripDetails = (trip) => {
  emit('open-details', trip)
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