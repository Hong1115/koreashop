<template>
    <header class="top-header">
      <div class="header-text">WHOLESALE GOODS FROM SEOUL</div>
    </header>

    <nav class="navbar">
      <div class="nav-container">
         <!-- 🌟 關鍵修改：使用 router-link 包裹 Logo，點擊後回到首頁 (/) 🌟 -->
        <router-link to="/" class="logo-link">
          <div class="logo">K•<span>CORE</span></div>
        </router-link>
        <!-- 這裡應有導航連結，但目前只有 logo 和 auth-page 內容 -->

        <div class="nav-links">
           <!-- ✅ 將「全部商品」改為 router-link -->
          <router-link to="/products/all" class="nav-item">全部商品</router-link>
          <!-- ✅ 將「衛衣」改為 router-link -->
          <router-link to="/category/hoodie" class="nav-item">長袖</router-link>
          <!-- ✅ 將「T恤」改為 router-link -->
          <router-link to="/category/tshirt" class="nav-item">T恤</router-link>
          <!-- ✅ 將「帽子」改為 router-link -->
          <router-link to="/category/hat" class="nav-item">帽子</router-link>
          <!-- ✅ 將「其他配件」改為 router-link -->
          <router-link to="/category/other" class="nav-item">其他配件</router-link>
        </div>

        <div class="auth-cart-links">
          <!-- 根據登入狀態顯示不同內容 -->
          <template v-if="currentUser">
            <!-- ✅ 修改:讓會員名稱可以點擊,導向訂單頁面 -->
            <router-link to="/orders" class="user-welcome">Hi, {{ currentUser.name }}</router-link>
            <button @click="handleLogout" class="logout-link">登出</button>
          </template>
          <template v-else>
            <router-link to="/login" class="auth-link">登入</router-link>
          </template>
          <router-link to="/cart" class="auth-link">購物車</router-link>
        </div>

      </div>

      <!-- ✅ 新增:分界線 -->
      <div class="navbar-divider"></div>

    </nav>
</template>

<script>
import { getCurrentUser, logoutUser } from '@/utils/auth';

export default {
  name: 'Header',
  data() {
    return {
      currentUser: null
    };
  },
  methods: {
    loadUser() {
      this.currentUser = getCurrentUser();
    },
    handleLogout() {
      if (confirm('確定要登出嗎?')) {
        logoutUser();
        this.currentUser = null;
        alert('已登出');
        this.$router.push('/');
      }
    }
  },
  mounted() {
    this.loadUser();
  },
  watch: {
    '$route'() {
      this.loadUser();
    }
  }
}
</script>

<style lang="scss" scoped>

$content-width: 1300px;

.top-header {
  background-color: #b2a79b;
  color: #fff;
  text-align: center;
  padding: 18px 0;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
}

.navbar {
  background-color: #fafafa;
  padding: 30px 0 0 0; // ✅ 修改:移除底部 padding,讓分界線緊貼導航欄
  position: relative; // ✅ 新增:讓分界線定位正確
}

.nav-container {
  max-width: $content-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px 30px 30px; // ✅ 修改:把 padding 移到這裡
}

.logo-link {
  text-decoration: none;
  cursor: pointer;
}

.logo {
  font-size: 45px;
  font-weight: 700;
  text-decoration: none;
  color: #000;
  letter-spacing: 1px;
  span { color: #655345; }
}

.nav-links {
  display: flex;
  flex-grow: 1;
  justify-content: center;
  padding-right: 80px;
}

.auth-cart-links {
  display: flex;
  gap: 18px;
  margin-left: auto;
}

// ✅ 修改:讓會員名稱樣式跟購物車一致
.user-welcome {
  font-size: 20px;
  font-weight: bold;
  color: #655345; // 跟 auth-link 相同顏色
  white-space: nowrap;
  text-decoration: none; // ✅ 移除底線

  &:hover {
    opacity: 0.7; // ✅ 懸停效果
  }
}

// ✅ 修改:讓登出連結樣式跟購物車一致
.logout-link {
  font-size: 20px;
  font-weight: bold;
  color: #655345; // 跟 auth-link 相同顏色
  background: none; // 移除按鈕背景
  border: none; // 移除按鈕邊框
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
  padding: 0; // 移除按鈕內距
  
  &:hover {
    opacity: 0.7; // 懸停效果
  }
}

.auth-link {
  font-size: 20px;
  font-weight: bold;
  color: #655345;
  text-decoration: none;
  white-space: nowrap;
}

.nav-item {
  color: #39393aff;
  text-decoration: none;
  padding: 0 30px;
  font-size: 22px;
  transition: color 0.3s;
}

// ✅ 新增:分界線樣式
.navbar-divider {
  width: 100%;
  height: 3px;
  background-color: #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 陰影效果
}

</style>