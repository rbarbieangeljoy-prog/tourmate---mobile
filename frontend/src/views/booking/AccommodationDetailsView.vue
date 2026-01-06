<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-[24px] p-0 mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto flex flex-col">
      
      <!-- Dynamic Image Header -->
      <div class="bg-white pb-5">
        <div 
          class="h-[70vh] bg-cover bg-center relative"
          :style="{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.2)), url(${selectedAccommodation.image})` }">
          <button 
            @click="goBack"
            class="absolute top-5 left-5 w-10 h-10 rounded-full bg-[rgba(209,201,201,0.061)] backdrop-blur-[8px] flex justify-center items-center border-0 cursor-pointer transition-colors border border-white/50 hover:bg-white">
            <i class="fas fa-times text-white text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Details Card Wrapper -->
      <div class="bg-white rounded-t-[30px] rounded-br-[15px] rounded-bl-[15px] -mt-[30px] relative z-[2] flex-1 flex flex-col overflow-y-auto">
        <!-- Details Content -->
        <div class="px-6 pt-[30px] pb-5 flex-1">
          <h2 class="text-2xl font-bold ml-2 mb-2 text-[#1a1a1a] leading-tight">
            {{ selectedAccommodation.title }}
          </h2>
          <p class="text-base text-[#666] mb-4 ml-2.5 leading-tight">
            {{ selectedAccommodation.subtitle }}
          </p>

          <!-- Location Info -->
          <div class="flex items-center mb-5 text-[15px] text-[#0c3437] ml-2.5">
            <i class="fas fa-map-marker-alt text-[#0c3437] mr-2 text-[15px]"></i>
            <span>{{ selectedAccommodation.location }}</span>
            <button 
              @click="viewMap"
              class="text-[#0c3437] underline font-medium ml-auto cursor-pointer bg-transparent border-0 text-[13px] hover:text-[#173c45]">
              View Map
            </button>
          </div>

          <!-- Separator -->
          <div class="h-px bg-[#eaeaea] my-6"></div>

          <!-- Description -->
          <div class="text-[#444] leading-relaxed text-[15px]">
            <p v-for="(paragraph, index) in selectedAccommodation.description" :key="index" class="mb-4">
              {{ paragraph }}
            </p>
          </div>

          <!-- Amenities (if available) -->
          <div v-if="selectedAccommodation.amenities" class="mt-6">
            <h3 class="text-lg font-semibold text-[#1a1a1a] mb-3">Amenities</h3>
            <div class="grid grid-cols-2 gap-3">
              <div 
                v-for="(amenity, index) in selectedAccommodation.amenities" 
                :key="index"
                class="flex items-center gap-2 text-sm text-[#666]">
                <i :class="amenity.icon" class="text-[#0c3437]"></i>
                <span>{{ amenity.name }}</span>
              </div>
            </div>
          </div>

          <!-- Reviews Summary (if available) -->
          <div v-if="selectedAccommodation.rating" class="mt-6 p-4 bg-[#f8f9fa] rounded-xl">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-lg font-bold text-[#0c3437]">
                  {{ selectedAccommodation.rating }} ★
                </div>
                <div class="text-sm text-[#666]">
                  {{ selectedAccommodation.reviewCount || 0 }} reviews
                </div>
              </div>
              <button 
                @click="viewReviews"
                class="text-[#0c3437] underline text-sm font-medium bg-transparent border-0 cursor-pointer hover:text-[#173c45]">
                View all reviews
              </button>
            </div>
          </div>
        </div>

        <!-- Action Bar -->
        <div class="flex justify-between items-center px-6 py-5 bg-white border-t border-[#eaeaea] mt-auto">
          <div class="text-2xl font-bold text-[#1a1a1a]">
            {{ selectedAccommodation.price }}
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

const selectedAccommodation = computed(() => {
  return accommodationStore.getAccommodationById(accommodationId.value) || {
    title: 'Accommodation Not Found',
    subtitle: '',
    location: '',
    price: '₱0',
    image: '/images/placeholder.jpg',
    description: ['No description available.']
  }
})

const goBack = () => {
  router.push(`/booking/accommodations/${destinationId.value}`)
}

const viewMap = () => {
  if (selectedAccommodation.value.mapUrl) {
    window.open(selectedAccommodation.value.mapUrl, '_blank')
  } else {
    alert('Map not available')
  }
}

const viewReviews = () => {
  // Navigate to reviews page or show modal
  alert('Reviews feature coming soon!')
}

const bookNow = () => {
  // Save accommodation to booking store
  bookingStore.setAccommodation({
    accommodationId: accommodationId.value,
    accommodationName: selectedAccommodation.value.title,
    accommodationImage: selectedAccommodation.value.image,
    pricePerNight: selectedAccommodation.value.price,
    location: selectedAccommodation.value.location
  })
  
  // Navigate to confirmation
  router.push(`/booking/confirmation/${destinationId.value}`)
}
</script>

<style scoped>
/* Extra Small Mobile (up to 320px) */
@media (max-width: 320px) {
  .rounded-t-\[24px\] { border-radius: 20px 20px 0 0; }
  .px-6 { padding-left: 1rem; padding-right: 1rem; }
  .text-2xl { font-size: 1.25rem; }
  .h-\[70vh\] { height: 45vh; }
  .pt-\[30px\] { padding-top: 1.25rem; }
  .pb-5 { padding-bottom: 1rem; }
}

/* Small Phones (321px - 375px) */
@media (min-width: 321px) and (max-width: 375px) {
  .h-\[70vh\] { height: 50vh; }
}

/* Medium Phones (376px - 424px) */
@media (min-width: 376px) and (max-width: 424px) {
  .h-\[70vh\] { height: 55vh; }
}

/* Large Phones (425px - 767px) */
@media (min-width: 425px) and (max-width: 767px) {
  .h-\[70vh\] { height: 60vh; }
}

/* Small Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .min-h-screen {
    max-width: 768px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 20px 0;
  }
  
  .rounded-t-\[24px\] {
    margin: -50px auto 0;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Large Tablets (1024px - 1366px) */
@media (min-width: 1024px) and (max-width: 1366px) {
  .min-h-screen {
    max-width: 1024px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }
  
  .rounded-t-\[24px\] {
    max-width: 500px;
    margin: -60px auto 0;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Desktop (1367px and up) */
@media (min-width: 1367px) {
  .min-h-screen {
    max-width: 1200px;
    margin: 0 auto;
    background: #f8f9fa;
    padding: 40px 0;
  }
  
  .rounded-t-\[24px\] {
    max-width: 500px;
    margin: 0 auto;
    border-radius: 24px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

/* Landscape Mobile */
@media (max-height: 600px) and (orientation: landscape) {
  .h-\[70vh\] { height: 35vh; }
  .pt-\[30px\] { padding-top: 1.25rem; }
  .pb-5 { padding-bottom: 0.75rem; }
}

/* Very Short Screens */
@media (max-height: 500px) {
  .h-\[70vh\] { height: 30vh; }
  .pt-\[30px\] { padding-top: 1rem; }
  .pb-5 { padding-bottom: 0.625rem; }
  .text-2xl { font-size: 1.125rem; }
  .px-6 { padding-left: 0.75rem; padding-right: 0.75rem; }
  .py-5 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
}

/* Prevent Zoom on iOS */
@media screen and (max-width: 767px) {
  button {
    font-size: 16px;
  }
}

/* Safe Area Insets for Notched Devices */
@supports (padding: max(0px)) {
  .min-h-screen {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
