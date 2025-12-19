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
          <a href="#" class="nav-item">新品上架</a>
          <a href="#" class="nav-item">衛衣</a>
          <a href="#" class="nav-item">T恤</a>
          <a href="#" class="nav-item">帽子</a>
          <a href="#" class="nav-item">其他配件</a>
        </div>

        <div class="auth-cart-links">
          <router-link to="/login" class="auth-link">登入</router-link>
          <router-link to="/cart" class="auth-link">購物車</router-link>
        </div>

      </div>
    </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>

$content-width: 1300px;

.top-header {
  background-color: #a29680;
  color: #fff;
  text-align: center;
  padding: 18px 0;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 2px;
}

.navbar {
  background-color: #fafafa;
  padding: 30px 0;
}

.nav-container {
  max-width: $content-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
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

.auth-link {
  font-size: 18px;
  font-weight: bold;
  color: #655345;
  text-decoration: none;
  white-space: nowrap;
}

.nav-item {
  color: #686869;
  text-decoration: none;
  padding: 0 30px;
  font-size: 20px;
  transition: color 0.3s;
}
</style>