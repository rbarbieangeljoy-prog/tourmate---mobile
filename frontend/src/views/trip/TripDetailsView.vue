<template>
  <div class="min-h-screen bg-white flex flex-col w-screen overflow-x-hidden">
    <div class="flex-1 flex flex-col">
      
      <!-- Top Colored Header -->
      <header class="bg-teal-800 text-white px-4 py-4 pb-8 rounded-b-[50px] flex items-start absolute w-full h-[200px] z-[1] m-0">
        <button 
          @click="$emit('go-back')"
          class="bg-none border-none text-lg text-white p-2 mr-3 cursor-pointer flex items-center justify-center"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <div class="flex-1 ml-0">
          <h1 class="mx-2 my-1 mt-[40px] text-xl font-semibold leading-tight -ml-[30px]">
            Trip to<br>
            <span class="font-semibold">{{ tripDestination }}</span>
          </h1>
        </div>
        <div class="ml-2 pt-[100px]">
          <span class="text-xs opacity-90 font-extralight">{{ tripDates }}</span>
        </div>
      </header>

      <!-- White Content with Cards -->
      <main class="flex-1 px-[30px] py-0 bg-gray-50 flex-col gap-3 bottom-0.5 pb-10">
        
        <!-- Accommodation Card -->
        <section class="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.075)] p-5 mb-3 mt-[150px] relative z-[2]">
          <h2 class="text-base font-semibold text-center m-0 mb-2">Accommodation</h2>
          <div class="h-px my-2 mb-2.5 border-t border-dashed border-gray-200"></div>
          <p class="text-sm font-semibold my-3 mx-0 text-gray-900">{{ accommodationTitle }}</p>
          <p class="text-xs text-gray-500 m-0 mb-1 leading-snug">{{ accommodationLocation }}</p>
          <p class="text-xs text-gray-500 m-0 mb-1 leading-snug">Receipt No: {{ receiptNumber }}</p>
          <p class="text-xs text-gray-500 m-0 mb-1 leading-snug">Payment: {{ paymentMethod }}</p>
          <p class="text-xs text-gray-500 m-0 mb-1 leading-snug">Booked on: {{ bookingDate }}</p>
        </section>

        <!-- Itinerary Card -->
        <section class="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.075)] p-5 mb-3">
          <h2 class="text-base font-semibold text-center m-0 mb-2">Itinerary</h2>
          <div class="h-px my-2 mb-2.5 border-t border-dashed border-gray-200"></div>

          <div v-if="hasItinerary">
            <div v-for="(dayActivities, day) in groupedActivities" :key="day">
              <p class="text-sm font-semibold my-3 mx-0 text-gray-900">Day {{ day }}</p>
              <ul class="list-none p-0 m-1 mt-0">
                <li v-for="activity in dayActivities" :key="activity.id" class="text-xs text-gray-700 mb-1.5 leading-relaxed">
                  <strong class="text-teal-800 font-semibold">{{ formatTime(activity.time) }}:</strong> {{ activity.notes }}
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="text-xs text-gray-400 italic text-center py-3">No itinerary added yet</p>
        </section>

        <!-- Packlist Card -->
        <section class="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.075)] p-5 mb-1">
          <h2 class="text-base font-semibold text-center m-0 mb-2">Packlist</h2>
          <div class="h-px my-2 mb-2.5 border-t border-dashed border-gray-200"></div>

          <div v-if="hasPacklist">
            <div v-for="category in packlistCategories" :key="category.id" class="mb-4 last:mb-0">
              <p class="text-sm font-semibold my-3 mx-0 text-gray-900">{{ category.title }}</p>
              <ul class="list-none p-0 m-1 mt-0 mb-2">
                <li v-for="item in category.items" :key="item.id" class="mb-1.5">
                  <label class="flex items-center text-xs text-gray-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      :checked="item.checked" 
                      @change="togglePacklistItem(category.id, item.id)"
                      class="mr-2"
                    />
                    <span :class="{ 'line-through text-gray-400': item.checked }">{{ item.text }}</span>
                  </label>
                </li>
              </ul>
            </div>
          </div>

          <p v-else class="text-xs text-gray-400 italic text-center py-3">No packlist added yet</p>
        </section>

        <!-- Edit Itinerary Link -->
        <div class="mt-5 pt-4 border-t border-dashed border-gray-200 text-center">
          <button 
            @click="goToItinerary"
            class="bg-transparent border-none text-teal-800 py-1 px-[50px] rounded-lg text-sm font-medium cursor-pointer inline-flex items-center gap-2 transition-all duration-200 hover:bg-teal-800 hover:text-white font-['Poppins',sans-serif]"
          >
            <i class="fas fa-edit text-xs"></i> Edit Itinerary
          </button>
        </div>

      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import { useTripsStore } from '../stores/trips'

