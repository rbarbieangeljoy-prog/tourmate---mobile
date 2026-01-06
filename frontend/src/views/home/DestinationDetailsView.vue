<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <!-- Header with Image -->
    <div class="relative h-[55vh] min-h-[350px] max-h-[600px] overflow-hidden">
      <img 
        :src="destination.headerImage" 
        :alt="destination.name" 
        class="w-full h-full object-cover object-center"
      >
      
      <!-- Overlay Text -->
      <div class="absolute bottom-[45px] left-5 text-white text-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
        <div class="text-sm opacity-90 font-normal mb-1">
          <i class="fas fa-map-marker-alt"></i> {{ destination.location }}
        </div>
        <h1 class="text-[28px] mt-1.5 mb-0 text-white font-semibold">
          {{ destination.name }}
        </h1>
      </div>

      <!-- Back Button -->
      <button 
        @click="goBack"
        class="absolute top-5 left-5 bg-black/[0.11] backdrop-blur-[10px] border border-white/40 shadow-[0_4px_20px_rgba(0,0,0,0.08)] rounded-full w-10 h-10 text-white text-base cursor-pointer flex items-center justify-center z-10">
        <i class="fas fa-arrow-left"></i>
      </button>
    </div>

    <!-- Content Card -->
    <div class="bg-white rounded-t-[30px] -mt-[35px] relative z-[2] flex-1 flex flex-col px-6 pt-[30px] pb-5">
      
      <!-- Tabs -->
      <div class="flex gap-5 mb-2.5 border-b border-[#e0e0e0] pb-2.5">
        <div
          @click="activeTab = 'details'"
          :class="[
            'font-medium text-base text-[#555] cursor-pointer relative bg-transparent border-0 p-0',
            activeTab === 'details' ? 'text-[#0c3437] font-semibold after:content-[\'\'] after:absolute after:left-0 after:bottom-[-11px] after:w-full after:h-[2px] after:bg-[#0c3437] after:rounded-[2px]' : ''
          ]">
          Details
        </div>
        <div
          @click="activeTab = 'reviews'"
          :class="[
            'font-medium text-base text-[#555] cursor-pointer relative bg-transparent border-0 p-0',
            activeTab === 'reviews' ? 'text-[#0c3437] font-semibold after:content-[\'\'] after:absolute after:left-0 after:bottom-[-11px] after:w-full after:h-[2px] after:bg-[#0c3437] after:rounded-[2px]' : ''
          ]">
          Reviews
        </div>
      </div>

      <!-- Tab Content -->
      <div class="flex-1 overflow-y-auto">
        <!-- Details Tab -->
        <div v-if="activeTab === 'details'" class="py-2.5">
          <!-- Description -->
          <div class="text-[15px] text-[#555] leading-relaxed mt-4 text-left font-normal p-2.5">
            {{ destination.description }}
          </div>

          <!-- Map Section -->
          <div class="mt-2.5">
            <h3 class="text-lg text-[#333] mb-4 font-semibold">
              Explore {{ destination.name }}
            </h3>
            <div class="w-full h-[250px] overflow-hidden mb-3">
              <iframe
                :src="destination.mapEmbedUrl"
                width="100%"
                height="100%"
                style="border:0; border-radius: 6px;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                :title="`${destination.name} Map`"
              ></iframe>
            </div>
            
            <!-- Map Actions -->
            <div class="flex gap-2.5 justify-center flex-wrap">
              <button 
                @click="getDirections"
                class="bg-transparent text-[#0c3437] border-0 rounded-[5px] px-4 py-2 text-[10px] font-medium cursor-pointer flex items-center justify-start gap-2 transition-colors flex-1 min-w-[140px]">
                <i class="fas fa-directions"></i>
                Get Directions
              </button>
            </div>
          </div>

          <!-- Plan Trip Button -->
          <div class="mt-2.5 py-5">
            <button 
              @click="planTrip"
              class="w-full bg-[#0c3437] text-white border-0 rounded-[28px] py-3.5 text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#0a2a2d]">
              Start Planning
            </button>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-if="activeTab === 'reviews'" class="py-2.5">
          <!-- Reviews Header -->
          <div class="mb-6 p-5 bg-[#f8f9fa] rounded-2xl">
            <!-- Rating Summary -->
            <div class="flex items-center gap-5 mb-5">
              <div class="text-[#ffb400] text-2xl">
                {{ getStarRating(destination.averageRating) }}
              </div>
              <div class="text-base text-[#333] font-medium">
                <strong class="text-[28px] font-bold text-[#0c3437]">
                  {{ formatRating(destination.averageRating) }}
                </strong> · {{ destination.totalTravelers }} travelers
              </div>
            </div>

            <!-- Rating Breakdown -->
            <div class="flex flex-col gap-2">
              <div 
                v-for="rating in ratingBreakdown" 
                :key="rating.stars"
                class="flex items-center gap-2.5">
                <div class="text-[#ffb400] text-sm min-w-[60px]">
                  {{ rating.stars }}
                </div>
                <div class="flex-1 h-2 bg-[#e0e0e0] rounded overflow-hidden">
                  <div 
                    class="h-full bg-[#0c3437] rounded"
                    :style="{ width: `${rating.percentage}%` }"
                  ></div>
                </div>
                <div class="min-w-[40px] text-sm text-[#666] text-right">
                  {{ rating.percentage }}%
                </div>
              </div>
            </div>
          </div>

          <!-- Filter Reviews -->
          <div class="flex gap-2.5 mb-5 flex-wrap">
            <select 
              v-model="selectedRating"
              class="flex-1 px-4 py-2.5 border border-[#ddd] rounded-lg text-sm bg-white min-w-[150px]">
              <option value="all">All Ratings</option>
              <option value="5">★★★★★ (5)</option>
              <option value="4">★★★★☆ (4)</option>
              <option value="3">★★★☆☆ (3)</option>
              <option value="2">★★☆☆☆ (2)</option>
              <option value="1">★☆☆☆☆ (1)</option>
            </select>
          </div>

          <!-- Reviews List -->
          <div class="flex flex-col gap-4">
            <div
              v-for="review in filteredReviews"
              :key="review.id"
              class="bg-white border border-[#e8ecef] rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              
              <!-- Review Header -->
              <div class="flex justify-between items-start mb-3">
                <div class="flex gap-3 items-center">
                  <div class="w-10 h-10 bg-[#0c3437] text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {{ getInitials(review.author) }}
                  </div>
                  <div>
                    <div class="text-base font-semibold text-[#333] mb-0.5">
                      {{ review.author }}
                    </div>
                    <div class="text-xs text-[#888]">
                      {{ formatDate(review.date) }}
                    </div>
                  </div>
                </div>
                <div class="text-[#ffb400] text-base">
                  {{ getStarRating(review.rating) }}
                </div>
              </div>

              <!-- Review Text -->
              <p class="m-0 text-[15px] text-[#555] leading-relaxed font-normal">
                {{ review.text }}
              </p>

              <!-- Helpful Button -->
              <div class="mt-3">
                <button 
                  @click="toggleHelpful(review.id)"
                  class="bg-transparent border border-[#ddd] rounded-[20px] px-3 py-1.5 text-[13px] text-[#666] cursor-pointer flex items-center gap-1.5 transition-all hover:border-[#0c3437] hover:text-[#0c3437]">
                  <i class="fas fa-thumbs-up"></i> Helpful ({{ review.helpfulCount || 0 }})
                </button>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div v-if="hasMoreReviews" class="text-center mt-[30px]">
            <button 
              @click="loadMoreReviews"
              class="px-8 py-3 bg-white text-[#0c3437] border-2 border-[#0c3437] rounded-[25px] font-semibold cursor-pointer transition-all text-[15px] hover:bg-[#0c3437] hover:text-white">
              Load More Reviews
            </button>
          </div>

          <!-- Plan Trip Button -->
          <div class="mt-2.5 py-5">
            <button 
              @click="planTrip"
              class="w-full bg-[#0c3437] text-white border-0 rounded-[28px] py-3.5 text-[15px] font-medium cursor-pointer transition-colors hover:bg-[#0a2a2d]">
              Start Planning
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useDestinationStore } from '@/stores/destination'

