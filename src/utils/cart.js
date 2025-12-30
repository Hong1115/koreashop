// src/utils/cart.js
import { isLoggedIn, getCurrentUser } from './auth';

// 獲取購物車 key
function getCartKey() {
  if (isLoggedIn()) {
    const user = getCurrentUser();
    return `shoppingCart_${user.id}`;
  }
  return 'shoppingCart_guest';
}

// 獲取購物車資料
export function getCart() {
  const cartData = localStorage.getItem('getCartKey');
  return cartData ? JSON.parse(cartData) : [];
}

// 儲存購物車資料
export function saveCart(cartItems) {
  localStorage.setItem('getCartKey', JSON.stringify(cartItems));
}

// 加入商品到購物車
export function addToCart(product) {
  const cart = getCart();
  
  // 檢查購物車中是否已有相同商品 (相同 id 和 size)
  const existingItem = cart.find(
    item => item.id === product.id && item.size === product.size
  );
  
  if (existingItem) {
    // 如果已存在,增加數量
    existingItem.quantity += product.quantity;
  } else {
    // 如果不存在,新增商品
    cart.push(product);
  }
  
  saveCart(cart);
}

// 更新商品數量
export function updateCartItemQuantity(itemId, size, newQuantity) {
  const cart = getCart();
  const item = cart.find(i => i.id === itemId && i.size === size);
  
  if (item) {
    item.quantity = newQuantity;
    saveCart(cart);
  }
}

// 移除購物車商品
export function removeFromCart(itemId, size) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === itemId && item.size === size));
  saveCart(cart);
}

// 清空購物車
export function clearCart() {
  localStorage.removeItem('getCartKey');
}