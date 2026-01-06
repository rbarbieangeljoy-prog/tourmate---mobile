<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-[24px] p-0 mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto flex flex-col">
      
      <!-- Dynamic Image Header -->
      <div class="bg-white pb-5">
        <div 
          class="h-[70vh] bg-cover bg-center relative"
          :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${currentAccommodation.image})` }">
          <button 
            @click="$router.push('/')"
            class="absolute top-5 left-5 w-10 h-10 rounded-full bg-[rgba(209,201,201,0.061)] backdrop-blur-[8px] flex justify-center items-center border-0 cursor-pointer transition-colors border border-white/50 hover:bg-white">
            <i class="fas fa-times text-white text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Details Card -->
      <div class="bg-white rounded-t-[30px] rounded-br-[15px] rounded-bl-[15px] -mt-[30px] relative z-[2] flex-1 flex flex-col overflow-y-auto">
        <div class="px-6 pt-[30px] pb-5 flex-1">
          <h2 class="text-2xl font-bold ml-2 mb-2 text-[#1a1a1a] leading-tight">
            {{ currentAccommodation.title }}
          </h2>
          <p class="text-base text-[#666] mb-4 ml-2.5 leading-tight">
            {{ currentAccommodation.subtitle }}
          </p>

          <!-- Location Info -->
          <div class="flex items-center mb-5 text-[15px] text-[#0c3437] ml-2.5">
            <i class="fas fa-map-marker-alt text-[#0c3437] mr-2 text-[15px]"></i>
            <span>{{ currentAccommodation.location }} - </span>
            <button 
              @click="viewMap"
              class="text-[#0c3437] underline font-medium ml-auto cursor-pointer bg-transparent border-0 text-[13px]">
              View Map
            </button>
          </div>

          <!-- Separator -->
          <div class="h-px bg-[#eaeaea] my-6"></div>

          <!-- Description -->
          <div class="text-[#444] leading-relaxed text-[15px]">
            <p v-for="(paragraph, index) in currentAccommodation.description" :key="index" class="mb-4">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex justify-between items-center px-6 py-5 bg-white border-t border-[#eaeaea] mt-auto">
          <div class="text-2xl font-bold text-[#1a1a1a]">
            {{ currentAccommodation.price }}
            <span class="text-base font-normal text-[#666]">/night</span>
          </div>
          <button 
            @click="bookNow"
            class="bg-[#0c3437] text-white border-0 px-[30px] py-3.5 rounded-[30px] font-semibold text-base cursor-pointer transition-colors hover:bg-[#173c45]">
            Book Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAccommodationStore } from '@/stores/accommodation'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const route = useRoute()
const accommodationStore = useAccommodationStore()
const bookingStore = useBookingStore()

const destinationId = computed(() => parseInt(route.params.id))
const accommodationId = computed(() => parseInt(route.params.accommodationId))

const currentAccommodation = computed(() => {
  return accommodationStore.getAccommodationById(accommodationId.value) || {}
})

const viewMap = () => {
  // Open map in new window or show modal
  if (currentAccommodation.value.mapUrl) {
    window.open(currentAccommodation.value.mapUrl, '_blank')
  }
}

const bookNow = () => {
  bookingStore.setAccommodation({
    accommodationId: accommodationId.value,
    accommodation: currentAccommodation.value
  })
  router.push(`/booking/confirmation/${destinationId.value}`)
}
</script>

<style scoped>
@media (max-width: 374px) {
  .rounded-t-\[24px\] { border-radius: 20px 20px 0 0; }
  .px-6 { padding-left: 1rem; padding-right: 1rem; }
  .text-2xl { font-size: 1.25rem; }
  .h-\[70vh\] { height: 45vh; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .min-h-screen { max-width: 768px; margin: 0 auto; background: #f8f9fa; padding: 20px 0; }
  .rounded-t-\[24px\] { margin: -50px auto 0; border-radius: 24px; }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .min-h-screen { max-width: 500px; margin: 0 auto; background: #f8f9fa; padding: 40px 0; }
  .rounded-t-\[24px\] { margin: -60px auto 0; }
}
</style>
 