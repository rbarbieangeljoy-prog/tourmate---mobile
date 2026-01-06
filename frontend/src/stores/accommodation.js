import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAccommodationStore = defineStore('accommodation', () => {
  // State - Your exact properties from App.vue
  const properties = ref({
    paradiso: {
      title: 'Paradiso Hostel Bunks',
      subtitle: 'Solo - 1 single bed',
      location: 'General Luna, Philippines',
      description: [
        'Paradiso Hostel is a traditional style building with 5 double occupancy, fully air-conditioned private rooms each with its own toilet and baths, spacious work desks and benches.',
        "The hostel has its own kitchen should you wish to just chill in your room or if you're just feeling lazy (or nursing a hangover)."
      ],
      price: 700.0,
      image: '/images/accommodations/paradiso.1.avif',
      confirmationImage: '/images/accommodations/paradiso.1.avif'
    },
    copacabana: {
      title: 'Copacabana Siargao',
      subtitle: 'Solo - 1 queen-sized bed',
      location: 'General Luna, Philippines',
      description: [
        'Copacabana Siargao rooms with air-conditioning, private bathrooms, bidets, work desks, free toiletries, showers, and wardrobes. Each room includes a terrace and free WiFi.',
        'Located just steps away from the famous Cloud 9 surf break, this hotel is perfect for surf enthusiasts and beach lovers alike.'
      ],
      price: 2950.0,
      image: '/images/accommodations/copacabana.1.jpg',
      confirmationImage: '/images/accommodations/copacabana.1.jpg'
    },
    casavia: {
      title: 'Casavia Siargao',
      subtitle: 'Solo - 1 bunked bed',
      location: 'General Luna, Philippines',
      description: [
        'Casavia Siargao in General Luna offers a garden, bar, and free WiFi. Guests can relax in the lounge or prepare meals in the shared kitchen. Additional amenities include air-conditioning, bidet, shower, and wardrobe.',
        'General Luna Beach is an 8-minute walk away. Nearby attractions include Guyam Island (4 km), Naked Island (14 km), and Magpupungko Rock Pools (38 km).'
      ],
      price: 890.0,
      image: '/images/accommodations/casavia.1.jpg',
      confirmationImage: '/images/accommodations/casavia.1.jpg'
    }
  })

  // Computed - Getters
  const getPropertyById = computed(() => {
    return (id) => {
      const property = properties.value[id]
      if (!property) {
        console.warn(`Property with id "${id}" not found`)
        return null
      }
      return property
    }
  })

  const getAllProperties = computed(() => {
    return Object.entries(properties.value).map(([id, property]) => ({
      id,
      ...property
    }))
  })

  const getPropertiesByPriceRange = computed(() => {
    return (minPrice, maxPrice) => {
      return Object.entries(properties.value)
        .filter(([_, property]) => 
          property.price >= minPrice && property.price <= maxPrice
        )
        .map(([id, property]) => ({ id, ...property }))
    }
  })

  // Actions
  const addProperty = (id, propertyData) => {
    if (!id || !propertyData || !propertyData.title) {
      console.error('Invalid property data')
      return false
    }
    
    properties.value[id] = propertyData
    console.log(`✅ Property "${id}" added`)
    return true
  }

  const updateProperty = (id, updates) => {
    if (!properties.value[id]) {
      console.error(`Property "${id}" not found`)
      return false
    }
    
    properties.value[id] = {
      ...properties.value[id],
      ...updates
    }
    console.log(`✅ Property "${id}" updated`)
    return true
  }

  const removeProperty = (id) => {
    if (!properties.value[id]) {
      console.error(`Property "${id}" not found`)
      return false
    }
    
    delete properties.value[id]
    console.log(`✅ Property "${id}" removed`)
    return true
  }

  return {
    // State
    properties,
    
    // Getters
    getPropertyById,
    getAllProperties,
    getPropertiesByPriceRange,
    
    // Actions
    addProperty,
    updateProperty,
    removeProperty
  }
})
