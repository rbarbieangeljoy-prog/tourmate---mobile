<template>
  <div class="container">
    <div class="personal-info-inner">
      <!-- I. Header Section -->
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-button" @click="goBack">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="screen-title">Personal Information</h1>
        </div>

        <div class="avatar-section">
          <div class="avatar-container">
            <div class="avatar-image">
              <img :src="userStore.avatar || '/images/profilepicture.png'" alt="Profile Picture" class="profile-picture">
            </div>
            <button class="edit-photo" @click="handleEditPhoto">Edit Photo</button>
          </div>
        </div>
      </div>

      <!-- II. Main Content Area -->
      <div class="main-content">
        <div class="input-section">
          <!-- First Name Field -->
          <div class="input-group">
            <label class="input-label">First Name</label>
            <div class="input-field">
              <input 
                type="text" 
                v-model="userStore.firstName" 
                class="input-text" 
                placeholder="Enter your first name"
              >
            </div>
          </div>

          <!-- Last Name Field -->
          <div class="input-group">
            <label class="input-label">Last Name</label>
            <div class="input-field">
              <input 
                type="text" 
                v-model="userStore.lastName" 
                class="input-text" 
                placeholder="Enter your last name"
              >
            </div>
          </div>

          <!-- Email Field -->
          <div class="input-group">
            <label class="input-label">Email</label>
            <div class="input-field">
              <input 
                type="email" 
                v-model="userStore.email" 
                class="input-text" 
                placeholder="Enter your email"
                :readonly="emailReadonly"
              >
            </div>
          </div>

          <!-- Location Field -->
          <div class="input-group">
            <label class="input-label">Location</label>
            <div class="input-field">
              <input 
                type="text" 
                v-model="userStore.location" 
                class="input-text" 
                placeholder="Enter your location"
              >
            </div>
          </div>

          <!-- Save Button -->
          <button class="save-button" @click="handleSave">Save</button>

          <!-- Additional Options -->
          <div class="options-section">
            <div class="divider"></div>

            <!-- Connect with Facebook -->
            <div class="option-item" @click="connectFacebook">
              <div class="option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" fill="#1877F2"/>
                  <path d="M16 8h-3c-.55 0-1 .45-1 1v3h4l-.5 4h-3.5v7h-4v-7H7v-4h3V9c0-2.21 1.79-4 4-4h3v3z" fill="white"/>
                </svg>
              </div>
              <span class="option-text">Connect with Facebook</span>
            </div>

            <!-- Delete Account -->
            <div class="option-item delete-option" @click="deleteAccount">
              <div class="option-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6h18" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#666" stroke-width="2"/>
                  <path d="M10 11v6" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                  <path d="M14 11v6" stroke="#666" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
              <span class="option-text">Delete account</span>
            </div>
          </div>
        </div>

        <!-- III. Promotional Banner -->
        <div class="promotion-banner">
          <p class="promotion-text">Unlock all features and get access to real time<br>updates to make smart travel even easier!</p>
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
  name: 'EditProfileView',
  
  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    // Load profile from localStorage when component mounts
    userStore.loadFromLocalStorage()

    const emailReadonly = computed(() => true) // Email shouldn't be editable after signup

    const goBack = () => {
      router.push({ name: 'profile' })
    }

    const handleSave = () => {
      // Validate required fields
      if (!userStore.firstName || !userStore.email) {
        alert('Please fill in at least your first name and email')
        return
      }

      // Save to localStorage
      userStore.saveToLocalStorage()
      alert('Profile saved successfully!')
      router.push({ name: 'profile' })
    }

    const handleEditPhoto = () => {
      console.log('Edit photo clicked')
      alert('Photo upload feature coming soon!')
    }

    const connectFacebook = () => {
      alert('Facebook connection feature coming soon!')
    }

    const deleteAccount = () => {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        userStore.clearUserProfile()
        localStorage.removeItem('isAuthenticated')
        router.push({ name: 'login' })
      }
    }

    return {
      userStore,
      emailReadonly,
      goBack,
      handleSave,
      handleEditPhoto,
      connectFacebook,
      deleteAccount
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

.personal-info-inner {
  background: #ffffff;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
}

/* Header Section */
.header-section {
  background: #ffffff;
  border-radius: 0 0 25px 25px;
  padding: 25px 20px 25px;
  position: relative;
  z-index: 10;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nav-bar {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.back-button {
  background: none;
  border: none;
  font-size: 18px;
  color: #000;
  padding: 8px;
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
  background: rgba(0, 0, 0, 0.05);
}

.screen-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  flex: 1;
  text-align: center;
  margin-right: 40px;
  color: #000;
}

.avatar-section {
  display: flex;
  justify-content: center;
}

.avatar-container {
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
  margin-bottom: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.profile-picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.edit-photo {
  background: none;
  border: none;
  color: #000;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;
}

.edit-photo:hover {
  background: rgba(0, 0, 0, 0.05);
}

/* Main Content */
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
}

.input-section {
  max-width: 100%;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #6c757d;
  margin-bottom: 8px;
  padding-left: 5px;
}

.input-field {
  border: 1.5px solid #e1e5e9;
  border-radius: 12px;
  padding: 0 16px;
  background: white;
  transition: all 0.2s ease;
}

.input-field:focus-within {
  border-color: #0c3437;
  box-shadow: 0 0 0 3px rgba(31, 79, 90, 0.1);
}

.input-text {
  width: 100%;
  border: none;
  outline: none;
  padding: 14px 0;
  font-size: 15px;
  color: #1a1a1a;
  background: transparent;
}

.input-text::placeholder {
  color: #adb5bd;
}

.input-text:focus {
  color: #1a1a1a;
}

.input-text[readonly] {
  color: #6c757d;
  cursor: not-allowed;
}

.save-button {
  width: 100%;
  background: linear-gradient(135deg, #0C3437 0%, #1f7a8c 100%);
  color: white;
  border: none;
  border-radius: 28px;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  margin-top: 10px;
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(12, 52, 55, 0.3);
}

/* Options Section */
.options-section {
  margin-top: 24px;
}

.divider {
  height: 1px;
  background: #e1e5e9;
  margin: 20px 0;
}

.option-item {
  display: flex;
  align-items: center;
  padding: 14px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option-item:hover {
  opacity: 0.7;
}

.option-icon {
  width: 20px;
  height: 20px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-text {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.delete-option .option-text {
  color: #DC2626;
}

/* Promotion Banner */
.promotion-banner {
  background: linear-gradient(135deg, #0C3437 0%, #208991 17%, #186A70 35%, #18777E 66%, #208991 82%, #0C3437 100%);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 24px 0 0 0;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.promotion-text {
  color: white;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

/* Responsive */
@media (max-width: 480px) {
  .header-section {
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

  .header-section {
    border-radius: 24px 24px 0 0;
  }

  .main-content {
    border-radius: 0 0 24px 24px;
  }
}
</style>
