<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-[24px] mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto flex flex-col overflow-y-auto pb-[90px]">
      
      <!-- Header -->
      <header class="px-6 pt-9 pb-3 bg-white">
        <div class="text-xl text-[#6c757d] font-medium">
          {{ greeting }} <span class="text-xl font-medium text-[#1a1a1a]">{{ userName }}!</span>
        </div>

        <!-- Search Bar -->
        <div class="flex items-center px-6 pb-4 bg-white mt-2.5">
          <div class="flex items-center gap-[15px] bg-white rounded-[30px] px-4 py-2.5 border-[1.5px] border-[#e9ecef] flex-1 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-300 -mx-2.5 mb-0 focus-within:border-[#1f4f5a] focus-within:shadow-[0_4px_16px_rgba(56,97,102,0.1)]">
            <!-- Location -->
            <div class="flex gap-2.5 items-center text-[#1f7a8c] text-xs font-semibold">
              <i class="fas fa-map-marker-alt text-[15px] text-[#1f7a8c]"></i>
              {{ currentLocation }}
            </div>
            
            <!-- Separator -->
            <div class="w-px h-7 bg-[#e9ecef]"></div>
            
            <!-- Search Input -->
            <div class="flex items-center gap-2.5 flex-1 text-[#adb5bd] text-xs font-poppins">
              <input
                type="search"
                placeholder="Search destinations..."
                :value="searchQuery"
                @input="$emit('update:search-query', $event.target.value)"
                class="border-0 outline-0 bg-transparent w-full text-[10px] text-[#495057] font-poppins placeholder:text-[#adb5bd]"
              >
              <i class="fas fa-search text-[15px] text-[#ced4da]"></i>
            </div>
          </div>
        </div>
      </header>

      <!-- Hero Section -->
      <section class="px-6 pt-4 pb-3 bg-white">
        <div 
          @click="viewDestination(featuredDestination.id)"
          class="w-[90%] mx-auto h-[350px] rounded-[20px] overflow-hidden relative bg-[#e9ecef] shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-[400ms] hover:translate-y-[-6px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
          <img 
            :src="featuredDestination.image" 
            :alt="featuredDestination.name" 
            class="w-full h-full object-cover object-[center_top] block"
          >
          <div class="absolute left-0 right-0 bottom-0 h-[65%] bg-gradient-to-b from-transparent to-black/80"></div>
          <div class="absolute left-[15px] bottom-5 right-[15px]">
            <h3 class="m-0 text-[30px] font-bold mb-0 text-white">
              {{ featuredDestination.name }}
            </h3>
            <p class="m-0 text-[13px] text-white/90">
              {{ featuredDestination.description }}
            </p>
          </div>
        </div>
      </section>

      <!-- Popular Destinations -->
      <section class="px-6 pt-4 pb-6 bg-white flex-1 mb-5">
        <div class="flex justify-between items-center mb-2.5">
          <h4 class="text-lg font-extrabold text-[#1a1a1a]">Popular Destinations 🔥</h4>
        </div>
        
        <div class="flex gap-5 overflow-x-auto py-5 scroll-smooth scrollbar-hide">
          <div
            v-for="destination in filteredDestinations"
            :key="destination.id"
            @click="viewDestination(destination.id)"
            class="min-w-[280px] w-[280px] h-[350px] bg-white rounded-[24px] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-pointer transition-all duration-300 flex-shrink-0 hover:translate-y-[-4px] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
            <div class="relative h-full w-full">
              <img 
                :src="destination.image" 
                :alt="destination.name"
                class="w-full h-full object-cover object-center"
              >
              
              <!-- Rating Pill -->
              <div class="absolute top-4 right-5 bg-white/[0.279] backdrop-blur-[8px] px-2.5 py-1 rounded-xl text-[11px] font-semibold text-[#fdfdfd] border border-white/50 m-0">
                <i class="fas fa-star text-[#ffc107]"></i> {{ destination.rating }}
              </div>
              
              <!-- Details Overlay -->
              <div class="absolute bottom-3 left-3 right-3 bg-[#847b7b4d] backdrop-blur-[10px] rounded-[20px] p-[3px] flex justify-between items-end border border-white/[0.388] shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
                <div>
                  <h5 class="text-[15px] mx-3.5 my-3.5 mt-1.5 font-bold text-white">
                    {{ destination.name }}
                  </h5>
                  <p class="text-xs text-white mx-3.5 my-0 mb-1.5">
                    {{ destination.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useDestinationStore } from '@/stores/destination'

const router = useRouter()
const authStore = useAuthStore()
const destinationStore = useDestinationStore()

const greeting = ref('')
const searchQuery = ref('')

// Computed
const userName = computed(() => authStore.userName)
const currentLocation = computed(() => destinationStore.currentLocation)
const featuredDestination = computed(() => destinationStore.featuredDestination)
const destinations = computed(() => destinationStore.destinations)

const filteredDestinations = computed(() => {
  if (!searchQuery.value) return destinations.value
  
  return destinations.value.filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

// Methods
const viewDestination = (id) => {
  destinationStore.selectDestination(id)
  router.push(`/destination/${id}`)
}

// Lifecycle
onMounted(() => {
  const hour = new Date().getHours()
  if (hour < 12) greeting.value = "Good morning,"
  else if (hour < 18) greeting.value = "Good afternoon,"
  else greeting.value = "Good evening,"
  
  // Load destinations
  destinationStore.loadDestinations()
})
</script>

<style scoped>
/* Scrollbar hide */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Responsive */
@media (max-width: 320px) {
  .px-6 { padding-left: 1rem; padding-right: 1rem; }
  .rounded-\[20px\] { height: 280px; border-radius: 20px; }
  .min-w-\[280px\] { min-width: 220px; height: 280px; }
  .text-xl { font-size: 1.125rem; }
  .text-\[30px\] { font-size: 1.125rem; }
  .text-lg { font-size: 1rem; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .min-h-screen { max-width: 768px; margin: 0 auto; }
  .rounded-\[20px\] { width: 85%; height: 400px; }
  .min-w-\[280px\] { min-width: 300px; height: 380px; }
  .text-xl { font-size: 1.375rem; }
  .text-\[30px\] { font-size: 1.5rem; }
  .text-lg { font-size: 1.25rem; }
}

@media (min-width: 1024px) and (max-width: 1366px) {
  .min-h-screen { max-width: 500px; margin: 0 auto; }
  .rounded-\[20px\] { width: 85%; height: 380px; }
  .min-w-\[280px\] { min-width: 280px; height: 360px; }
}

@supports(padding: max(0px)) {
  .min-h-screen {
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
  }
}
</style>