const router = useRouter()
const route = useRoute()
const destinationStore = useDestinationStore()

const activeTab = ref('details')
const selectedRating = ref('all')
const visibleReviews = ref(5)

// Computed
const destination = computed(() => {
  const id = parseInt(route.params.id)
  return destinationStore.getDestinationById(id) || {}
})

const filteredReviews = computed(() => {
  if (!destination.value.reviews || !Array.isArray(destination.value.reviews)) {
    return []
  }

  let reviews = [...destination.value.reviews]

  if (selectedRating.value !== 'all') {
    reviews = reviews.filter(review => review.rating === parseInt(selectedRating.value))
  }

  return reviews.slice(0, visibleReviews.value)
})

const hasMoreReviews = computed(() => {
  if (!destination.value.reviews || !Array.isArray(destination.value.reviews)) {
    return false
  }

  let reviews = destination.value.reviews

  if (selectedRating.value !== 'all') {
    reviews = reviews.filter(review => review.rating === parseInt(selectedRating.value))
  }

  return visibleReviews.value < reviews.length
})

const ratingBreakdown = computed(() => {
  if (!destination.value.reviews || !Array.isArray(destination.value.reviews)) {
    return []
  }

  const total = destination.value.reviews.length
  const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  destination.value.reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      breakdown[review.rating]++
    }
  })

  return [5, 4, 3, 2, 1].map(stars => ({
    stars: '★'.repeat(stars) + '☆'.repeat(5 - stars),
    count: breakdown[stars],
    percentage: total > 0 ? Math.round((breakdown[stars] / total) * 100) : 0
  }))
})