const props = defineProps({
  trip: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['go-back', 'edit-itinerary'])

const tripsStore = useTripsStore()
const localTrip = ref(props.trip)
const tripId = computed(() => props.trip?.id || localTrip.value?.id)

// Watch for prop changes
watch(() => props.trip, (newTrip) => {
  if (newTrip?.id) {
    const freshTrip = tripsStore.getTripById(newTrip.id)
    if (freshTrip) {
      localTrip.value = freshTrip
    } else {
      localTrip.value = newTrip
    }
  } else {
    localTrip.value = newTrip
  }
}, { immediate: true, deep: true })

onMounted(() => {
  if (tripId.value) {
    const freshTrip = tripsStore.getTripById(tripId.value)
    if (freshTrip && freshTrip !== localTrip.value) {
      localTrip.value = freshTrip
    }
  }
})

// Computed properties
const tripDestination = computed(() => localTrip.value?.destinationName || 'Unknown Destination')
const tripDates = computed(() => localTrip.value?.dates || 'No dates selected')
const accommodationTitle = computed(() => localTrip.value?.accommodation?.title || 'No accommodation booked')
const accommodationLocation = computed(() => localTrip.value?.accommodation?.location || '')
const receiptNumber = computed(() => localTrip.value?.receiptNumber || 'N/A')
const paymentMethod = computed(() => localTrip.value?.paymentMethod || 'N/A')
const bookingDate = computed(() => {
  if (!localTrip.value?.bookingDate) return 'N/A'
  const date = new Date(localTrip.value.bookingDate)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
})

// Itinerary data
const activities = computed(() => {
  if (localTrip.value?.itinerary?.activities) {
    return localTrip.value.itinerary.activities
  } else if (localTrip.value?.activities) {
    return localTrip.value.activities
  } else {
    return []
  }
})

const hasItinerary = computed(() => activities.value.length > 0)

const groupedActivities = computed(() => {
  const grouped = {}
  activities.value.forEach(activity => {
    if (activity && typeof activity.day === 'number') {
      const day = activity.day
      if (!grouped[day]) {
        grouped[day] = []
      }
      grouped[day].push(activity)
    }
  })
  Object.keys(grouped).forEach(day => {
    grouped[day].sort((a, b) => {
      const timeOrder = { morning: 1, afternoon: 2, evening: 3 }
      return (timeOrder[a.time] || 4) - (timeOrder[b.time] || 4)
    })
  })
  const sortedKeys = Object.keys(grouped).sort((a, b) => parseInt(a) - parseInt(b))
  const sortedGrouped = {}
  sortedKeys.forEach(key => {
    sortedGrouped[key] = grouped[key]
  })
  return sortedGrouped
})

// Packlist data
const packlistCategories = computed(() => {
  if (localTrip.value?.packlist?.categories) {
    return localTrip.value.packlist.categories
  } else if (localTrip.value?.categories) {
    return localTrip.value.categories
  } else {
    return []
  }
})

const hasPacklist = computed(() => packlistCategories.value.length > 0)

// Methods
const formatTime = (time) => {
  const timeMap = { morning: 'Morning', afternoon: 'Afternoon', evening: 'Evening' }
  return timeMap[time] || time
}

const togglePacklistItem = (categoryId, itemId) => {
  const category = packlistCategories.value.find(c => c.id === categoryId)
  if (category) {
    const item = category.items.find(i => i.id === itemId)
    if (item) {
      item.checked = !item.checked
      if (localTrip.value?.id) {
        tripsStore.updateTripItinerary(localTrip.value.id, {
          activities: activities.value,
          packlist: packlistCategories.value
        })
        const updatedTrip = tripsStore.getTripById(localTrip.value.id)
        if (updatedTrip) {
          localTrip.value = updatedTrip
        }
      }
    }
  }
}

const goToItinerary = () => {
  if (localTrip.value?.id) {
    tripsStore.setEditingTrip(localTrip.value.id)
    emit('edit-itinerary', localTrip.value)
  }
}
</script>

<style scoped>
@media (min-width: 768px) {
  .min-h-screen {
    background: #f8f9fa;
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
  }
  .flex-1 {
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style>