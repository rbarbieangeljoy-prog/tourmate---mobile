<template>
  <div class="container">
    <div class="terms-inner">
      <!-- Header -->
      <header class="page-header">
        <button class="back-button" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h1 class="page-title">Terms of Service</h1>
      </header>

      <!-- Main Content -->
      <main class="main-content">
        <div class="terms-header">
          <h2>TourMate Terms of Service</h2>
          <p class="last-updated">Last updated: January 6, 2026</p>
        </div>

        <!-- Terms Sections -->
        <div class="terms-content">
          <section class="terms-section">
            <h3>1. Acceptance of Terms</h3>
            <p>
              By accessing and using TourMate ("the App"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use the App.
            </p>
          </section>

          <section class="terms-section">
            <h3>2. Use of Service</h3>
            <p>
              TourMate provides a platform for trip planning, accommodation booking, and travel management. You agree to use the service only for lawful purposes and in accordance with these terms.
            </p>
            <ul>
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree to provide accurate and complete information</li>
              <li>You will not misuse or abuse the platform</li>
            </ul>
          </section>

          <section class="terms-section">
            <h3>3. Bookings and Payments</h3>
            <p>
              All bookings made through TourMate are subject to availability and confirmation. Payment terms include:
            </p>
            <ul>
              <li>Prices are displayed in Philippine Pesos (PHP)</li>
              <li>Payment is processed securely through authorized gateways</li>
              <li>Cancellation policies vary by accommodation provider</li>
              <li>Refunds are subject to the specific property's cancellation policy</li>
            </ul>
          </section>

          <section class="terms-section">
            <h3>4. User Content</h3>
            <p>
              You may create itineraries, packing lists, and other content within the App. You retain ownership of your content, but grant TourMate a license to use, store, and display this content as necessary to provide the service.
            </p>
          </section>

          <section class="terms-section">
            <h3>5. Privacy and Data Protection</h3>
            <p>
              Your privacy is important to us. We collect and process your personal data in accordance with our Privacy Policy. By using TourMate, you consent to such processing and warrant that all data provided by you is accurate.
            </p>
          </section>

          <section class="terms-section">
            <h3>6. Intellectual Property</h3>
            <p>
              The App and its original content, features, and functionality are owned by TourMate and are protected by international copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section class="terms-section">
            <h3>7. Limitation of Liability</h3>
            <p>
              TourMate acts as an intermediary between users and accommodation providers. We are not responsible for:
            </p>
            <ul>
              <li>The quality or condition of accommodations</li>
              <li>Actions or omissions of third-party service providers</li>
              <li>Travel delays, cancellations, or disruptions</li>
              <li>Loss or damage to personal belongings</li>
            </ul>
          </section>

          <section class="terms-section">
            <h3>8. Changes to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes via email or in-app notification. Continued use of the service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section class="terms-section">
            <h3>9. Termination</h3>
            <p>
              We may terminate or suspend your account and access to the service immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties, or for any other reason.
            </p>
          </section>

          <section class="terms-section">
            <h3>10. Governing Law</h3>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions.
            </p>
          </section>

          <section class="terms-section">
            <h3>11. Contact Us</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div class="contact-info">
              <p><strong>Email:</strong> legal@tourmate.com</p>
              <p><strong>Address:</strong> Manila, Philippines</p>
            </div>
          </section>
        </div>

        <!-- Agreement Button -->
        <div class="agreement-section">
          <button class="accept-button" @click="acceptTerms">
            <i class="fas fa-check-circle"></i>
            I Accept the Terms
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TermsOfServiceView',
  
  setup() {
    const router = useRouter()

    const goBack = () => {
      router.push({ name: 'profile' })
    }

    const acceptTerms = () => {
      // Store acceptance in localStorage
      localStorage.setItem('termsAccepted', 'true')
      localStorage.setItem('termsAcceptedDate', new Date().toISOString())
      
      alert('Thank you for accepting our Terms of Service!')
      router.push({ name: 'profile' })
    }

    return {
      goBack,
      acceptTerms
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

.terms-inner {
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
  max-width: 900px;
  margin: 0 auto;
  width: 100%;
}

.terms-header {
  margin-bottom: 32px;
  text-align: center;
}

.terms-header h2 {
  font-size: 26px;
  font-weight: 700;
  color: #0c3437;
  margin: 0 0 8px 0;
}

.last-updated {
  font-size: 14px;
  color: #6b7280;
  margin: 0;
}

/* Terms Content */
.terms-content {
  background: #f9fafb;
  border-radius: 16px;
  padding: 28px 24px;
  margin-bottom: 24px;
}

.terms-section {
  margin-bottom: 32px;
}

.terms-section:last-child {
  margin-bottom: 0;
}

.terms-section h3 {
  font-size: 18px;
  font-weight: 600;
  color: #0c3437;
  margin: 0 0 12px 0;
}

.terms-section p {
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  margin: 0 0 12px 0;
}

.terms-section ul {
  list-style: none;
  padding: 0;
  margin: 12px 0;
}

.terms-section ul li {
  font-size: 14px;
  line-height: 1.7;
  color: #4b5563;
  padding-left: 24px;
  margin-bottom: 8px;
  position: relative;
}

.terms-section ul li::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: #0c3437;
  font-weight: 700;
}

.contact-info {
  background: white;
  border-left: 4px solid #0c3437;
  padding: 16px;
  border-radius: 8px;
  margin-top: 12px;
}

.contact-info p {
  margin: 8px 0;
  font-size: 14px;
}

.contact-info strong {
  color: #0c3437;
}

/* Agreement Section */
.agreement-section {
  text-align: center;
  padding: 20px 0;
}

.accept-button {
  background: linear-gradient(135deg, #0c3437 0%, #1f7a8c 100%);
  color: white;
  border: none;
  padding: 16px 40px;
  border-radius: 28px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 12px rgba(12, 52, 55, 0.3);
}

.accept-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(12, 52, 55, 0.4);
}

.accept-button i {
  font-size: 18px;
}

/* Responsive */
@media (max-width: 480px) {
  .page-header {
    padding: 20px 16px;
  }

  .main-content {
    padding: 20px 16px;
  }

  .terms-header h2 {
    font-size: 22px;
  }

  .terms-content {
    padding: 20px 16px;
  }

  .terms-section h3 {
    font-size: 16px;
  }

  .terms-section p,
  .terms-section ul li {
    font-size: 13px;
  }

  .accept-button {
    padding: 14px 32px;
    font-size: 15px;
  }
}

@media (min-width: 768px) {
  .page-header {
    padding: 28px 40px;
  }

  .main-content {
    padding: 32px 40px;
  }

  .terms-header h2 {
    font-size: 30px;
  }

  .terms-content {
    padding: 36px 32px;
  }
}
</style>
