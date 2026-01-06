<template>
  <div class="w-screen min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 overflow-x-hidden relative">
    <div class="bg-white flex-1 w-full flex flex-col px-6 pt-6 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] mt-0 box-border min-h-auto">
      
      <!-- Header with Back Button -->
      <header class="flex items-center p-0 pb-5 bg-white border-b border-[#e5e7eb] mb-5 w-full">
        <button 
          @click="$router.push(`/destination/${destinationId}`)"
          class="bg-transparent border-0 text-lg text-[#111827] p-2 cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:bg-black/[0.03]">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-lg font-semibold text-[#111827] m-0 ml-2">Pick date</h1>
      </header>

      <!-- Manual Date Inputs -->
      <div class="flex gap-[15px] mb-5 w-full flex-wrap">
        <!-- From Date -->
        <div class="flex-1 min-w-[140px]">
          <label class="block text-sm text-[#666] mb-2 font-medium w-full">From Date</label>
          <div class="relative w-full">
            <input
              type="text"
              v-model="manualStartDate"
              @input="handleManualStartDateChange"
              @blur="validateStartDateFormat"
              placeholder="MM/DD/YYYY"
              maxlength="10"
              class="w-full pl-[45px] pr-4 py-4 border-[1.5px] border-[#e1e5e9] rounded-xl text-base text-[#333] bg-[#f8f9fa] transition-all duration-300 box-border focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
            <i class="fas fa-calendar-alt absolute left-4 top-1/2 -translate-y-1/2 text-[#0c3437] text-base"></i>
          </div>
        </div>

        <!-- To Date -->
        <div class="flex-1 min-w-[140px]">
          <label class="block text-sm text-[#666] mb-2 font-medium w-full">To Date</label>
          <div class="relative w-full">
            <input
              type="text"
              v-model="manualEndDate"
              @input="handleManualEndDateChange"
              @blur="validateEndDateFormat"
              placeholder="MM/DD/YYYY"
              maxlength="10"
              class="w-full pl-[45px] pr-4 py-4 border-[1.5px] border-[#e1e5e9] rounded-xl text-base text-[#333] bg-[#f8f9fa] transition-all duration-300 box-border focus:outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
            <i class="fas fa-calendar-alt absolute left-4 top-1/2 -translate-y-1/2 text-[#0c3437] text-base"></i>
          </div>
        </div>
      </div>

      <!-- Calendar -->
      <div class="bg-white rounded-2xl p-5 mt-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#e8ecef] w-full box-border overflow-hidden">
        <!-- Month Navigation -->
        <div class="flex justify-between items-center mb-5 px-2.5 w-full box-border">
          <div 
            @click="handlePrevMonth"
            :class="[
              'text-2xl text-[#0c3437] cursor-pointer p-2 px-3 rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center',
              isCurrentMonth ? 'text-[#ccc] cursor-not-allowed opacity-50' : 'hover:bg-[#f0f0f0]'
            ]">
            ‹
          </div>
          <div class="text-lg font-semibold text-[#0c3437] text-center flex-1 px-1.5 min-w-0 break-words">
            {{ currentMonthYear }}
          </div>
          <div 
            @click="handleNextMonth"
            :class="[
              'text-2xl text-[#0c3437] cursor-pointer p-2 px-3 rounded-lg transition-colors flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center',
              isMaxMonth ? 'text-[#ccc] cursor-not-allowed opacity-50' : 'hover:bg-[#f0f0f0]'
            ]">
            ›
          </div>
        </div>

        <!-- Day Headers -->
        <div class="grid grid-cols-7 gap-1 mb-3 px-1 w-full box-border">
          <div v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day"
               class="text-center text-sm font-semibold text-[#0c3437] py-2 min-w-0 break-words">
            {{ day }}
          </div>
        </div>

        <!-- Date Grid -->
        <div class="grid grid-cols-7 gap-2 p-0 w-full box-border">
          <div v-for="(day, index) in calendarDays" :key="index"
               class="flex items-center justify-center p-px min-w-0">
            <div v-if="day"
                 @click="handleDateClick(day)"
                 :class="[
                   'w-full h-full max-w-[44px] max-h-[44px] flex items-center justify-center rounded-lg text-sm font-extrabold text-[#0c3437] cursor-pointer transition-all duration-300 bg-[#ededed61] p-0.5 relative box-border',
                   getDateClass(day),
                   'hover:bg-[#f0f0f0]'
                 ]">
              {{ day }}
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3 mt-auto pt-2.5 pb-0 w-full box-border">
        <button 
          @click="$router.push('/')"
          class="flex-1 p-4 border-0 rounded-[28px] text-base font-semibold cursor-pointer transition-all duration-300 min-w-0 min-h-[56px] box-border bg-[#f8f9fa] text-[#666] border-[1.5px] border-[#e1e5e9] hover:bg-[#e9ecef]">
          Cancel
        </button>
        <button 
          @click="handleNext"
          :disabled="!selectedStart || !selectedEnd || selectedStart > selectedEnd"
          class="flex-1 p-4 border-0 rounded-[28px] text-base font-semibold cursor-pointer transition-all duration-300 min-w-0 min-h-[56px] box-border bg-[#0C3437] text-white hover:bg-[#0A2B2E] disabled:bg-[#ccc] disabled:cursor-not-allowed disabled:opacity-70">
          {{ selectedStart && selectedEnd ? 'Next' : 'Select Dates' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const route = useRoute()
const bookingStore = useBookingStore()

const destinationId = computed(() => parseInt(route.params.id))
const manualStartDate = ref('')
const manualEndDate = ref('')
const selectedStart = ref(null)
const selectedEnd = ref(null)
const currentDate = ref(new Date())
const maxMonthsAhead = 3

const today = new Date()
today.setHours(0, 0, 0, 0)

// Computed
const maxAllowedDate = computed(() => {
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + maxMonthsAhead)
  return maxDate
})

const isCurrentMonth = computed(() => {
  const now = new Date()
  return currentDate.value.getMonth() === now.getMonth() && 
         currentDate.value.getFullYear() === now.getFullYear()
})

const isMaxMonth = computed(() => {
  return currentDate.value.getMonth() === maxAllowedDate.value.getMonth() &&
         currentDate.value.getFullYear() === maxAllowedDate.value.getFullYear()
})

const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }
  return days
})

