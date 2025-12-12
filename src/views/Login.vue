<template>
  <div id="app">
    <header class="top-header">
      <div class="header-text">WHOLESALE GOODS FROM SEOUL</div>
    </header>
  </div>

  <nav class="navbar">
    <div class="nav-container">
       <!-- 🌟 關鍵修改：使用 router-link 包裹 Logo，點擊後回到首頁 (/) 🌟 -->
        <router-link to="/" class="logo-link">
          <div class="logo">K•<span>CORE</span></div>
        </router-link>
      <!-- 這裡應有導航連結，但目前只有 logo 和 auth-page 內容 -->
    </div>
  </nav>    

  <div class="auth-page">
    <div class="auth-box">
      <h2 class="auth-title">{{ isLogin ? '會員登入' : '會員註冊' }}</h2>
      
      <form @submit.prevent="handleSubmit">
        <div class="auth-fields">
          
          <div v-if="isLogin">
            <div class="input-group">
              <label for="login-account">帳號</label>
              <input type="text" id="login-account" v-model="account" required placeholder="請輸入帳號">
            </div>
            <div class="input-group">
              <label for="login-password">密碼</label>
              <input type="password" id="login-password" v-model="password" required placeholder="請輸入密碼">
            </div>
          </div>
          
          <div v-else>
            <!-- 註冊模式：包含所有欄位 -->
            <div class="input-group">
              <label for="register-account">帳號</label>
              <input type="text" id="register-account" v-model="account" required placeholder="請設定帳號">
            </div>
            
            <div class="input-group">
              <label for="last-name">姓名</label>
              <input type="text" id="last-name" v-model="lastName" required placeholder="請輸入您的姓名">
            </div>
            
            <!-- 確保 type="tel" 和 type="email" 的欄位大小一致 -->
            <div class="input-group">
              <label for="phone">手機</label>
              <input type="tel" id="phone" v-model="phoneNumber" required placeholder="請輸入手機號碼">
            </div>
            <div class="input-group">
              <label for="email">電子郵件</label>
              <input type="email" id="email" v-model="email" required placeholder="請輸入電子郵件">
            </div>
            
            <div class="input-group">
              <label for="register-password">密碼</label>
              <input type="password" id="register-password" v-model="password" required placeholder="請設定密碼">
            </div>
            
            <div class="input-group">
              <label for="confirm-password">確認密碼</label>
              <input type="password" id="confirm-password" v-model="confirmPassword" required placeholder="請再次輸入密碼">
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
export default {
  name: 'Login',
  data() {
    return {
      account: '',
      password: '',
      confirmPassword: '',
      lastName: '',     // 姓
      phoneNumber: '',  // 手機號碼
      email: ''         // 電子郵件
    };
  },
  computed: {
    // 判斷當前頁面是登入還是註冊
    isLogin() {
      return this.$route.path === '/login';
    }
  },
  methods: {
    handleSubmit() {
      if (this.isLogin) {
        console.log('嘗試登入:', this.account, this.password);
        alert('登入功能待實作！');
        // this.$router.push('/');
      } else {
        if (this.password !== this.confirmPassword) {
          alert('兩次密碼輸入不一致！');
          return;
        }

        console.log('嘗試註冊:');
        console.log('帳號:', this.account);
        console.log('姓名:', this.lastName);
        console.log('手機:', this.phoneNumber);
        console.log('Email:', this.email);
        console.log('密碼:', this.password);

        alert('註冊功能待實作！');
        // this.$router.push('/login');
      }
    }
  }
}
</script>

<style scoped lang="scss">
// =======================================================
// 1. 頁面容器樣式
// =======================================================
.auth-page {
  // 使用 flexbox 將內容垂直和水平居中
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  // 這裡使用您提供的 min-height
  min-height: calc(100vh - 100px); 
  background-color: #fafafa; // 保持與您 App.vue 相同的淺灰色背景
  padding-top: -20px;
}

// =======================================================
// 2. 登入/註冊卡片樣式
// =======================================================
.auth-box {
  width: 100%;
  max-width: 550px; // 設定最大寬度，避免在寬螢幕上過大
  background-color: #fff; // 白色卡片背景
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); // 柔和的陰影
  text-align: center;
}

.auth-title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  margin-bottom: 30px;
  border-bottom: 3px solid #a29680; // 底部與 Header 頂部相呼應的淺棕色線
  padding-bottom: 15px;
}

// =======================================================
// 3. 輸入欄位樣式
// 修正：將 type="tel" 和 type="email" 加入選擇器，確保樣式一致
// =======================================================
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

input[type="text"],
input[type="password"],
input[type="tel"], // 🌟 新增：確保手機號碼欄位樣式一致
input[type="email"] { // 🌟 新增：確保電子郵件欄位樣式一致
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 18px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #d9534f; // 聚焦時使用您的主題紅色
    outline: none;
    box-shadow: 0 0 5px rgba(#d9534f, 0.2);
  }
}

// =======================================================
// 4. 按鈕樣式 (登入/註冊)
// =======================================================
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

.login-button {
  background-color: #655345; // 您的主題棕色
  color: #fff;
  
  &:hover {
    background-color: darken(#655345, 8%); // 修正：確保 hover 時變暗的是主題棕色
  }
}

.register-button {
  background-color: #655345; // 您的 Header 頂部棕色
  color: #fff;
  
  &:hover {
    background-color: darken(#a29680, 8%);
  }
}

// =======================================================
// 5. 登入/註冊切換連結
// =======================================================
.switch-link {
  margin-top: 25px;
  font-size: 18px;
  color: #686869;
  
  a {
    color: #d9534f; // 連結使用您的主題紅色
    text-decoration: none;
    font-weight: bold;
    margin-left: 5px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

// =======================================================
// 6. 頂部黑條樣式 (保留使用者提供的)
// =======================================================
.top-header {
  background-color: #a29680;
  color: #fff;
  text-align: center;
  padding: 18px 0;  
  font-size: 18px;
  font-weight: 500;  
  letter-spacing: 2px;
}

// =======================================================
// 7. 導航欄樣式 (保留使用者提供的)
// =======================================================
.navbar {
  background-color: #fafafa;
  padding: 30px 0;  
}

.nav-container {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;  
  align-items: center;
  padding: 0 30px;
}

.logo-link {
  // 🌟 關鍵修正：將文字裝飾設為 none，移除底線
  text-decoration: none; 
  cursor: pointer; 
}

.logo {
  font-size: 45px;
  font-weight: 700; 
  // 確保 logo 文本沒有底線 (雙重保險)
  text-decoration: none; 
  color: #000;
  letter-spacing: 1px;

  span {
    color: #655345;  
  }
}
</style>