<template>
  <div class="min-h-screen bg-gray-50 pb-40">
    <!-- Dark Header Card -->
    <div class="bg-[#0c3437] rounded-b-[80px] p-6 shadow-lg">
      <!-- Navigation -->
      <div class="flex items-center mb-6">
        <button 
          @click="goBack"
          class="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
        >
          <i class="fas fa-arrow-left text-white text-xl"></i>
        </button>
        <div class="text-white text-lg font-medium ml-4">Itinerary</div>
      </div>

      <!-- Trip Details -->
      <h1 class="text-white text-2xl font-bold mb-4">{{ tripTitle }}</h1>
      <div class="space-y-2">
        <div class="flex items-center text-white/90">
          <i class="fa-solid fa-calendar mr-3"></i>
          <span class="text-sm">{{ tripDates }}</span>
        </div>
        <div class="flex items-center text-white/90">
          <i class="fa-solid fa-bed mr-3"></i>
          <span class="text-sm">{{ accommodationName }}</span>
        </div>
      </div>
    </div>

    <!-- Day Navigation -->
    <div class="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div class="flex overflow-x-auto px-5 space-x-4">
        <button
          v-for="day in days"
          :key="day.id"
          @click="setActiveDay(day.id)"
          class="relative py-4 px-2 text-sm font-medium whitespace-nowrap transition-colors"
          :class="activeDay === day.id 
            ? 'text-[#1f4f5a] font-semibold' 
            : 'text-gray-500'"
        >
          {{ day.name }}
          <span 
            v-if="activeDay === day.id"
            class="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0c3437] rounded-t"
          ></span>
        </button>
      </div>
    </div>

    <!-- Activity Cards Container -->
    <div class="px-5 mt-6 space-y-4">
      <div 
        v-for="activity in filteredActivities" 
        :key="activity.id"
        class="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
      >
        <div class="mb-3">
          <button
            @click="openTimeModal(activity)"
            class="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
          >
            <div class="flex items-center gap-2 text-[#0c3437] font-medium">
              <i class="far fa-clock"></i>
              <span>{{ getTimeLabel(activity.time) }}</span>
            </div>
            <i class="fas fa-chevron-down text-xs text-gray-400"></i>
          </button>
        </div>

        <div>
          <textarea
            v-model="activity.notes"
            @input="updateActivity(activity)"
            rows="6"
            placeholder="What do you want to do at this time?&#10;&#10;Write your plans, activities, or notes here..."
            class="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0c3437] focus:border-transparent resize-none font-['Poppins'] text-gray-700 leading-relaxed"
          ></textarea>
        </div>
      </div>

      <!-- Add Activity Button -->
      <button
        @click="addActivity"
        class="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
      >
        + Add Activity
      </button>
    </div>

    <!-- Packlist Section -->
    <div class="px-5 mt-8 mb-8">
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div 
          class="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
          @click="togglePacklist"
        >
          <h2 class="text-lg font-semibold text-gray-800">Packlist</h2>
          <button class="transition-transform duration-200" :class="{ 'rotate-180': packlistExpanded }">
            <i class="fas fa-chevron-down text-gray-400"></i>
          </button>
        </div>

        <div v-show="packlistExpanded" class="p-4 pt-0 space-y-4">
          <div 
            v-for="category in categories" 
            :key="category.id"
            class="border border-gray-200 rounded-lg p-3"
          >
            <div class="flex items-center gap-2 mb-3">
              <input
                type="text"
                v-model="category.title"
                @input="updateCategory(category)"
                placeholder="Category name (e.g., Essentials, Clothing)"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0c3437] focus:border-transparent"
              />
              <button
                @click="deleteCategory(category.id)"
                class="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>

            <div class="space-y-2">
              <div 
                v-for="item in category.items" 
                :key="item.id"
                class="flex items-center gap-3"
              >
                <label class="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    :checked="item.checked"
                    @change="toggleItemCheck(category.id, item.id)"
                    class="w-5 h-5 text-[#0c3437] border-gray-300 rounded focus:ring-[#0c3437]"
                  />
                </label>
                <span 
                  class="flex-1 text-sm"
                  :class="{ 'line-through text-gray-400': item.checked, 'text-gray-700': !item.checked }"
                >
                  {{ item.text }}
                </span>
                <button
                  @click="deleteItem(category.id, item.id)"
                  class="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <i class="fas fa-times text-xs"></i>
                </button>
              </div>

              <input
                type="text"
                placeholder="Add new item..."
                @keypress.enter="addItemToCategory(category.id, $event)"
                class="w-full px-3 py-2 text-sm border border-dashed border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0c3437] focus:border-transparent"
              />
            </div>
          </div>

          <button
            @click="addCategory"
            class="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <i class="fas fa-plus text-sm"></i>
            <span>Add New Category</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button -->
    <div class="px-5 pb-8">
      <button
        @click="saveTrip"
        class="w-full py-4 bg-[#0c3437] hover:bg-[#163a43] text-white font-semibold rounded-full shadow-lg transition-all"
      >
        Save Trip
      </button>
    </div>

    <!-- Time Selection Modal -->
    <div 
      v-if="showTimeModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="closeTimeModal"
    >
      <div class="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-800">Select Time</h3>
          <button @click="closeTimeModal" class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg">
            <i class="fas fa-times text-gray-400"></i>
          </button>
        </div>

        <div class="p-4 space-y-3">
          <button
            @click="selectTime('morning')"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all"
            :class="selectedTime === 'morning' 
              ? 'border-[#0c3437] bg-[#0c3437]/5' 
              : 'border-gray-200 hover:border-gray-300'"
          >
            <i class="fas fa-sun text-2xl" :class="selectedTime === 'morning' ? 'text-[#0c3437]' : 'text-gray-400'"></i>
            <span class="font-medium" :class="selectedTime === 'morning' ? 'text-[#0c3437]' : 'text-gray-700'">Morning</span>
            <i v-if="selectedTime === 'morning'" class="fas fa-check ml-auto text-[#0c3437]"></i>
          </button>

          <button
            @click="selectTime('afternoon')"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all"
            :class="selectedTime === 'afternoon' 
              ? 'border-[#0c3437] bg-[#0c3437]/5' 
              : 'border-gray-200 hover:border-gray-300'"
          >
            <i class="fas fa-cloud-sun text-2xl" :class="selectedTime === 'afternoon' ? 'text-[#0c3437]' : 'text-gray-400'"></i>
            <span class="font-medium" :class="selectedTime === 'afternoon' ? 'text-[#0c3437]' : 'text-gray-700'">Afternoon</span>
            <i v-if="selectedTime === 'afternoon'" class="fas fa-check ml-auto text-[#0c3437]"></i>
          </button>

          <button
            @click="selectTime('evening')"
            class="w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all"
            :class="selectedTime === 'evening' 
              ? 'border-[#0c3437] bg-[#0c3437]/5' 
              : 'border-gray-200 hover:border-gray-300'"
          >
            <i class="fas fa-moon text-2xl" :class="selectedTime === 'evening' ? 'text-[#0c3437]' : 'text-gray-400'"></i>
            <span class="font-medium" :class="selectedTime === 'evening' ? 'text-[#0c3437]' : 'text-gray-700'">Evening</span>
            <i v-if="selectedTime === 'evening'" class="fas fa-check ml-auto text-[#0c3437]"></i>
          </button>
        </div>

        <div class="flex gap-3 p-4 border-t border-gray-200">
          <button
            @click="closeTimeModal"
            class="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            @click="confirmTimeSelection"
            class="flex-1 py-3 bg-[#0c3437] text-white font-medium rounded-lg hover:bg-[#163a43]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

    <!-- Unsaved Changes Modal -->
    <div 
      v-if="showLeaveModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showLeaveModal = false"
    >
      <div class="bg-white rounded-2xl max-w-sm w-full p-6 text-center">
        <div class="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-exclamation-circle text-3xl text-yellow-500"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">Unsaved Changes</h3>
        <p class="text-gray-600 mb-2">
          You have unsaved changes. Your draft has been auto-saved and you can continue editing later.
        </p>
        <p class="text-gray-500 text-sm mb-6">Are you sure you want to leave?</p>
        <div class="flex gap-3">
          <button
            @click="showLeaveModal = false"
            class="flex-1 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50"
          >
            Stay & Edit
          </button>
          <button
            @click="confirmLeave"
            class="flex-1 py-3 bg-[#0c3437] text-white font-medium rounded-lg hover:bg-[#163a43]"
          >
            Leave
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useTripsStore } from '@/stores/trip'

