import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useBookingStore = defineStore('booking', () => {
  // ✅ State - NO DEFAULT DATA, user must select everything
  const selectedStart = ref(null)
  const selectedEnd = ref(null)
  const selectedDestinationId = ref(null)
  const selectedDestinationName = ref('')
  const selectedProperty = ref(null) // ✅ Changed from {} to null
  const selectedPayment = ref(null)
  const booking = ref({
    dates: '',
    nights: 0
  })
  
  // ✅ FIXED - No default receipt data
  const receiptData = ref({
    amount: '',
    paymentMethod: '',
    receiptNumber: '',
    dateTime: ''
  })

  // ✅ FIXED - Computed properties with proper null checks
  const totalPrice = computed(() => {
    if (!selectedProperty.value || !selectedProperty.value.price || !booking.value.nights) {
      return '0.00'
    }
    const total = selectedProperty.value.price * booking.value.nights
    return total.toFixed(2)
  })

  const bookingDatesDisplay = computed(() => {
    if (!selectedStart.value || !selectedEnd.value) {
      return 'Select dates'
    }
    
    const monthNamesShort = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    
    const startMonth = monthNamesShort[selectedStart.value.getMonth()]
    const startDay = selectedStart.value.getDate()
    const endMonth = monthNamesShort[selectedEnd.value.getMonth()]
    const endDay = selectedEnd.value.getDate()
    const endYear = selectedEnd.value.getFullYear()
    
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`
  })

  const currentPropertyImage = computed(() => {
    if (!selectedProperty.value || !selectedProperty.value.image) {
      return '/images/accommodations/paradiso.1.avif' // Fallback only
    }
    return selectedProperty.value.image
  })

  const currentConfirmationImage = computed(() => {
    if (!selectedProperty.value || !selectedProperty.value.confirmationImage) {
      return '/images/accommodations/paradiso.1.avif' // Fallback only
    }
    return selectedProperty.value.confirmationImage
  })

  // ✅ FIXED - Proper date validation
  const setDates = (startDate, endDate) => {
    if (!startDate || !endDate) {
      console.error('Invalid dates provided to setDates')
      return
    }

    if (endDate <= startDate) {
      console.error('End date must be after start date')
      return
    }

    selectedStart.value = startDate
    selectedEnd.value = endDate
    
    // Calculate nights correctly
    const timeDiff = endDate.getTime() - startDate.getTime()
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
    
    booking.value.nights = nights
    booking.value.dates = bookingDatesDisplay.value
    
    console.log('✅ Dates set:', {
      start: startDate.toLocaleDateString(),
      end: endDate.toLocaleDateString(),
      nights: nights,
      display: booking.value.dates
    })
  }

  const setDestination = (id, name) => {
    if (!id || !name) {
      console.error('Invalid destination data')
      return
    }
    
    selectedDestinationId.value = id
    selectedDestinationName.value = name
    
    console.log('✅ Destination set:', { id, name })
  }

  const setProperty = (property) => {
    if (!property || !property.title) {
      console.error('Invalid property data')
      return
    }
    
    selectedProperty.value = property
    console.log('✅ Property set:', property.title)
  }

  const setPaymentMethod = (method) => {
    if (!method || !method.name) {
      console.error('Invalid payment method')
      return
    }
    
    selectedPayment.value = method
    console.log('✅ Payment method set:', method.name)
  }

  // ✅ FIXED - Proper receipt data generation
  const setReceiptData = (data = {}) => {
    const now = new Date()
    const formattedDateTime = now
      .toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      .replace(',', ' |')

    receiptData.value = {
      amount: data.amount || totalPrice.value,
      paymentMethod: data.paymentMethod || selectedPayment.value?.name || 'Unknown',
      receiptNumber: data.receiptNumber || generateReceiptNumber(),
      dateTime: data.dateTime || formattedDateTime,
      mobileNumber: data.mobileNumber || '' // For GCash
    }
    
    console.log('✅ Receipt data set:', receiptData.value)
  }

  // ✅ FIXED - Save complete booking data
  const saveBookingData = () => {
    if (!selectedDestinationName.value || !selectedProperty.value) {
      console.error('Cannot save incomplete booking data')
      return null
    }

    const bookingData = {
      destinationId: selectedDestinationId.value,
      destination: selectedDestinationName.value,
      property: {
        title: selectedProperty.value.title,
        subtitle: selectedProperty.value.subtitle,
        location: selectedProperty.value.location,
        price: selectedProperty.value.price,
        image: selectedProperty.value.image
      },
      dates: booking.value.dates,
      nights: booking.value.nights,
      totalPrice: totalPrice.value,
      paymentMethod: selectedPayment.value?.name || 'Unknown',
      receiptNumber: receiptData.value.receiptNumber,
      bookingDate: new Date().toISOString()
    }
    
    localStorage.setItem('lastBooking', JSON.stringify(bookingData))
    console.log('✅ Booking data saved:', bookingData)
    
    return bookingData
  }

  // ✅ FIXED - Complete clear function
  const clearBooking = () => {
    selectedStart.value = null
    selectedEnd.value = null
    selectedDestinationId.value = null
    selectedDestinationName.value = ''
    selectedProperty.value = null
    selectedPayment.value = null
    booking.value = {
      dates: '',
      nights: 0
    }
    receiptData.value = {
      amount: '',
      paymentMethod: '',
      receiptNumber: '',
      dateTime: ''
    }
    
    console.log('✅ Booking cleared')
  }

  // ✅ Validation helpers
  const isBookingValid = computed(() => {
    return !!(
      selectedStart.value &&
      selectedEnd.value &&
      selectedDestinationId.value &&
      selectedDestinationName.value &&
      selectedProperty.value &&
      booking.value.nights > 0
    )
  })

  const canProceedToPayment = computed(() => {
    return isBookingValid.value && selectedPayment.value !== null
  })

  // Helper functions
  const generateReceiptNumber = () => {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 10000)
    return `${timestamp}${random}`.substring(0, 14)
  }

  return {
    // State
    selectedStart,
    selectedEnd,
    selectedDestinationId,
    selectedDestinationName,
    selectedProperty,
    selectedPayment,
    booking,
    receiptData,
    
    // Computed
    totalPrice,
    bookingDatesDisplay,
    currentPropertyImage,
    currentConfirmationImage,
    isBookingValid,
    canProceedToPayment,
    
    // Actions
    setDates,
    setDestination,
    setProperty,
    setPaymentMethod,
    setReceiptData,
    saveBookingData,
    clearBooking
  }
})
 