<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-[24px] p-0 mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto flex flex-col">
      
      <!-- Header -->
      <header class="flex items-center px-6 pt-6 pb-3 bg-white border-b border-[#e5e7eb]">
        <button 
          @click="$router.back()"
          class="bg-transparent border-0 text-lg text-[#111827] p-2 cursor-pointer flex items-center justify-center w-10 h-10 rounded-xl transition-all hover:bg-black/[0.03]">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-lg font-semibold text-[#111827] m-0 ml-2">Confirm Booking</h1>
      </header>

      <!-- Booking Card -->
      <div class="bg-white rounded-[20px] rounded-tl-[5px] rounded-tr-[5px] mx-4 overflow-hidden shadow-[0_2px_8px_rgba(12,6,6,0.464)] mb-2.5">
        <div 
          class="w-full h-[200px] bg-cover bg-center"
          :style="{ backgroundImage: `url(${bookingData.accommodationImage})` }">
        </div>
        
        <div class="p-5 bg-white">
          <h2 class="text-lg font-bold m-0 mb-2 text-[#1a1a1a]">
            {{ bookingData.accommodationName }}
          </h2>
          <p class="text-[#666] mb-5 mt-0 text-sm flex items-center gap-1.5">
            <i class="fa-solid fa-calendar"></i>
            {{ bookingDatesDisplay }}
          </p>

          <!-- Price Breakdown -->
          <div class="flex justify-between mb-2 text-[15px] text-[#1a1a1a]">
            <span>Price</span>
            <span>{{ bookingData.pricePerNight }}</span>
          </div>
          <div class="flex justify-between mb-2 text-[15px] text-[#1a1a1a]">
            <span>Nights</span>
            <span>{{ bookingData.nights }}</span>
          </div>
          <div class="flex justify-between border-t border-[#e0e0e0] pt-3 mt-3 font-bold text-base">
            <span>Total</span>
            <span>{{ totalPrice }}</span>
          </div>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="px-6 py-6 bg-white flex-1 flex flex-col m-[15px]">
        <h3 class="text-lg font-bold mb-4 text-[#1a1a1a]">Select Payment Method</h3>

        <!-- Payment Options -->
        <div 
          v-for="method in paymentMethods" 
          :key="method.id"
          @click="selectedPayment = method"
          :class="[
            'flex items-center px-4 py-4 border rounded-lg mb-3 cursor-pointer transition-all',
            selectedPayment?.id === method.id ? 'border-[#1f4f5a] bg-[#f0f7f9]' : 'border-[#a8a8a8] hover:border-[#1f4f5a]'
          ]">
          <div class="flex items-center gap-3 flex-1">
            <img 
              :src="method.logo" 
              :alt="method.name"
              @error="handleImageError"
              class="w-10 h-[25px] object-contain rounded bg-transparent p-0.5 border-0 flex-shrink-0"
            >
            <span class="text-[15px] font-medium text-[#333] flex-1">
              {{ method.name }}
            </span>
          </div>
          <div :class="[
            'w-5 h-5 rounded-full border-2 ml-3 flex items-center justify-center flex-shrink-0',
            selectedPayment?.id === method.id ? 'border-[#0c3437] bg-[#0c3437]' : 'border-[#d1d5db]'
          ]">
            <i v-if="selectedPayment?.id === method.id" class="fas fa-check text-white text-xs"></i>
          </div>
        </div>

        <button 
          @click="handleNext"
          :disabled="!selectedPayment"
          class="w-full bg-[#0c3437] text-white border-0 rounded-[28px] py-3.5 font-semibold mt-6 cursor-pointer transition-colors text-base disabled:bg-[#d1d5db] disabled:cursor-not-allowed hover:bg-[#173c45]">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const route = useRoute()
const bookingStore = useBookingStore()

const selectedPayment = ref(null)

const destinationId = computed(() => parseInt(route.params.id))
const bookingData = computed(() => bookingStore.currentBooking)
const totalPrice = computed(() => bookingStore.totalPrice)
const bookingDatesDisplay = computed(() => bookingStore.bookingDatesDisplay)

const paymentMethods = [
  { id: 1, name: 'GCash', logo: '/images/logos/gcash.png' },
  { id: 2, name: 'PayPal', logo: '/images/logos/paypal.png' },
  { id: 3, name: 'Mastercard', logo: '/images/logos/mastercard.png' },
  { id: 4, name: 'Visa', logo: '/images/logos/visa.png' }
]

const handleImageError = (event) => {
  event.target.style.display = 'none'
}

const handleNext = () => {
  if (selectedPayment.value) {
    bookingStore.setPaymentMethod(selectedPayment.value)
    router.push(`/booking/payment/${destinationId.value}`)
  }
}
</script>
