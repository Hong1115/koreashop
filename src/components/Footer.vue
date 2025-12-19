<template>
<footer class="main-footer">
    <div class="footer-divider"></div>
    <div class="footer-container">
      
      <div class="footer-column policy-links">
        <a href="#" class="footer-title">- 購買須知 -</a>
        <a href="#" class="footer-item">退換貨政策</a>
      </div>

      <div class="footer-column contact-info">
        <a href="#" class="footer-title">- 聯絡我們 -</a>
        <div class="contact-item">Instagram / kcore_1115</div>
        <div class="contact-item">客服Line / @kcore1115</div>
        <div class="contact-item">電郵 / kcore1115@gmail.com</div>
      </div>

      <div class="footer-column company-info">
        <div class="company-name">潮流韓貨代購有限公司</div>
        <div class="company-tax">統編: 26319746</div>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>

$content-width: 1300px;

.main-footer {
  background-color: #fafafa;
  padding-top: 50px;
  padding-bottom: 30px;
}

.footer-divider {
  max-width: $content-width;
  margin: 0 auto 50px auto;
  height: 2px;
  background-color: #a6aa87;
}

.footer-container {
  max-width: $content-width;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  padding: 0 30px;
  line-height: 2;
  text-align: center;
}

.footer-column {
  flex-basis: 33.33%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer-title {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  text-decoration: none;
  margin-bottom: 1px;
}

.footer-item, .contact-item, .company-name, .company-tax {
  font-size: 16px;
  color: #333;
  text-decoration: none;
}

.footer-item:hover {
  color: #b70000;
}
</style>
