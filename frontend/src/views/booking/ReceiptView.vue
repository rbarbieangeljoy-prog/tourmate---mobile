<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden font-poppins">
    <!-- Header -->
    <header class="flex items-center px-5 py-4 bg-white border-b border-[#f0f0f0] relative flex-shrink-0">
      <button 
        @click="goHome"
        class="bg-transparent border-0 text-xl text-[#333] p-2 cursor-pointer flex items-center justify-center">
        <i class="fas fa-arrow-left"></i>
      </button>
    </header>

    <!-- Success Content -->
    <main class="flex-1 px-10 py-10 flex flex-col items-center justify-center w-full box-border">
      <!-- Success Indicator -->
      <div class="mb-8">
        <div class="w-[120px] h-[120px] border-8 border-[#32bd37] rounded-full flex items-center justify-center bg-transparent animate-scaleIn">
          <i class="fas fa-check text-[#32bd37] text-5xl font-bold"></i>
        </div>
      </div>

      <!-- Success Message -->
      <h1 class="text-2xl font-bold text-[#32bd37] m-0 mb-10 animate-fadeInUp">
        Payment Successful!
      </h1>

      <!-- Receipt Container -->
      <div class="bg-white border-[1.5px] border-[#e1e5e9] rounded-xl p-6 mb-8 w-full max-w-[400px] animate-slideUp bg-[#fafbfc]">
        <!-- Receipt Header -->
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="flex-1 h-px bg-[repeating-linear-gradient(to_right,#ccc_0px,#ccc_4px,transparent_4px,transparent_8px)]"></div>
          <div class="text-sm font-semibold text-[#333] uppercase tracking-wide m-0 whitespace-nowrap">
            Receipt
          </div>
          <div class="flex-1 h-px bg-[repeating-linear-gradient(to_right,#ccc_0px,#ccc_4px,transparent_4px,transparent_8px)]"></div>
        </div>

        <!-- Receipt Details -->
        <div class="mb-5">
          <div class="border-t border-[#f0f0f0] pt-5">
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-[#666] font-medium">Amount Paid</span>
              <span class="text-sm font-semibold text-[#333] text-lg">₱{{ receiptData.amount }}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-[#666] font-medium">Payment Method</span>
              <span class="text-sm font-semibold text-[#0070ba]">{{ receiptData.paymentMethod }}</span>
            </div>
            <div class="flex justify-between items-center mb-4">
              <span class="text-sm text-[#666] font-medium">Receipt Number</span>
              <span class="text-sm font-semibold text-[#333] font-mono">{{ receiptData.receiptNumber }}</span>
            </div>
            <div class="flex justify-between items-center mb-0">
              <span class="text-sm text-[#666] font-medium">Date & Time</span>
              <span class="text-xs text-[#6b7280] font-semibold">{{ receiptData.dateTime }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button 
        @click="goToItinerary"
        class="w-full max-w-[400px] bg-[#0c3437] text-white border-0 rounded-[30px] px-8 py-4 text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(31,79,90,0.3)] hover:bg-[#163a43] hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(31,79,90,0.4)]">
        Go to Itinerary
      </button>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const bookingStore = useBookingStore()

const receiptData = computed(() => bookingStore.receiptData || {
  amount: '2500.00',
  paymentMethod: 'GCash',
  receiptNumber: 'RCP' + Date.now(),
  dateTime: new Date().toLocaleString()
})

const goHome = () => {
  router.push('/')
}

const goToItinerary = () => {
  router.push('/trips')
}
</script>

<style scoped>
@keyframes scaleIn {
  0% { transform: scale(0); opacity: 0; }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-scaleIn { animation: scaleIn 0.6s ease-out; }
.animate-fadeInUp { animation: fadeInUp 0.6s ease-out 0.2s both; }
.animate-slideUp { animation: slideUp 0.6s ease-out 0.4s both; }
</style>
