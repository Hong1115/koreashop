<template>
  <div class="auth-page">
    <div class="auth-box">
      <h2 class="auth-title">{{ isLogin ? '會員登入' : '會員註冊' }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="auth-fields">
          
          <div v-if="isLogin">
            <!-- 登入模式 -->
            <div class="input-group">
              <label for="login-account">Email</label>
              <input 
                type="text" 
                id="login-account" 
                v-model="account" 
                placeholder="請輸入 Email"
              >
            </div>
            <div class="input-group">
              <label for="login-password">密碼</label>
              <input 
                type="password" 
                id="login-password" 
                v-model="password" 
                placeholder="請輸入密碼"
              >
            </div>
          </div>
          
          <div v-else>
            <!-- 註冊模式 -->
            <div class="input-group">
              <label for="register-account">Email <span class="required">*</span></label>
              <input 
                type="text" 
                id="register-account" 
                v-model="account" 
                placeholder="請輸入 Email"
                :class="{ 'error': errors.account }"
              >
              <span v-if="errors.account" class="error-message">{{ errors.account }}</span>
            </div>
            
            <div class="input-group">
              <label for="last-name">姓名 <span class="required">*</span></label>
              <input 
                type="text" 
                id="last-name" 
                v-model="lastName" 
                placeholder="請輸入您的姓名"
                :class="{ 'error': errors.lastName }"
              >
              <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
            </div>
            
            <div class="input-group">
              <label for="phone">手機 <span class="required">*</span></label>
              <input 
                type="tel" 
                id="phone" 
                v-model="phoneNumber" 
                placeholder="請輸入手機號碼"
                :class="{ 'error': errors.phoneNumber }"
              >
              <span v-if="errors.phoneNumber" class="error-message">{{ errors.phoneNumber }}</span>
            </div>
            
            <div class="input-group">
              <label for="register-password">密碼 <span class="required">*</span></label>
              <input 
                type="password" 
                id="register-password" 
                v-model="password" 
                placeholder="8-14字,須含英文及數字"
                :class="{ 'error': errors.password }"
              >
              <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
              <div class="password-hint">
              8-14個字元,必須包含英文字母和數字,不可有符號,不可連續三個相同字元
              </div>
            </div>
            
            <div class="input-group">
              <label for="confirm-password">確認密碼 <span class="required">*</span></label>
              <input 
                type="password" 
                id="confirm-password" 
                v-model="confirmPassword" 
                placeholder="請再次輸入密碼"
                :class="{ 'error': errors.confirmPassword }"
              >
              <span v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</span>
            </div>
          </div>
        </div>
        
        <!-- 登入或註冊按鈕 -->
        <button type="submit" class="auth-button" :class="isLogin ? 'login-button' : 'register-button'">
          {{ isLogin ? '登入' : '註冊' }}
        </button>
      </form>
      
      <p class="switch-link">
        <span v-if="isLogin">還沒有帳號嗎？</span>
        <span v-else>已經有帳號了？</span>
        
        <router-link :to="isLogin ? '/register' : '/login'">
          {{ isLogin ? '點此註冊' : '點此登入' }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
import { registerUser, loginUser } from '@/utils/auth';

export default {
  name: 'Login',
  data() {
    return {
      account: '',        // Email (當作帳號)
      password: '',
      confirmPassword: '',
      lastName: '',
      phoneNumber: '',
      errors: {}
    };
  },
  computed: {
    isLogin() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    // 驗證 Email 格式
    validateEmail(email) {
      if (!email.trim()) {
        return '請輸入 Email';
      }
      if (!email.includes('@')) {
        return 'Email 必須包含 @';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return '請輸入正確的 Email 格式';
      }
      return null;
    },
    
    // 驗證手機號碼
    validatePhone(phone) {
      if (!phone.trim()) {
        return '請輸入手機號碼';
      }
      const cleanPhone = phone.replace(/\s|-/g, '');
      if (!/^09\d{8}$/.test(cleanPhone)) {
        return '手機號碼必須是 09 開頭的 10 位數字';
      }
      return null;
    },
    
    // 驗證密碼
    validatePassword(password) {
      if (!password) {
        return '請輸入密碼';
      }
      
      if (password.length < 8 || password.length > 14) {
        return '密碼長度必須在 8-14 個字元之間';
      }
      
      if (!/^[a-zA-Z0-9]+$/.test(password)) {
        return '密碼只能包含英文字母和數字,不可有符號';
      }
      
      if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        return '密碼必須同時包含英文字母和數字';
      }
      
      for (let i = 0; i < password.length - 2; i++) {
        if (password[i] === password[i + 1] && password[i] === password[i + 2]) {
          return '密碼不可包含連續三個相同的字元';
        }
      }
      
      return null;
    },
    
    // 驗證註冊表單
    validateRegisterForm() {
      this.errors = {};
      
      // 驗證 Email
      const emailError = this.validateEmail(this.account);
      if (emailError) {
        this.errors.account = emailError;
      }
      
      // 驗證姓名
      if (!this.lastName.trim()) {
        this.errors.lastName = '請輸入姓名';
      }
      
      // 驗證手機
      const phoneError = this.validatePhone(this.phoneNumber);
      if (phoneError) {
        this.errors.phoneNumber = phoneError;
      }
      
      // 驗證密碼
      const passwordError = this.validatePassword(this.password);
      if (passwordError) {
        this.errors.password = passwordError;
      }
      
      // 驗證確認密碼
      if (!this.confirmPassword) {
        this.errors.confirmPassword = '請再次輸入密碼';
      } else if (this.password !== this.confirmPassword) {
        this.errors.confirmPassword = '兩次密碼輸入不一致';
      }
      
      return Object.keys(this.errors).length === 0;
    },
    
    handleSubmit() {
      if (this.isLogin) {
        // 登入邏輯
        if (!this.account || !this.password) {
          alert('請輸入 Email 和密碼');
          return;
        }
        
        const result = loginUser(this.account, this.password);
        
        if (result.success) {
          alert(`歡迎回來, ${result.user.name}!`);
          this.$router.push('/');
        } else {
          alert(result.message);
        }
      } else {
        // 註冊邏輯
        if (!this.validateRegisterForm()) {
          alert('請修正表單中的錯誤');
          return;
        }
        
        const userData = {
          email: this.account,
          name: this.lastName,
          phone: this.phoneNumber.replace(/\s|-/g, ''),
          password: this.password
        };
        
        const result = registerUser(userData);
        
        if (result.success) {
          alert('註冊成功!請使用您的 Email 登入。');
          this.$router.push('/login');
        } else {
          alert(result.message);
        }
      }
    }
  },
  watch: {
    '$route'() {
      // 切換路由時清空表單和錯誤訊息
      this.account = '';
      this.password = '';
      this.confirmPassword = '';
      this.lastName = '';
      this.phoneNumber = '';
      this.errors = {};
    }
  }
}
</script>

<style scoped lang="scss">
.auth-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 100px); 
  background-color: #f6f6f6;
  padding-top: 50px;
}

.auth-box {
  width: 100%;
  max-width: 550px;
  background-color: #fff;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.auth-title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  border-bottom: 3px solid #a29680;
  padding-bottom: 15px;
}

.input-group {
  text-align: left;
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 20px;
  color: #363636ea;
  margin-bottom: 8px;
  font-weight: 550;
}

.required {
  color: #d9534f;
}

input[type="text"],
input[type="password"],
input[type="tel"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #655345;
    outline: none;
    box-shadow: 0 0 5px rgba(#655345, 0.2);
  }
  
  &.error {
    border-color: #d9534f;
  }
}

.error-message {
  display: block;
  color: #d9534f;
  font-size: 14px;
  margin-top: 5px;
  font-weight: 500;
}

.password-hint {
  font-size: 16px;
  color: #666;
  margin-top: 5px;
  line-height: 1.4;
}

.auth-button {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
  margin-top: 10px;
}

.login-button,
.register-button {
  background-color: #655345;
  color: #fff;
  
  &:hover {
    background-color: darken(#655345, 8%);
  }
}

.switch-link {
  margin-top: 25px;
  font-size: 18px;
  color: #686869;
  
  a {
    color: #d9534f;
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>