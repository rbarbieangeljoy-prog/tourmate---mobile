<template>
  <div class="container">
    <div class="change-password-inner">
      <!-- I. Header Section -->
      <div class="header-section">
        <div class="nav-bar">
          <button class="back-button" @click="goBack">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h1 class="screen-title">Change Password</h1>
        </div>
      </div>

      <!-- II. Main Content Area -->
      <div class="main-content">
        <div class="input-section">
          <form class="password-form" @submit.prevent="savePassword">
            <!-- Old Password Field -->
            <div class="input-group">
              <label class="input-label">Old Password</label>
              <div class="input-field">
                <input 
                  :type="showOldPassword ? 'text' : 'password'" 
                  v-model="form.oldPassword" 
                  class="input-text" 
                  placeholder="Enter your old password"
                >
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('old')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showOldPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showOldPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showOldPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showOldPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- New Password Field -->
            <div class="input-group">
              <label class="input-label">New Password</label>
              <div class="input-field">
                <input 
                  :type="showNewPassword ? 'text' : 'password'" 
                  v-model="form.newPassword" 
                  class="input-text" 
                  placeholder="Enter your new password"
                >
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('new')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showNewPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showNewPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showNewPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showNewPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Confirm Password Field -->
            <div class="input-group">
              <label class="input-label">Confirm Password</label>
              <div class="input-field">
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  v-model="form.confirmPassword" 
                  class="input-text" 
                  placeholder="Confirm your new password"
                >
                <button type="button" class="password-toggle" @click="togglePasswordVisibility('confirm')">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path v-if="!showConfirmPassword" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#666" stroke-width="2"/>
                    <circle v-if="!showConfirmPassword" cx="12" cy="12" r="3" stroke="#666" stroke-width="2"/>
                    <path v-if="showConfirmPassword" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="#666" stroke-width="2"/>
                    <line v-if="showConfirmPassword" x1="1" y1="1" x2="23" y2="23" stroke="#666" stroke-width="2"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Save Button -->
        <div class="save-button-container">
          <button type="submit" class="save-button" @click="savePassword">Save Password</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'ChangePasswordView',
  
  setup() {
    const router = useRouter()
    
    const showOldPassword = ref(false)
    const showNewPassword = ref(false)
    const showConfirmPassword = ref(false)
    
    const form = ref({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    })

    const goBack = () => {
      router.push({ name: 'profile' })
    }

    const togglePasswordVisibility = (field) => {
      if (field === 'old') {
        showOldPassword.value = !showOldPassword.value
      } else if (field === 'new') {
        showNewPassword.value = !showNewPassword.value
      } else if (field === 'confirm') {
        showConfirmPassword.value = !showConfirmPassword.value
      }
    }

    const savePassword = () => {
      // Basic validation
      if (!form.value.oldPassword || !form.value.newPassword || !form.value.confirmPassword) {
        alert('Please fill in all fields')
        return
      }

      if (form.value.newPassword !== form.value.confirmPassword) {
        alert('New password and confirm password do not match')
        return
      }

      if (form.value.newPassword.length < 8) {
        alert('Password must be at least 8 characters long')
        return
      }

      // In a real app, you would call an API here
      alert('Password changed successfully!')
      router.push({ name: 'profile' })
    }

    return {
      showOldPassword,
      showNewPassword,
      showConfirmPassword,
      form,
      goBack,
      togglePasswordVisibility,
      savePassword
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

.change-password-inner {
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
  border-radius: 0 0 100px 100px;
  padding: 25px 20px 25px;
  color: #000;
  text-align: center;
  position: relative;
  z-index: 20;
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
  color: #1a1a1a;
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
}

/* Main Content */
.main-content {
  padding: 20px 15px 15px;
  background: rgb(255, 255, 255);
  margin-top: 0;
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-section {
  max-width: 100%;
  flex: 1;
}

.password-form {
  width: 100%;
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
  display: flex;
  align-items: center;
  position: relative;
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
  flex: 1;
}

.input-text::placeholder {
  color: #adb5bd;
}

.input-text:focus {
  color: #1a1a1a;
}

.password-toggle {
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  color: #6c757d;
  transition: all 0.2s ease;
  border-radius: 4px;
}

.password-toggle:hover {
  color: #1a1a1a;
}

.save-button-container {
  padding: 0 0;
  margin-top: auto;
  margin-bottom: 20px;
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
}

.save-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(12, 52, 55, 0.3);
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
}
</style>
