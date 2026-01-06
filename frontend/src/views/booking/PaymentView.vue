<template>
  <div class="min-h-screen min-h-[100dvh] bg-white flex flex-col p-0 m-0 w-screen overflow-x-hidden">
    <div class="bg-white rounded-t-[24px] px-9 pt-9 mt-0 relative shadow-[0_-8px_32px_rgba(0,0,0,0.1)] flex-1 w-full box-border min-h-auto flex flex-col">
      
      <!-- Header -->
      <header class="flex items-center mb-10">
        <button 
          @click="goBack"
          class="bg-transparent border-0 text-lg text-black p-2 cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg transition-colors hover:bg-[#f5f5f5]">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="text-lg font-semibold ml-[15px] flex-1 m-0">{{ paymentMethodName }} Payment</h1>
      </header>

      <!-- Logo -->
      <div class="flex justify-center mb-10">
        <img :src="paymentLogo" :alt="paymentMethodName" class="w-[120px] h-[120px] object-contain">
      </div>

      <!-- GCash Payment Form -->
      <div v-if="selectedPaymentMethod === 'GCash'" class="flex-1 flex flex-col">
        <!-- Payment Card -->
        <div class="w-full max-w-[400px] bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] overflow-hidden flex-1 flex flex-col mx-auto">
          <!-- Transaction Details Box -->
          <div class="bg-[#0c3437] text-white p-6">
            <div class="grid grid-cols-2 gap-3 items-center">
              <div class="text-sm font-light opacity-90">Merchant</div>
              <div class="text-sm font-medium text-right">{{ accommodationName }}</div>
              
              <div class="text-sm font-light opacity-90">Amount Due</div>
              <div class="text-sm font-medium text-right text-xl font-bold">
                PHP {{ totalAmount.toFixed(2) }}
              </div>
            </div>
          </div>

          <!-- Login Form Area -->
          <div class="px-6 py-8 flex-1 flex flex-col">
            <h2 class="text-lg font-bold text-[#1a1a1a] text-center mb-8">
              Login to pay with GCash
            </h2>

            <!-- Mobile Number Input -->
            <div class="mb-8">
              <div class="flex items-center border-b-2 border-[#e5e7eb] pb-3">
                <span class="text-base font-medium text-[#374151] pr-3 mr-3 border-r border-[#d1d5db]">+63</span>
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  v-model="gcashMobileNumber"
                  @input="validateGcashMobileNumber"
                  maxlength="10"
                  class="flex-1 border-0 outline-none text-base text-[#1a1a1a] bg-transparent placeholder:text-[#9ca3af]"
                >
              </div>
              <div v-if="gcashMobileError" class="text-[#dc2626] text-sm mt-2">{{ gcashMobileError }}</div>
            </div>

            <!-- Pay Button -->
            <button 
              @click="processGCashPayment"
              :disabled="!isValidGcashMobile || isProcessing"
              class="w-full py-4 bg-[#0c3437] text-white border-0 rounded-[50px] text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(31,79,90,0.2)] mt-auto disabled:bg-[#9ca3af] disabled:cursor-not-allowed hover:bg-[#0c3437] hover:-translate-y-0.5">
              {{ isProcessing ? 'Processing...' : 'Pay Now' }}
            </button>
          </div>
        </div>
      </div>

      <!-- PayPal Payment Form -->
      <div v-else-if="selectedPaymentMethod === 'PayPal'" class="flex-1 flex flex-col">
        <div class="w-full max-w-[400px] bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-6 flex-1 flex flex-col mx-auto">
          <h2 class="text-lg font-bold text-[#1a1a1a] text-center mb-6">Login to PayPal</h2>
          
          <!-- Email Input -->
          <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-[#374151]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              v-model="paypalDetails.email"
              class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
          </div>

          <!-- Password Input -->
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-[#374151]">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              v-model="paypalDetails.password"
              class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
          </div>

          <!-- Amount Display -->
          <div class="bg-[#f8f9fa] rounded-xl p-5 mb-6">
            <div class="flex justify-between text-base font-bold text-[#0c3437]">
              <span>Total</span>
              <span>₱{{ totalAmount.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Pay Button -->
          <button 
            @click="processPayPalPayment"
            :disabled="!paypalDetails.email || !paypalDetails.password || isProcessing"
            class="w-full py-4 bg-[#0c3437] text-white border-0 rounded-[28px] text-base font-semibold cursor-pointer transition-all mt-auto disabled:bg-[#9ca3af] disabled:cursor-not-allowed hover:bg-[#173c45]">
            {{ isProcessing ? 'Processing...' : `Pay ₱${totalAmount.toFixed(2)}` }}
          </button>
        </div>
      </div>

      <!-- Credit Card Payment Form (Mastercard/Visa) -->
      <div v-else class="flex-1 flex flex-col">
        <!-- Card Number -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-[#374151]">Card Number</label>
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            v-model="cardDetails.cardNumber"
            @input="formatCardNumber"
            maxlength="19"
            class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
          >
        </div>

        <!-- Name on Card -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-[#374151]">Name on Card</label>
          <input
            type="text"
            placeholder="Enter full name"
            v-model="cardDetails.name"
            class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
          >
        </div>

        <!-- Expiration and CVV -->
        <div class="flex gap-4 mb-6">
          <div class="flex-1">
            <label class="block mb-2 text-sm font-medium text-[#374151]">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              v-model="cardDetails.expiry"
              @input="formatExpiry"
              maxlength="5"
              class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
          </div>
          <div class="flex-1">
            <label class="block mb-2 text-sm font-medium text-[#374151]">CVV</label>
            <input
              type="text"
              placeholder="123"
              v-model="cardDetails.cvv"
              @input="formatCVV"
              maxlength="3"
              class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
            >
          </div>
        </div>

        <!-- Postal Code -->
        <div class="mb-6">
          <label class="block mb-2 text-sm font-medium text-[#374151]">Postal Code</label>
          <input
            type="text"
            placeholder="Enter postal code"
            v-model="cardDetails.postalCode"
            @input="formatPostalCode"
            maxlength="4"
            class="w-full px-4 py-3.5 border border-[#e1e5e9] rounded-xl text-[15px] text-[#1f2937] bg-[#fafbfc] transition-all outline-none focus:border-[#0c3437] focus:bg-white focus:shadow-[0_0_0_3px_rgba(12,52,55,0.1)]"
          >
        </div>

        <!-- Save Card Option -->
        <div class="mb-6">
          <label class="flex items-center cursor-pointer text-sm text-[#333] font-medium">
            <input type="checkbox" v-model="saveCard" class="hidden">
            <span :class="[
              'w-5 h-5 border-2 rounded-md mr-3 relative transition-all bg-[#fafbfc]',
              saveCard ? 'border-[#0c3437] bg-[#0c3437]' : 'border-[#e1e5e9]'
            ]">
              <i v-if="saveCard" class="fas fa-check absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xs"></i>
            </span>
            Save credit card information
          </label>
        </div>

        <!-- Payment Details -->
        <div class="bg-[#f8f9fa] rounded-xl p-5 mb-6">
          <h2 class="text-base font-semibold text-[#0c3437] m-0 mb-4">Payment Details</h2>
          <div class="flex justify-between mb-2 text-sm text-[#1f2937]">
            <span>Amount</span>
            <span>₱{{ totalAmount.toFixed(2) }}</span>
          </div>
          <div class="flex justify-between mb-2 text-sm text-[#1f2937]">
            <span>Additional fee</span>
            <span>₱{{ additionalFee.toFixed(2) }}</span>
          </div>
          <div class="h-px bg-[#e0e0e0] my-3"></div>
          <div class="flex justify-between text-base font-bold text-[#0c3437]">
            <span>Total</span>
            <span>₱{{ (totalAmount + additionalFee).toFixed(2) }}</span>
          </div>
        </div>

        <!-- Pay Button -->
        <button 
          @click="processCardPayment"
          :disabled="!isCardFormValid || isProcessing"
          class="w-full py-4 bg-[#0c3437] text-white border-0 rounded-[28px] text-base font-semibold cursor-pointer transition-all shadow-[0_4px_12px_rgba(12,52,55,0.2)] disabled:bg-[#9ca3af] disabled:cursor-not-allowed hover:bg-[#173c45] hover:-translate-y-0.5">
          {{ isProcessing ? 'Processing...' : `Pay ₱${(totalAmount + additionalFee).toFixed(2)}` }}
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isProcessing" class="fixed inset-0 bg-white/90 flex items-center justify-center z-[1000]">
      <div class="text-center bg-white p-8 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.1)]">
        <div class="w-10 h-10 border-4 border-[#f3f3f3] border-t-[#1f4f5a] rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-[#1f4f5a] font-medium m-0">Processing payment...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBookingStore } from '@/stores/booking'

const router = useRouter()
const bookingStore = useBookingStore()

// Data
const isProcessing = ref(false)
const saveCard = ref(false)
const additionalFee = 50.00

// GCash
const gcashMobileNumber = ref('')
const gcashMobileError = ref('')

// PayPal
const paypalDetails = ref({
  email: '',
  password: ''
})

// Credit Card
const cardDetails = ref({
  name: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  postalCode: ''
})

// Computed
const selectedPaymentMethod = computed(() => bookingStore.selectedPaymentMethod?.name || 'GCash')
const totalAmount = computed(() => parseFloat(bookingStore.totalPrice.replace('₱', '').replace(',', '')) || 0)
const accommodationName = computed(() => bookingStore.currentBooking?.accommodationName || 'Accommodation')

const paymentMethodName = computed(() => selectedPaymentMethod.value)

const paymentLogo = computed(() => {
  const logos = {
    'GCash': '/images/logos/gcashlogo.png',
    'PayPal': '/images/logos/paypal.png',
    'Mastercard': '/images/logos/mastercard.png',
    'Visa': '/images/logos/visa.png'
  }
  return logos[selectedPaymentMethod.value] || logos['GCash']
})

const isValidGcashMobile = computed(() => {
  return gcashMobileNumber.value.length === 10 && /^9/.test(gcashMobileNumber.value)
})

const isCardFormValid = computed(() => {
  return cardDetails.value.name &&
         cardDetails.value.cardNumber.replace(/\s/g, '').length === 16 &&
         cardDetails.value.expiry.length === 5 &&
         cardDetails.value.cvv.length === 3 &&
         cardDetails.value.postalCode
})

// Methods
const goBack = () => {
  router.back()
}

const validateGcashMobileNumber = () => {
  gcashMobileNumber.value = gcashMobileNumber.value.replace(/\D/g, '')
  
  if (gcashMobileNumber.value.length === 0) {
    gcashMobileError.value = ''
  } else if (gcashMobileNumber.value.length !== 10) {
    gcashMobileError.value = 'Mobile number must be 10 digits'
  } else if (!gcashMobileNumber.value.startsWith('9')) {
    gcashMobileError.value = 'Mobile number must start with 9'
  } else {
    gcashMobileError.value = ''
  }
}

const formatCardNumber = (event) => {
  let value = event.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '')
  const parts = value.match(/.{1,4}/g) || []
  cardDetails.value.cardNumber = parts.join(' ')
}

const formatExpiry = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length >= 2) {
    value = value.substring(0, 2) + '/' + value.substring(2, 4)
  }
  cardDetails.value.expiry = value
}

const formatCVV = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 3) {
    value = value.substring(0, 3)
  }
  cardDetails.value.cvv = value
}

