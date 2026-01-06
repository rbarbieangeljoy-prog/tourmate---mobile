import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const usePaymentStore = defineStore('payment', () => {
  // State - Payment methods from your App.vue
  const paymentMethods = ref([
    {
      id: 'mastercard',
      name: 'Mastercard',
      logo: '/images/logos/mastercard.png',
      type: 'card'
    },
    {
      id: 'gcash',
      name: 'GCash',
      logo: '/images/logos/gcash_logo.png',
      type: 'ewallet'
    }
  ])

  // Transaction history
  const transactions = ref([])

  // Computed
  const getPaymentMethodById = computed(() => {
    return (id) => {
      return paymentMethods.value.find(method => method.id === id) || null
    }
  })

  const getPaymentMethodsByType = computed(() => {
    return (type) => {
      return paymentMethods.value.filter(method => method.type === type)
    }
  })

  const totalTransactions = computed(() => transactions.value.length)

  // Actions
  const addPaymentMethod = (method) => {
    if (!method || !method.id || !method.name) {
      console.error('Invalid payment method data')
      return false
    }

    const exists = paymentMethods.value.find(m => m.id === method.id)
    if (exists) {
      console.warn(`Payment method "${method.id}" already exists`)
      return false
    }

    paymentMethods.value.push(method)
    console.log(`✅ Payment method "${method.name}" added`)
    return true
  }

  const removePaymentMethod = (id) => {
    const index = paymentMethods.value.findIndex(method => method.id === id)
    if (index === -1) {
      console.error(`Payment method "${id}" not found`)
      return false
    }

    paymentMethods.value.splice(index, 1)
    console.log(`✅ Payment method "${id}" removed`)
    return true
  }

  const addTransaction = (transaction) => {
    if (!transaction || !transaction.receiptNumber) {
      console.error('Invalid transaction data')
      return false
    }

    const transactionData = {
      ...transaction,
      timestamp: new Date().toISOString(),
      id: `txn_${Date.now()}`
    }

    transactions.value.push(transactionData)
    console.log('✅ Transaction recorded:', transactionData.id)
    return true
  }

  const getTransactionById = (id) => {
    return transactions.value.find(txn => txn.id === id) || null
  }

  const clearTransactions = () => {
    transactions.value = []
    console.log('✅ All transactions cleared')
  }

  return {
    // State
    paymentMethods,
    transactions,
    
    // Getters
    getPaymentMethodById,
    getPaymentMethodsByType,
    totalTransactions,
    
    // Actions
    addPaymentMethod,
    removePaymentMethod,
    addTransaction,
    getTransactionById,
    clearTransactions
  }
})
