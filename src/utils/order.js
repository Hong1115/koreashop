// src/utils/order.js
import { getCurrentUser } from './auth';

// 獲取訂單 key
function getOrderKey() {
  const user = getCurrentUser();
  if (user) {
    return `orders_${user.id}`;
  }
  return null;
}

// 獲取所有訂單
export function getOrders() {
  const key = getOrderKey();
  if (!key) return [];
  
  const ordersData = localStorage.getItem(key);
  return ordersData ? JSON.parse(ordersData) : [];
}

// 儲存訂單
export function saveOrders(orders) {
  const key = getOrderKey();
  if (key) {
    localStorage.setItem(key, JSON.stringify(orders));
  }
}

// 創建新訂單
export function createOrder(orderData) {
  const orders = getOrders();
  
  const newOrder = {
    id: Date.now(), // 使用時間戳作為訂單 ID
    orderNumber: `ORD${Date.now()}`, // 訂單編號
    customer: orderData.customer,
    items: orderData.items,
    payment: orderData.payment,
    shipping: orderData.shipping,
    status: 'pending', // pending(待處理), processing(處理中), completed(已完成), cancelled(已取消)
    createdAt: new Date().toISOString()
  };
  
  orders.unshift(newOrder); // 新訂單放在最前面
  saveOrders(orders);
  
  return newOrder;
}

// 根據訂單 ID 獲取訂單
export function getOrderById(orderId) {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
}

// 獲取訂單狀態的中文名稱
export function getOrderStatusText(status) {
  const statusMap = {
    'pending': '待處理',
    'processing': '處理中',
    'completed': '已完成',
    'cancelled': '已取消'
  };
  return statusMap[status] || '未知狀態';
}

// 獲取付款方式的中文名稱
export function getPaymentMethodText(method) {
  const methodMap = {
    'credit_card': '信用卡付款',
    'atm': 'ATM 轉帳',
    'cod': '貨到付款'
  };
  return methodMap[method] || '未知付款方式';
}

// 獲取配送方式的中文名稱
export function getShippingMethodText(method) {
  const methodMap = {
    'home_delivery': '宅配到府',
    'convenience_store': '超商取貨'
  };
  return methodMap[method] || '未知配送方式';
}