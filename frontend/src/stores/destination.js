import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useDestinationStore = defineStore('destination', () => {
  // State
  const currentDestination = ref(null)
  const selectedDestinationId = ref(null)
  const selectedDestinationName = ref('')
  const activeDestinationTab = ref('details')
  const currentLocation = ref('Tampakan, PH')
  const searchQuery = ref('')

  // Featured destination for homepage
  const featuredDestination = ref({
    id: 1,
    name: 'Siargao Island',
    description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific.',
    image: '/images/destinations/siargao.jpg',
    rating: 4.9,
    tag: 'Featured'
  })

  // Destinations list for homepage
  const destinations = ref([
    {
      id: 2,
      name: 'Naked Island',
      description: 'A stunning sandbar surrounded by crystal-clear waters.',
      image: '/images/destinations/nakedisland.jpg',
      rating: 4.9
    },
    {
      id: 3,
      name: 'Guyam Island',
      description: 'A small, peaceful island ideal for relaxation and snorkeling.',
      image: '/images/destinations/guyam.jpg',
      rating: 4.7
    },
    {
      id: 4,
      name: 'Cloud 9',
      description: 'World-famous surf spot known for its powerful waves.',
      image: '/images/destinations/cloud9.jpg',
      rating: 4.8
    }
  ])

  // Full destination data (for details page)
  const destinationData = ref({
    1: {
      id: 1,
      name: 'Siargao Island',
      location: 'Surigao del Norte',
      headerImage: '/images/destinations/siargao.jpg',
      distance: '114 km',
      description: 'Siargao sits on the far eastern edge of the Philippines, facing the open Pacific. Known as the "Surfing Capital of the Philippines", Siargao is mainly responsible for introducing surfing to the country. This tear-drop shaped island offers pristine beaches, crystal-clear waters, and world-class surfing spots like Cloud 9.',
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1001692.7214812475!2d125.68288039999999!3d9.913874899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f9b2982d8c6f%3A0x7c10a1b5166f150f!2sSiargao%20Island%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
      googleMapsUrl: 'https://www.google.com/maps/place/Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!3m1!4b1!4m6!3m5!1s0x3301f9b2982d8c6f:0x7c10a1b5166f150f!8m2!3d9.9138749!4d126.065213!16zL20vMDJ4c2Nf?entry=ttu',
      directionsUrl: 'https://www.google.com/maps/dir//Siargao+Island,+Surigao+del+Norte/@9.9138749,125.6828804,10z/data=!4m6!4m5!1m0!1m3!2m2!1d126.065213!2d9.9138749?entry=ttu',
      averageRating: 4.9,
      totalTravelers: 237,
      reviews: [
        {
          id: 1,
          author: 'Anna M., Australia',
          rating: 5,
          date: '2024-01-15',
          text: 'Absolutely stunning! Siargao is a paradise for surfers and beach lovers. Cloud 9 was incredible, and the island vibes were so chill. The locals are friendly and the food is amazing.',
          helpfulCount: 42
        },
        {
          id: 2,
          author: 'Carlos R., Spain',
          rating: 5,
          date: '2024-02-10',
          text: 'One of the most beautiful islands I have ever visited. The waves are perfect for surfing and the beaches are pristine. Highly recommend staying in General Luna.',
          helpfulCount: 28
        },
        {
          id: 3,
          author: 'Sarah K., USA',
          rating: 5,
          date: '2024-03-05',
          text: 'Siargao exceeded all my expectations. The natural beauty is breathtaking and the surfing spots are world-class. The island-hopping tour was the highlight of my trip.',
          helpfulCount: 35
        },
        {
          id: 4,
          author: 'James L., UK',
          rating: 4,
          date: '2024-03-20',
          text: 'Great destination for surfing beginners and experts alike. The only downside is it gets crowded during peak season. Book accommodation early!',
          helpfulCount: 19
        },
        {
          id: 5,
          author: 'Maria S., Philippines',
          rating: 5,
          date: '2024-04-12',
          text: 'As a Filipino, I am so proud of Siargao. The island is well-maintained and the tourism facilities are excellent. The sunset at Cloud 9 pier is magical.',
          helpfulCount: 56
        }
      ]
    },
    2: {
      id: 2,
      name: 'Naked Island',
      location: 'Siargao, Surigao del Norte',
      headerImage: '/images/destinations/naked-island1.jpg',
      distance: '5 km from General Luna',
      description: "Naked Island is a pure sandbar located in the middle of the ocean. The island gets its name from having absolutely no vegetation - just pristine white sand surrounded by crystal clear turquoise waters. It's the perfect spot for swimming and sunbathing, though visitors should bring sun protection as there is no natural shade.",
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sNaked%20Island%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
      googleMapsUrl: 'https://goo.gl/maps/xxxx-naked-island',
      directionsUrl: 'https://goo.gl/maps/xxxx-naked-directions',
      averageRating: 4.8,
      totalTravelers: 189,
      reviews: [
        {
          id: 6,
          author: 'Maria L., Philippines',
          rating: 5,
          date: '2024-01-15',
          text: 'Absolutely breathtaking! The sandbar feels like a piece of paradise. The water is crystal clear and perfect for swimming. Bring lots of sunscreen!',
          helpfulCount: 24
        },
        {
          id: 7,
          author: 'Tom B., Canada',
          rating: 4,
          date: '2024-02-10',
          text: 'Beautiful spot but gets very hot with no shade. Perfect for photos and a quick swim. Make sure to go with a tour that provides umbrella.',
          helpfulCount: 18
        },
        {
          id: 8,
          author: 'Lisa M., Australia',
          rating: 5,
          date: '2024-03-05',
          text: 'Like walking on a postcard! The sand is pure white and the water colors are incredible. One of the highlights of our Siargao trip.',
          helpfulCount: 32
        }
      ]
    },
    3: {
      id: 3,
      name: 'Guyam Island',
      location: 'Siargao, Surigao del Norte',
      headerImage: '/images/destinations/guyam1.jpg',
      distance: '7 km from General Luna',
      description: "Guyam Island is a small, picturesque island with coconut trees, white sand beaches, and clear blue waters. It's part of the famous 3-island tour in Siargao and offers stunning views perfect for photography. The island has some shaded areas under coconut trees and is great for a relaxing afternoon.",
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sGuyam%20Island%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
      googleMapsUrl: 'https://goo.gl/maps/xxxx-guyam-island',
      directionsUrl: 'https://goo.gl/maps/xxxx-guyam-directions',
      averageRating: 4.7,
      totalTravelers: 156,
      reviews: [
        {
          id: 9,
          author: 'David K., USA',
          rating: 5,
          date: '2024-01-15',
          text: 'Perfect little island! The coconut trees provide nice shade and the water is amazing for swimming. Great for a picnic lunch.',
          helpfulCount: 22
        },
        {
          id: 10,
          author: 'Sophie R., France',
          rating: 4,
          date: '2024-02-10',
          text: 'Beautiful island but can get crowded during peak hours. The snorkeling around the island is quite good. Bring your own snacks.',
          helpfulCount: 15
        },
        {
          id: 11,
          author: 'Kenji T., Japan',
          rating: 5,
          date: '2024-03-05',
          text: 'The most photogenic island in Siargao! The contrast between the white sand, blue water, and green palms is stunning.',
          helpfulCount: 29
        }
      ]
    },
    4: {
      id: 4,
      name: 'Cloud 9 Surfing Area',
      location: 'Siargao, Surigao del Norte',
      headerImage: '/images/destinations/cloud91.jpg',
      distance: '2 km from General Luna',
      description: "Cloud 9 is the most famous surfing spot in Siargao, known for its perfect tubular waves. The iconic wooden pier offers the best view of surfers riding the waves. Even if you're not a surfer, it's worth visiting for the breathtaking sunset views and the lively atmosphere around the area.",
      mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125443.9238787154!2d125.9620524!3d9.8782066!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3301f8e1a2d5a5a5%3A0x7c10a1b5166f150f!2sCloud%209%2C%20General%20Luna%2C%20Surigao%20del%20Norte!5e0!3m2!1sen!2sph!4v1700000000000!5m2!1sen!2sph',
      googleMapsUrl: 'https://goo.gl/maps/xxxx-cloud9',
      directionsUrl: 'https://goo.gl/maps/xxxx-cloud9-directions',
      averageRating: 4.9,
      totalTravelers: 342,
      reviews: [
        {
          id: 12,
          author: 'Mark S., Australia',
          rating: 5,
          date: '2024-01-15',
          text: 'As a surfer, this is paradise! The waves are consistently good and the local surf community is welcoming. The pier view is amazing.',
          helpfulCount: 45
        },
        {
          id: 13,
          author: 'Emma W., UK',
          rating: 5,
          date: '2024-02-10',
          text: 'Even if you don\'t surf, the sunset from the pier is worth the visit. So many great cafes and restaurants nearby too.',
          helpfulCount: 38
        },
        {
          id: 14,
          author: 'Alex C., Brazil',
          rating: 4,
          date: '2024-03-05',
          text: 'Great surfing spot but gets very crowded. Best to go early in the morning. The energy around Cloud 9 is fantastic though!',
          helpfulCount: 27
        }
      ]
    }
  })

  // Computed
  const filteredDestinations = computed(() => {
    if (!searchQuery.value) {
      return destinations.value
    }
    
    const query = searchQuery.value.toLowerCase()
    return destinations.value.filter(
      (dest) =>
        dest.name.toLowerCase().includes(query) ||
        dest.description.toLowerCase().includes(query)
    )
  })

  const getDestinationById = computed(() => {
    return (id) => {
      const destination = destinationData.value[id]
      if (!destination) {
        console.warn(`Destination with id "${id}" not found`)
        return null
      }
      return destination
    }
  })

  const allDestinations = computed(() => {
    return Object.values(destinationData.value)
  })

  // Actions
  const setCurrentDestination = (destination) => {
    if (!destination) {
      console.error('Invalid destination data')
      return false
    }

    currentDestination.value = destination
    selectedDestinationId.value = destination.id
    selectedDestinationName.value = destination.name
    
    console.log('✅ Current destination set:', destination.name)
    return true
  }

  const selectDestination = (id) => {
    const destination = destinationData.value[id]
    if (!destination) {
      console.error(`Destination with id "${id}" not found`)
      return false
    }
    
    return setCurrentDestination(destination)
  }

  const toggleReviewHelpful = (reviewId) => {
    if (!currentDestination.value || !currentDestination.value.reviews) {
      console.error('No current destination or reviews')
      return false
    }

    const review = currentDestination.value.reviews.find((r) => r.id === reviewId)
    if (!review) {
      console.error(`Review with id "${reviewId}" not found`)
      return false
    }

    review.helpfulCount = review.helpfulCount + 1
    console.log(`✅ Review ${reviewId} marked helpful. Count: ${review.helpfulCount}`)
    return true
  }

  const setActiveTab = (tab) => {
    if (!['details', 'reviews', 'map'].includes(tab)) {
      console.error('Invalid tab name')
      return false
    }

    activeDestinationTab.value = tab
    console.log(`✅ Active tab set to: ${tab}`)
    return true
  }

  const updateSearchQuery = (query) => {
    searchQuery.value = query
  }

  const clearSelection = () => {
    currentDestination.value = null
    selectedDestinationId.value = null
    selectedDestinationName.value = ''
    activeDestinationTab.value = 'details'
    
    console.log('✅ Destination selection cleared')
  }

  return {
    // State
    currentDestination,
    selectedDestinationId,
    selectedDestinationName,
    activeDestinationTab,
    currentLocation,
    searchQuery,
    featuredDestination,
    destinations,
    destinationData,
    
    // Computed
    filteredDestinations,
    getDestinationById,
    allDestinations,
    
    // Actions
    setCurrentDestination,
    selectDestination,
    toggleReviewHelpful,
    setActiveTab,
    updateSearchQuery,
    clearSelection
  }
})
