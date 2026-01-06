import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTripsStore = defineStore('trips', () => {
  // State
  const upcomingTrips = ref([])
  const completedTrips = ref([])
  const editingTripId = ref(null)

  // Computed
  const allTrips = computed(() => {
    return [...upcomingTrips.value, ...completedTrips.value]
  })

  const hasTrips = computed(() => {
    return upcomingTrips.value.length > 0 || completedTrips.value.length > 0
  })

  const getTripById = (id) => {
    const trip = allTrips.value.find(trip => trip.id === id)
    if (!trip) {
      console.warn(`Trip with id "${id}" not found`)
      return null
    }
    return trip
  }

  // Actions
  const addCompletedTrip = (bookingData) => {
    if (!bookingData || !bookingData.destinationName) {
      console.error('Invalid booking data')
      return null
    }

    const newTrip = {
      id: Date.now(),
      destinationName: bookingData.destinationName || bookingData.destination,
      dates: bookingData.dates,
      nights: bookingData.nights || 0,
      totalPrice: bookingData.totalPrice || '0.00',
      status: 'upcoming',
      accommodation: bookingData.property || {
        title: bookingData.destinationName,
        location: bookingData.destinationName,
        image: bookingData.property?.image || '/images/destinations/siargao.jpg'
      },
      itinerary: {
        activities: []
      },
      packlist: {
        categories: []
      },
      createdAt: new Date().toISOString()
    }

    upcomingTrips.value.push(newTrip)
    saveToLocalStorage()
    
    console.log('✅ Trip added:', newTrip.id)
    return newTrip
  }

  const updateTripItinerary = (tripId, itineraryData) => {
    const trip = getTripById(tripId)
    if (!trip) {
      console.error(`Cannot update itinerary - trip ${tripId} not found`)
      return false
    }

    trip.itinerary = {
      activities: itineraryData.activities || [],
      lastUpdated: new Date().toISOString()
    }

    trip.packlist = {
      categories: itineraryData.packlist || [],
      lastUpdated: new Date().toISOString()
    }

    saveToLocalStorage()
    console.log('✅ Trip itinerary updated:', tripId)
    return true
  }

  const setEditingTrip = (tripId) => {
    if (!getTripById(tripId)) {
      console.error(`Cannot set editing trip - trip ${tripId} not found`)
      return false
    }

    editingTripId.value = tripId
    console.log('✅ Editing trip set:', tripId)
    return true
  }

  const clearEditingTrip = () => {
    editingTripId.value = null
    console.log('✅ Editing trip cleared')
  }

  const deleteTrip = (tripId) => {
    upcomingTrips.value = upcomingTrips.value.filter(trip => trip.id !== tripId)
    completedTrips.value = completedTrips.value.filter(trip => trip.id !== tripId)
    
    saveToLocalStorage()
    console.log('✅ Trip deleted:', tripId)
    return true
  }

  const saveToLocalStorage = () => {
    try {
      const tripsData = {
        upcoming: upcomingTrips.value,
        completed: completedTrips.value
      }
      localStorage.setItem('userTrips', JSON.stringify(tripsData))
      console.log('✅ Trips saved to localStorage')
    } catch (error) {
      console.error('Error saving trips to localStorage:', error)
    }
  }

  const loadFromLocalStorage = () => {
    try {
      const savedTrips = localStorage.getItem('userTrips')
      if (savedTrips) {
        const data = JSON.parse(savedTrips)
        upcomingTrips.value = data.upcoming || []
        completedTrips.value = data.completed || []
        console.log('✅ Trips loaded from localStorage')
      }
    } catch (error) {
      console.error('Error loading trips from localStorage:', error)
    }
  }

  const clearAllTrips = () => {
    upcomingTrips.value = []
    completedTrips.value = []
    editingTripId.value = null
    localStorage.removeItem('userTrips')
    
    console.log('✅ All trips cleared')
  }

  return {
    // State
    upcomingTrips,
    completedTrips,
    editingTripId,
    
    // Computed
    allTrips,
    hasTrips,
    
    // Actions
    getTripById,
    addCompletedTrip,
    updateTripItinerary,
    setEditingTrip,
    clearEditingTrip,
    deleteTrip,
    saveToLocalStorage,
    loadFromLocalStorage,
    clearAllTrips
  }
})
