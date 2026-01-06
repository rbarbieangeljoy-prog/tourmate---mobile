<template>
  <div class="container">
    <div class="profile-inner">
      <!-- I. Header and User Identity Section -->
      <div class="profile-header">
        <h1 class="screen-title">Profile</h1>
        <div class="user-info">
          <div class="avatar">
            <div class="avatar-image">
              <img src="/images/profilepicture.png" alt="Profile Picture" class="profile-picture">
            </div>
          </div>
          <h2 class="user-name">{{ fullName }}</h2>
          <p class="user-location">{{ userLocation }}</p>
        </div>
      </div>

      <!-- II. Account Settings List -->
      <div class="main-content">
        <div class="section">
          <h3 class="section-title">Account Settings</h3>
          <div class="settings-list">
            <div class="setting-item" @click="goToEditProfile">
              <div class="icon-wrapper">
                <i class="fa-solid fa-pen-to-square"></i>
              </div>
              <span class="setting-text">Personal Information</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="goToChangePassword">
              <div class="icon-wrapper">
                <i class="fa-solid fa-lock"></i>
              </div>
              <span class="setting-text">Change Password</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- III. General Information and Feedback List -->
        <div class="section">
          <h3 class="section-title">Others</h3>
          <div class="settings-list">
            <div class="setting-item" @click="goToFAQ">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#333" stroke-width="2"/>
                  <text x="12" y="16" text-anchor="middle" fill="#333" font-size="12" font-weight="bold">?</text>
                </svg>
              </div>
              <span class="setting-text">FAQ</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="goToTerms">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#333" stroke-width="2"/>
                  <polyline points="14,2 14,8 20,8" stroke="#333" stroke-width="2"/>
                  <line x1="16" y1="13" x2="8" y2="13" stroke="#333" stroke-width="2"/>
                  <line x1="16" y1="17" x2="8" y2="17" stroke="#333" stroke-width="2"/>
                  <polyline points="10,9 9,9 8,9" stroke="#333" stroke-width="2"/>
                </svg>
              </div>
              <span class="setting-text">Terms of Service</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>

            <div class="setting-item" @click="handleRateUs">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <polygon points="12,2 15,9 22,9 16,14 19,21 12,17 5,21 8,14 2,9 9,9" fill="#FFD700" stroke="#FFA500" stroke-width="1"/>
                </svg>
              </div>
              <span class="setting-text">Rate Us</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- IV. Session Management -->
        <div class="section">
          <h3 class="section-title">Session</h3>
          <div class="settings-list">
            <div class="setting-item logout" @click="handleLogout">
              <div class="icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#DC2626" stroke-width="2"/>
                  <polyline points="16,17 21,12 16,7" stroke="#DC2626" stroke-width="2"/>
                  <line x1="21" y1="12" x2="9" y2="12" stroke="#DC2626" stroke-width="2"/>
                </svg>
              </div>
              <span class="setting-text logout-text">Log out</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" class="chevron">
                <path d="M9 18L15 12L9 6" stroke="#666" stroke-width="2"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- V. Promotion Banner -->
        <div class="section">
          <div class="promotion-banner">
            <p class="promotion-text">
              Unlock all features and get access to real time<br>updates to make smart travel even easier!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export default {
  name: 'ProfileView',
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    // Load user data from store
    userStore.loadFromLocalStorage()

    // Computed properties from store
    const fullName = computed(() => {
      const first = userStore.firstName || ''
      const last = userStore.lastName || ''
      if (first && last) return `${first} ${last}`
      if (first) return first
      return 'User'
    })

    const userLocation = computed(() => {
      return userStore.location || 'Tampakan, Soccsksargen, PH'
    })

    // Navigation methods
    const goToEditProfile = () => {
      router.push({ name: 'edit-profile' })
    }

    const goToChangePassword = () => {
      router.push({ name: 'change-password' })
    }

    const goToFAQ = () => {
      router.push({ name: 'faq' })
    }

    const goToTerms = () => {
      router.push({ name: 'terms-of-service' })
    }

    const handleRateUs = () => {
      alert('Rate Us feature would open app store rating dialog')
    }

    const handleLogout = () => {
      if (confirm('Are you sure you want to log out?')) {
        userStore.clearUserProfile()
        localStorage.removeItem('isAuthenticated')
        router.push({ name: 'login' })
      }
    }

    return {
      fullName,
      userLocation,
      goToEditProfile,
      goToChangePassword,
      goToFAQ,
      goToTerms,
      handleRateUs,
      handleLogout
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

:root {
  --muted: #6c757d;
  --dark: #1a1a1a;
  --teal-1: #1f4f5a;
  --teal-2: #1f7a8c;
  --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  --hover-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

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

.profile-inner {
  background: #ffffff;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 90px;
}

/* I. Header and User Identity Section */
.profile-header {
  background: #0C3437;
  border-radius: 0 0 25px 25px;
  padding: 25px 20px 25px;
  color: white;
  text-align: center;
  position: relative;
  z-index: 10;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.screen-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  letter-spacing: 0.5px;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.user-name {
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 6px 0;
  letter-spacing: 0.3px;
}

.user-location {
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
  font-weight: 500;
}

/* II. Main Content */
.main-content {
  padding: 20px 15px 15px;
  background: white;
  margin-top: -10px;
  border-radius: 25px 25px 0 0;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
}

.section {
  margin-bottom: 20px;
  width: 100%;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #6B7280;
  margin-bottom: 12px;
  padding-left: 8px;
}

.settings-list {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  border: 1.5px solid #e1e5e9;
  width: 100%;
}

.setting-item {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.2s ease;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
  box-sizing: border-box;
}

.setting-item:hover {
  background-color: #f8f9fa;
}

.setting-item:active {
  background-color: #f0f0f0;
}

.setting-item:last-child {
  border-bottom: none;
}

.icon-wrapper {
  width: 22px;
  height: 22px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.setting-text {
  flex: 1;
  font-size: 15px;
  color: #333;
  font-weight: 500;
  word-wrap: break-word;
}

.chevron {
  flex-shrink: 0;
  margin-left: 8px;
}

/* IV. Session Management */
.logout .setting-text {
  color: #DC2626;
  font-weight: 600;
}

.logout-text {
  color: #DC2626 !important;
}

/* Promotion Banner */
.promotion-banner {
  background: linear-gradient(135deg, #0C3437 0%, #208991 17%, #186A70 35%, #18777E 66%, #208991 82%, #0C3437 100%);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 0;
  text-align: center;
  border: 1.5px solid #e1e5e9;
  position: relative;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.promotion-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  white-space: normal;
  text-align: center;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Responsive */
@media (max-width: 480px) {
  .profile-header {
    padding: 22px 18px 22px;
    min-height: 150px;
  }

  .main-content {
    padding: 18px 14px 14px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    margin: 0 auto;
  }

  .profile-header {
    border-radius: 24px 24px 0 0;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
  }
}
</style>