// Methods
const goBack = () => {
  router.push('/')
}

const planTrip = () => {
  router.push(`/booking/dates/${destination.value.id}`)
}

const getDirections = () => {
  if (destination.value.directionsUrl) {
    window.open(destination.value.directionsUrl, '_blank')
  } else {
    alert('Directions URL not available')
  }
}

const getStarRating = (rating) => {
  const numRating = parseFloat(rating) || 0
  const fullStars = Math.floor(numRating)
  const halfStar = numRating % 1 >= 0.5
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)

  let stars = '★'.repeat(fullStars)
  if (halfStar) stars += '½'
  stars += '☆'.repeat(emptyStars)
  return stars
}

const formatRating = (rating) => {
  const numRating = parseFloat(rating) || 0
  return numRating.toFixed(1)
}

const getInitials = (name) => {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

const formatDate = (dateString) => {
  if (!dateString) return 'Date not available'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return 'Invalid date'
  }
}

const toggleHelpful = (reviewId) => {
  destinationStore.toggleReviewHelpful(reviewId)
}

const loadMoreReviews = () => {
  visibleReviews.value += 5
}

// Lifecycle
onMounted(() => {
  console.log('DestinationDetails mounted with destination:', destination.value)
})
</script>

<style scoped>
/* Responsive */
@media (max-width: 480px) {
  .h-\[55vh\] { height: 50vh; }
  .text-\[28px\] { font-size: 1.5rem; }
  .rounded-t-\[30px\] { padding: 1.563rem 1.25rem 0.938rem; }
  .h-\[250px\] { height: 300px; }
}

@media (min-width: 768px) {
  .min-h-screen {
    max-width: 768px;
    margin: 0 auto;
    padding: 20px;
    background: #f8f9fa;
  }
  
  .h-\[55vh\] {
    border-radius: 24px;
    overflow: hidden;
    height: 60vh;
  }
  
  .rounded-t-\[30px\] {
    border-radius: 24px;
    padding: 30px;
  }
  
  .h-\[250px\] { height: 300px; }
}

@media (min-width: 1024px) {
  .min-h-screen { max-width: 800px; }
  .h-\[55vh\] { height: 65vh; }
}

@media (max-height: 700px) {
  .h-\[55vh\] {
    height: 60vh;
    min-height: 400px;
  }
}

@media (orientation: landscape) {
  .h-\[55vh\] {
    height: 75vh;
    min-height: 400px;
  }
  
  .rounded-t-\[30px\] { margin-top: 30px; }
}
</style>
