import { reactive } from 'vue';

// 使用 reactive 建立響應式狀態
export const cartStore = reactive({
  items: [],
  
  // 加入購物車方法
  addToCart(product) {
    // 檢查購物車是否已有相同商品且相同尺寸
    const existingItem = this.items.find(
      item => item.id === product.id && item.size === product.size
    );

    if (existingItem) {
      existingItem.quantity += product.quantity;
    } else {
      this.items.push({
        ...product,
        timestamp: new Date().getTime() // 用於排序或唯一標識
      });
    }
  },

  // 移除商品方法
  removeItem(timestamp) {
    this.items = this.items.filter(item => item.timestamp !== timestamp);
  },

  // 計算總金額
  get totalAmount() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
});