// Methods
const formatDateInput = (value) => {
  let cleaned = value.replace(/\D/g, '')
  if (cleaned.length >= 2) {
    cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2)
  }
  if (cleaned.length >= 5) {
    cleaned = cleaned.substring(0, 5) + '/' + cleaned.substring(5, 9)
  }
  return cleaned
}

const parseDateString = (dateString) => {
  const parts = dateString.split('/')
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10)
    const day = parseInt(parts[1], 10)
    const year = parseInt(parts[2], 10)
    if (month >= 1 && month <= 12 && day >= 1 && day <= 31 && year >= 1000) {
      const date = new Date(year, month - 1, day)
      if (date.getMonth() === month - 1 && date.getDate() === day) {
        return date
      }
    }
  }
  return null
}

const isValidDate = (dateString) => {
  const date = parseDateString(dateString)
  if (!date || isNaN(date.getTime())) return false
  
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  
  if (date < todayStart) return false
  if (date > maxAllowedDate.value) return false
  
  return true
}

const handleManualStartDateChange = (event) => {
  manualStartDate.value = formatDateInput(event.target.value)
}

const handleManualEndDateChange = (event) => {
  manualEndDate.value = formatDateInput(event.target.value)
}

const validateStartDateFormat = () => {
  if (manualStartDate.value.length === 10) {
    if (isValidDate(manualStartDate.value)) {
      const date = parseDateString(manualStartDate.value)
      selectedStart.value = date
      if (manualEndDate.value) {
        const endDate = parseDateString(manualEndDate.value)
        if (endDate && endDate < date) {
          manualEndDate.value = ''
          selectedEnd.value = null
        }
      }
    } else {
      alert('Please enter a valid date in MM/DD/YYYY format within the allowed range')
      manualStartDate.value = ''
    }
  }
}