const formatPostalCode = (event) => {
  let value = event.target.value.replace(/\D/g, '')
  if (value.length > 4) {
    value = value.substring(0, 4)
  }
  cardDetails.value.postalCode = value
}

const processGCashPayment = async () => {
  if (!isValidGcashMobile.value) {
    alert('Please enter a valid 10-digit mobile number starting with 9')
    return
  }

  isProcessing.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    bookingStore.setReceiptData({
      amount: totalAmount.value.toFixed(2),
      paymentMethod: 'GCash',
      mobileNumber: `+63${gcashMobileNumber.value}`,
      receiptNumber: 'GC' + Date.now(),
      dateTime: new Date().toLocaleString()
    })
    
    router.push('/booking/receipt')
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Payment failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const processPayPalPayment = async () => {
  isProcessing.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    bookingStore.setReceiptData({
      amount: totalAmount.value.toFixed(2),
      paymentMethod: 'PayPal',
      email: paypalDetails.value.email,
      receiptNumber: 'PP' + Date.now(),
      dateTime: new Date().toLocaleString()
    })
    
    router.push('/booking/receipt')
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Payment failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}

const processCardPayment = async () => {
  if (!isCardFormValid.value) {
    alert('Please fill in all payment details correctly')
    return
  }

  isProcessing.value = true
  
  try {
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    bookingStore.setReceiptData({
      amount: (totalAmount.value + additionalFee).toFixed(2),
      paymentMethod: selectedPaymentMethod.value,
      cardLastFour: cardDetails.value.cardNumber.replace(/\s/g, '').slice(-4),
      receiptNumber: selectedPaymentMethod.value.substring(0, 2).toUpperCase() + Date.now(),
      dateTime: new Date().toLocaleString()
    })
    
    router.push('/booking/receipt')
  } catch (error) {
    console.error('Payment failed:', error)
    alert('Payment failed. Please try again.')
  } finally {
    isProcessing.value = false
  }
}
</script>

<style scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 374px) {
  .px-9 { padding-left: 1.25rem; padding-right: 1.25rem; }
  .w-\[120px\] { width: 100px; height: 100px; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .rounded-t-\[24px\] {
    max-width: 768px;
    margin: -50px auto 0;
    border-radius: 24px;
    padding: 2.5rem 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
}

@media (min-width: 1024px) {
  .rounded-t-\[24px\] {
    max-width: 500px;
    margin: 0 auto;
    border-radius: 24px;
    padding: 3rem 2.5rem;
  }
}
</style>
