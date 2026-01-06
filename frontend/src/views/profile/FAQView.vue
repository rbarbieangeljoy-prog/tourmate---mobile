<template>
  <div class="container">
    <div class="faq-inner">
      <!-- Header -->
      <header class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">FAQ</h1>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="faq-intro">
          <h2>Frequently Asked Questions</h2>
          <p>Find answers to common questions about using TourMate</p>
        </div>

        <!-- FAQ Items -->
        <div class="faq-list">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="faq-item"
          >
            <button 
              class="faq-question" 
              :class="{ active: activeFAQ === index }"
              @click="toggleFAQ(index)"
            >
              <span>{{ faq.question }}</span>
              <i class="fas fa-chevron-down" :class="{ rotated: activeFAQ === index }"></i>
            </button>
            <div 
              class="faq-answer" 
              :class="{ expanded: activeFAQ === index }"
            >
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>

        <!-- Contact Support -->
        <div class="support-section">
          <h3>Still have questions?</h3>
          <p>Contact our support team for more help</p>
          <button class="contact-button" @click="contactSupport">
            <i class="fas fa-envelope"></i>
            Contact Support
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'FAQView',
  
  setup() {
    const router = useRouter()
    const activeFAQ = ref(null)

    const faqs = ref([
      {
        question: 'How do I create a trip itinerary?',
        answer: 'After booking your accommodation, you can create a detailed itinerary by going to the Trips page and selecting "Edit Itinerary". Add activities for each day, set times, and organize your travel plans.'
      },
      {
        question: 'Can I modify my booking after confirmation?',
        answer: 'Yes, you can modify your booking by contacting the accommodation directly or through our support team. Modification policies vary by property, so check your booking confirmation email for details.'
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We currently accept GCash and credit/debit cards (Visa, Mastercard). All transactions are secure and encrypted for your safety.'
      },
      {
        question: 'How do I cancel a trip?',
        answer: 'To cancel a trip, go to the Trips page, select your trip, and follow the cancellation instructions. Cancellation policies vary by accommodation, so please review your booking terms.'
      },
      {
        question: 'Can I save destinations to view later?',
        answer: 'Yes! Browse destinations on the home page and click on any destination to view details. You can plan trips and save itineraries for future reference.'
      },
      {
        question: 'How do I update my profile information?',
        answer: 'Go to the Profile page and select "Personal Information". You can update your name, email, and other details there.'
      },
      {
        question: 'Is my payment information secure?',
        answer: 'Absolutely! We use industry-standard encryption and secure payment gateways to protect your financial information. We never store your complete card details on our servers.'
      },
      {
        question: 'How do I reset my password?',
        answer: 'On the login page, click "Forgot Password" and enter your email address. You\'ll receive a link to reset your password. Alternatively, go to Profile > Change Password if you\'re already logged in.'
      },
      {
        question: 'Can I share my trip itinerary with friends?',
        answer: 'This feature is coming soon! You\'ll be able to share your complete itinerary with travel companions.'
      },
      {
        question: 'What should I pack for my trip?',
        answer: 'Each trip has a built-in packing list feature! Create and manage your packing checklist by going to your trip details and accessing the "Packlist" section.'
      }
    ])

    const toggleFAQ = (index) => {
      activeFAQ.value = activeFAQ.value === index ? null : index
    }

    const goBack = () => {
      router.push({ name: 'profile' })
    }

    const contactSupport = () => {
      window.location.href = 'mailto:support@tourmate.com?subject=Support Request'
    }

    return {
      faqs,
      activeFAQ,
      toggleFAQ,
      goBack,
      contactSupport
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

.container {
  min-height: 100vh;
  min-height: 100dvh;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  width: 100vw;
  overflow-x: hidden;
  font-family: 'Poppins', sans-serif;
}

.faq-inner {
  background: #ffffff;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}

/* Header */
.page-header {
  display: flex;
  align-items: center;
  padding: 24px 20px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 10;
}

.back-button {
  background: none;
  border: none;
  font-size: 20px;
  color: #111827;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: rgba(0,0,0,0.05);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0 12px;
}

/* Main Content */
.main-content {
  flex: 1;
  padding: 24px 20px;
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
}

.faq-intro {
  margin-bottom: 32px;
  text-align: center;
}

.faq-intro h2 {
  font-size: 24px;
  font-weight: 700;
  color: #0c3437;
  margin: 0 0 8px 0;
}

.faq-intro p {
  font-size: 15px;
  color: #6b7280;
  margin: 0;
}

/* FAQ List */
.faq-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
}

.faq-item {
  background: #ffffff;
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #0c3437;
  box-shadow: 0 2px 8px rgba(12, 52, 55, 0.08);
}

.faq-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background: none;
  border: none;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.faq-question:hover {
  background: #f9fafb;
}

.faq-question.active {
  color: #0c3437;
}

.faq-question i {
  font-size: 14px;
  color: #6b7280;
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 12px;
}

.faq-question i.rotated {
  transform: rotate(180deg);
  color: #0c3437;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  padding: 0 20px;
}

.faq-answer.expanded {
  max-height: 500px;
  padding: 0 20px 18px 20px;
}

.faq-answer p {
  font-size: 14px;
  line-height: 1.7;
  color: #555;
  margin: 0;
}

/* Support Section */
.support-section {
  background: linear-gradient(135deg, #0c3437 0%, #1f7a8c 100%);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  color: white;
}

.support-section h3 {
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 8px 0;
}

.support-section p {
  font-size: 14px;
  opacity: 0.9;
  margin: 0 0 20px 0;
}

.contact-button {
  background: white;
  color: #0c3437;
  border: none;
  padding: 14px 32px;
  border-radius: 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.contact-button i {
  font-size: 16px;
}

/* Responsive */
@media (max-width: 480px) {
  .page-header {
    padding: 20px 16px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .faq-intro h2 {
    font-size: 22px;
  }

  .faq-question {
    font-size: 14px;
    padding: 16px 16px;
  }

  .faq-answer {
    padding: 0 16px;
  }

  .faq-answer.expanded {
    padding: 0 16px 16px 16px;
  }

  .support-section {
    padding: 28px 20px;
  }

  .support-section h3 {
    font-size: 18px;
  }
}

@media (min-width: 768px) {
  .page-header {
    padding: 28px 40px;
  }

  .main-content {
    padding: 32px 40px;
  }

  .faq-intro h2 {
    font-size: 28px;
  }
}
</style>
