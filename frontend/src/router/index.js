import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  // ===== AUTH ROUTES =====
  {
    path: '/onboarding',
    name: 'onboarding',
    component: () => import('@/views/auth/OnboardingView.vue'),
    meta: { 
      requiresAuth: false,
      showNav: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LogInView.vue'),
    meta: { 
      requiresAuth: false,
      showNav: false
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('@/views/auth/SignUpView.vue'),
    meta: { 
      requiresAuth: false,
      showNav: false
    }
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@/views/auth/ForgotPassView.vue'),
    meta: { 
      requiresAuth: false,
      showNav: false
    }
  },

  // ===== HOME ROUTES =====
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/HomeView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/destination/:id',
    name: 'destination-details',
    component: () => import('@/views/home/DestinationDetailsView.vue'),
    props: true,
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },

  // ===== BOOKING ROUTES =====
  {
    path: '/booking/dates',
    name: 'date-selection',
    component: () => import('@/views/booking/DateSelectionView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/booking/accommodations',
    name: 'accommodation-list',
    component: () => import('@/views/booking/AccommodationListView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/booking/accommodation/:id',
    name: 'accommodation-details',
    component: () => import('@/views/booking/AccommodationDetailsView.vue'),
    props: true,
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/booking/confirmation',
    name: 'booking-confirmation',
    component: () => import('@/views/booking/BookingConfirmationView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/booking/payment',
    name: 'payment',
    component: () => import('@/views/booking/PaymentView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/booking/receipt',
    name: 'receipt',
    component: () => import('@/views/booking/ReceiptView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },

  // ===== TRIP ROUTES =====
  {
    path: '/trips',
    name: 'trips',
    component: () => import('@/views/trip/TripsView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/trips/:id',
    name: 'trip-details',
    component: () => import('@/views/trip/TripDetailsView.vue'),
    props: true,
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/trips/:id/itinerary',
    name: 'create-itinerary',
    component: () => import('@/views/trip/ItineraryView.vue'),
    props: true,
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },


  // ===== NOTIFICATION ROUTES =====
  {
    path: '/notifications',
    name: 'notifications',
    component: () => import('@/views/notification/NotificationsView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: true
    }
  },

  // ===== PROFILE ROUTES =====
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/profile/ProfileView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: true
    }
  },
  {
    path: '/profile/edit',
    name: 'edit-profile',
    component: () => import('@/views/profile/EditProfileView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/profile/change-password',
    name: 'change-password',
    component: () => import('@/views/profile/ChangePasswordView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/profile/faq',
    name: 'faq',
    component: () => import('@/views/profile/FAQView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },
  {
    path: '/profile/terms',
    name: 'terms',
    component: () => import('@/views/profile/TermsOfServiceView.vue'),
    meta: { 
      requiresAuth: true,
      showNav: false
    }
  },

  // ===== 404 CATCH-ALL =====
  {
    path: '/:pathMatch(.*)*',
    redirect: '/home'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// ===== NAVIGATION GUARDS =====

// Before each route
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status
  const isAuthenticated = authStore.checkAuth()
  
  console.log(`🧭 Navigation: ${from.name || 'start'} → ${to.name}`)
  console.log(`🔒 Auth required: ${to.meta.requiresAuth}, Authenticated: ${isAuthenticated}`)

  // Handle protected routes
  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('⛔ Access denied - redirecting to login')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  }
  // Handle auth pages when already logged in
  else if (!to.meta.requiresAuth && isAuthenticated && ['login', 'signup', 'forgot-password', 'onboarding'].includes(to.name)) {
    console.log('✅ Already authenticated - redirecting to home')
    next('/home')
  }
  // Allow navigation
  else {
    next()
  }
})

// After each route
router.afterEach((to) => {
  console.log(`📍 Current page: ${to.name} | Show Nav: ${to.meta.showNav}`)
  
  // Update document title
  const titles = {
    'home': 'Home - Travel App',
    'destination-details': 'Destination Details - Travel App',
    'date-selection': 'Select Dates - Travel App',
    'accommodation-list': 'Accommodations - Travel App',
    'accommodation-details': 'Accommodation Details - Travel App',
    'booking-confirmation': 'Confirm Booking - Travel App',
    'payment': 'Payment - Travel App',
    'receipt': 'Receipt - Travel App',
    'trips': 'My Trips - Travel App',
    'trip-details': 'Trip Details - Travel App',
    'create-itinerary': 'Create Itinerary - Travel App',
    'notifications': 'Notifications - Travel App',
    'profile': 'Profile - Travel App',
    'edit-profile': 'Edit Profile - Travel App',
    'change-password': 'Change Password - Travel App',
    'faq': 'FAQ - Travel App',
    'terms': 'Terms of Service - Travel App',
    'login': 'Login - Travel App',
    'signup': 'Sign Up - Travel App',
    'forgot-password': 'Forgot Password - Travel App',
    'onboarding': 'Welcome - Travel App',
  }
  
  document.title = titles[to.name] || 'Travel App'
})

export default router