export default {
  name: 'ItineraryView',
  
  setup() {
    const router = useRouter()
    const tripsStore = useTripsStore()

    // State
    const activeDay = ref(1)
    const packlistExpanded = ref(true)
    const tripTitle = ref('Trip to Siargao Island')
    const tripDates = ref('Nov 21 - Nov 25, 2025')
    const accommodationName = ref('Cloud 9 Surf Resort')
    const days = ref([]) // Will be dynamically calculated
    
    const activities = ref([])
    const categories = ref([])
    
    const nextActivityId = ref(1)
    const nextCategoryId = ref(1)
    const nextItemId = ref(1)
    
    const hasUnsavedChanges = ref(false)
    const autoSaveTimer = ref(null)
    const showLeaveModal = ref(false)
    const showTimeModal = ref(false)
    const currentActivity = ref(null)
    const selectedTime = ref('morning')
    const currentTripId = ref(null)

    // Computed
    const filteredActivities = computed(() => {
      return activities.value.filter(activity => activity.day === activeDay.value)
    })

    // Calculate days based on booking nights
    const calculateDays = (nights) => {
      if (!nights || nights <= 0) {
        // Default to 3 days if no nights
        return [
          { id: 1, name: 'Day 1' },
          { id: 2, name: 'Day 2' },
          { id: 3, name: 'Day 3' }
        ]
      }

      const numberOfDays = Math.min(nights + 1, 10) // Max 10 days, nights + 1 = days
      return Array.from({ length: numberOfDays }, (_, i) => ({
        id: i + 1,
        name: `Day ${i + 1}`
      }))
    }

    // Load trip data
    const loadTripData = () => {
      currentTripId.value = tripsStore.editingTripId

      if (currentTripId.value) {
        loadExistingTripData(currentTripId.value)
      } else {
        loadBookingData()
        loadDraft()
      }
    }

    const loadExistingTripData = (tripId) => {
      const trip = tripsStore.getTripById(tripId)
      
      if (trip) {
        console.log('Loading existing trip data:', trip)
        
        tripTitle.value = `Trip to ${trip.destinationName}`
        tripDates.value = trip.dates
        accommodationName.value = trip.accommodation?.title || 'Accommodation'

        // Calculate days based on nights
        days.value = calculateDays(trip.nights)

        if (trip.itinerary?.activities && trip.itinerary.activities.length > 0) {
          activities.value = JSON.parse(JSON.stringify(trip.itinerary.activities))
          nextActivityId.value = Math.max(...activities.value.map(a => a.id), 0) + 1
        }

        if (trip.packlist?.categories && trip.packlist.categories.length > 0) {
          categories.value = JSON.parse(JSON.stringify(trip.packlist.categories))
          nextCategoryId.value = Math.max(...categories.value.map(c => c.id), 0) + 1
          const allItemIds = categories.value.flatMap(c => c.items.map(i => i.id))
          nextItemId.value = Math.max(...allItemIds, 0) + 1
        }

        hasUnsavedChanges.value = false
      }
    }

    const loadBookingData = () => {
      const bookingData = localStorage.getItem('lastBooking')
      if (bookingData) {
        try {
          const data = JSON.parse(bookingData)
          
          if (data.destination) tripTitle.value = `Trip to ${data.destination}`
          if (data.dates) tripDates.value = data.dates
          if (data.property && data.property.title) accommodationName.value = data.property.title

          // Calculate days based on nights from booking
          if (data.nights) {
            days.value = calculateDays(data.nights)
          } else {
            days.value = calculateDays(3) // Default 3 nights = 4 days
          }

          console.log(`Calculated ${days.value.length} days from ${data.nights} nights`)
        } catch (error) {
          console.error('Error parsing booking data:', error)
          days.value = calculateDays(3) // Fallback
        }
      } else {
        days.value = calculateDays(3) // Fallback
      }
    }

    const loadDraft = () => {
      const draftActivities = localStorage.getItem('itineraryDraftactivities')
      const draftPacklist = localStorage.getItem('itineraryDraftpacklist')

      if (draftActivities) {
        try {
          const data = JSON.parse(draftActivities)
          activities.value = data.activities
          nextActivityId.value = data.nextActivityId + 1
        } catch (error) {
          console.error('Error parsing draft activities:', error)
        }
      }

      if (draftPacklist) {
        try {
          const data = JSON.parse(draftPacklist)
          categories.value = data.categories
          nextCategoryId.value = data.nextCategoryId + 1
          nextItemId.value = data.nextItemId + 1
        } catch (error) {
          console.error('Error parsing draft packlist:', error)
        }
      }

      hasUnsavedChanges.value = false
    }

    // Methods
    const setActiveDay = (dayId) => {
      activeDay.value = dayId
    }

    const togglePacklist = () => {
      packlistExpanded.value = !packlistExpanded.value
    }

    const addActivity = () => {
      const newActivity = {
        id: nextActivityId.value++,
        day: activeDay.value,
        time: 'morning',
        notes: ''
      }
      activities.value.push(newActivity)
    }

    const updateActivity = (activity) => {
      hasUnsavedChanges.value = true
      scheduleAutoSave()
    }

    const openTimeModal = (activity) => {
      currentActivity.value = activity
      selectedTime.value = activity.time
      showTimeModal.value = true
    }

    const closeTimeModal = () => {
      showTimeModal.value = false
      currentActivity.value = null
    }

    const selectTime = (time) => {
      selectedTime.value = time
    }

    const confirmTimeSelection = () => {
      if (currentActivity.value) {
        currentActivity.value.time = selectedTime.value
        updateActivity(currentActivity.value)
      }
      closeTimeModal()
    }

    const getTimeLabel = (time) => {
      const labels = {
        morning: 'Morning',
        afternoon: 'Afternoon',
        evening: 'Evening'
      }
      return labels[time] || 'Select Time'
    }

    const addCategory = () => {
      const newCategory = {
        id: nextCategoryId.value++,
        title: '',
        items: []
      }
      categories.value.push(newCategory)
    }

    const updateCategory = (category) => {
      hasUnsavedChanges.value = true
      scheduleAutoSave()
    }

    const deleteCategory = (categoryId) => {
      categories.value = categories.value.filter(c => c.id !== categoryId)
      hasUnsavedChanges.value = true
      scheduleAutoSave()
    }

    const addItemToCategory = (categoryId, event) => {
      const text = event.target.value.trim()
      if (!text) return

      const category = categories.value.find(c => c.id === categoryId)
      if (category) {
        category.items.push({
          id: nextItemId.value++,
          text: text,
          checked: false
        })
        event.target.value = ''
        hasUnsavedChanges.value = true
        scheduleAutoSave()
      }
    }

    const toggleItemCheck = (categoryId, itemId) => {
      const category = categories.value.find(c => c.id === categoryId)
      if (category) {
        const item = category.items.find(i => i.id === itemId)
        if (item) {
          item.checked = !item.checked
          hasUnsavedChanges.value = true
          scheduleAutoSave()
        }
      }
    }

    const deleteItem = (categoryId, itemId) => {
      const category = categories.value.find(c => c.id === categoryId)
      if (category) {
        category.items = category.items.filter(i => i.id !== itemId)
        hasUnsavedChanges.value = true
        scheduleAutoSave()
      }
    }

    const scheduleAutoSave = () => {
      if (autoSaveTimer.value) clearTimeout(autoSaveTimer.value)
      autoSaveTimer.value = setTimeout(() => {
        saveDraft()
      }, 2000)
    }

    const saveDraft = () => {
      const draftActivities = {
        activities: activities.value,
        nextActivityId: nextActivityId.value
      }
      const draftPacklist = {
        categories: categories.value,
        nextCategoryId: nextCategoryId.value,
        nextItemId: nextItemId.value
      }
      
      localStorage.setItem('itineraryDraftactivities', JSON.stringify(draftActivities))
      localStorage.setItem('itineraryDraftpacklist', JSON.stringify(draftPacklist))
      console.log('Draft auto-saved')
    }

    const saveTrip = () => {
      const validActivities = activities.value.filter(activity => activity.notes.trim() !== '')
      const validCategories = categories.value.filter(category => 
        category.title.trim() !== '' && category.items.length > 0
      )

      if (currentTripId.value) {
        const success = tripsStore.updateTripItinerary(currentTripId.value, {
          activities: validActivities,
          packlist: validCategories
        })

        if (success) {
          localStorage.removeItem('itineraryDraftactivities')
          localStorage.removeItem('itineraryDraftpacklist')
          tripsStore.clearEditingTrip()
          hasUnsavedChanges.value = false
          
          alert('Trip saved successfully!')
          router.push({ name: 'trip-details', params: { id: currentTripId.value } })
        } else {
          alert('Error saving trip. Please try again.')
        }
      }
    }

    const goBack = () => {
      if (hasUnsavedChanges.value) {
        showLeaveModal.value = true
      } else {
        cleanupAndLeave()
      }
    }

    const confirmLeave = () => {
      showLeaveModal.value = false
      cleanupAndLeave()
    }

    const cleanupAndLeave = () => {
      tripsStore.clearEditingTrip()
      localStorage.removeItem('itineraryDraftactivities')
      localStorage.removeItem('itineraryDraftpacklist')
      
      if (currentTripId.value) {
        router.push({ name: 'trip-details', params: { id: currentTripId.value } })
      } else {
        router.push({ name: 'trips' })
      }
    }

    // Lifecycle
    onMounted(() => {
      loadTripData()
      if (categories.value.length === 0) {
        addCategory()
      }
    })

    onBeforeUnmount(() => {
      if (autoSaveTimer.value) {
        clearTimeout(autoSaveTimer.value)
      }
    })

    return {
      activeDay,
      packlistExpanded,
      tripTitle,
      tripDates,
      accommodationName,
      days,
      activities,
      categories,
      filteredActivities,
      hasUnsavedChanges,
      showLeaveModal,
      showTimeModal,
      currentActivity,
      selectedTime,
      setActiveDay,
      togglePacklist,
      addActivity,
      updateActivity,
      openTimeModal,
      closeTimeModal,
      selectTime,
      confirmTimeSelection,
      getTimeLabel,
      addCategory,
      updateCategory,
      deleteCategory,
      addItemToCategory,
      toggleItemCheck,
      deleteItem,
      saveTrip,
      goBack,
      confirmLeave
    }
  }
}
</script>