const validateEndDateFormat = () => {
  if (manualEndDate.value.length === 10) {
    if (isValidDate(manualEndDate.value)) {
      const endDate = parseDateString(manualEndDate.value)
      const startDate = manualStartDate.value ? parseDateString(manualStartDate.value) : null
      
      if (!startDate) {
        alert('Please select a start date first')
        manualEndDate.value = ''
        return
      }
      
      if (endDate >= startDate) {
        selectedEnd.value = endDate
      } else {
        alert('End date must be after start date')
        manualEndDate.value = ''
      }
    } else {
      alert('Please enter a valid date in MM/DD/YYYY format within the allowed range')
      manualEndDate.value = ''
    }
  }
}

const getDateClass = (day) => {
  const classes = []
  const currentViewDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  
  if (isToday(day)) classes.push('border-2 border-[#0c3437] bg-white font-bold')
  if (isPastDate(day) || isBeyondMaxDate(day)) classes.push('text-[#ccc] bg-[#f5f5f5] cursor-not-allowed opacity-60')
  
  if (selectedStart.value && isSameDate(currentViewDate, selectedStart.value)) {
    classes.push('!bg-[#0c3437] !text-white rounded-lg')
  } else if (selectedEnd.value && isSameDate(currentViewDate, selectedEnd.value)) {
    classes.push('!bg-[#0c3437] !text-white rounded-lg')
  } else if (selectedStart.value && selectedEnd.value && 
             currentViewDate > selectedStart.value && currentViewDate < selectedEnd.value) {
    classes.push('!bg-[#95bbb799] backdrop-blur-[10px] !text-[#0C3437] p-1.5 rounded-lg')
  }
  
  return classes.join(' ')
}

const isSameDate = (date1, date2) => {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate()
}

const isToday = (day) => {
  const now = new Date()
  return day === now.getDate() &&
         currentDate.value.getMonth() === now.getMonth() &&
         currentDate.value.getFullYear() === now.getFullYear()
}

const isPastDate = (day) => {
  const selectedDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return selectedDate < todayDate
}

const isBeyondMaxDate = (day) => {
  const selectedDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  return selectedDate > maxAllowedDate.value
}

const handleDateClick = (day) => {
  if (isPastDate(day) || isBeyondMaxDate(day)) return
  
  const clickedDate = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), day)
  
  if (!selectedStart.value || (selectedStart.value && selectedEnd.value)) {
    selectedStart.value = clickedDate
    selectedEnd.value = null
  } else if (clickedDate >= selectedStart.value) {
    selectedEnd.value = clickedDate
  } else {
    selectedStart.value = clickedDate
    selectedEnd.value = null
  }
}

const handlePrevMonth = () => {
  if (!isCurrentMonth.value) {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1)
  }
}

const handleNextMonth = () => {
  if (!isMaxMonth.value) {
    currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1)
  }
}

const handleNext = () => {
  if (selectedStart.value && selectedEnd.value) {
    bookingStore.setDates({
      startDate: selectedStart.value,
      endDate: selectedEnd.value,
      destinationId: destinationId.value
    })
    router.push(`/booking/accommodations/${destinationId.value}`)
  } else {
    alert('Please select both start and end dates')
  }
}

// Watch
watch(selectedStart, (newVal) => {
  if (newVal) {
    manualStartDate.value = formatDateForDisplay(newVal)
  } else {
    manualStartDate.value = ''
  }
})

watch(selectedEnd, (newVal) => {
  if (newVal) {
    manualEndDate.value = formatDateForDisplay(newVal)
  } else {
    manualEndDate.value = ''
  }
})

const formatDateForDisplay = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const year = date.getFullYear()
  return `${month}/${day}/${year}`
}
</script>

<style scoped>
@media (max-width: 320px) {
  .px-6 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .max-w-\[44px\] { max-width: 32px; max-height: 32px; font-size: 11px; }
  .text-sm { font-size: 12px; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .w-screen { max-width: 600px; margin: 0 auto; border-radius: 20px; padding: 32px 28px; }
}

@media (min-width: 1024px) {
  .w-screen { max-width: 700px; margin: 0 auto; }
}
</style>
