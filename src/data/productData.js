// src/data/productData.js

// 匯入所有商品圖片
import Pt1Image from '@/assets/images/pt1.jpg';
import Pt2Image from '@/assets/images/pt2.jpg';
import Pt3Image from '@/assets/images/pt3.jpg';
import Pt4Image from '@/assets/images/pt4.jpg';
import Pt5Image from '@/assets/images/pt5.jpg'; 
import Pt6Image from '@/assets/images/pt6.jpg'; 
import Pt7Image from '@/assets/images/pt7.jpg'; 
import Pt9Image from '@/assets/images/pt9.jpg'; 
import Pt10Image from '@/assets/images/pt10.jpg'; 
import Pt11Image from '@/assets/images/pt11.jpg'; 
import Pt12Image from '@/assets/images/pt12.jpg'; 
import Pt13Image from '@/assets/images/pt13.jpg'; 
import Pt14Image from '@/assets/images/pt14.jpg'; 

// 商品資料庫
export const products = {
  'pt1': {
    id: 101,
    name: 'Covernat帽T C刺繡',
    color: '黑色',
    price: 1680,
    image: Pt1Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['XL'], // 缺貨尺寸
    category: 'hoodie' // ✅ 新增分類
  },
  // ✅ 新增 pt7
  'pt7': {
    id: 107,
    name: 'Covernat帽T C刺繡',
    color: '深灰色',
    price: 1680,
    image: Pt7Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: [],
    category: 'hoodie'
  },
  'pt2': {
    id: 102,
    name: 'Covernat帽T 字母刺繡',
    color: '灰色',
    price: 1480,
    image: Pt2Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['XL'],
    category: 'hoodie' // ✅ 新增分類
  },
  'pt3': {
    id: 103,
    name: 'Covernat大學T LOGO ',
    color: '黑色',
    price: 1080,
    image: Pt3Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: [],
    category: 'hoodie' // ✅ 新增分類
  },
  'pt5': {
    id: 105,
    name: 'Wacky Willy 經典T恤',
    color: '白色',
    price: 680,
    image: Pt5Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: [],
    category: 'tshirt'
  },
  // ✅ 新增 pt6
  'pt6': {
    id: 106,
    name: 'Wacky Willy 經典T恤',
    color: '黑色',
    price: 680,
    image: Pt6Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['M'],
    category: 'tshirt'
  },
  // ✅ 新增 pt9
  'pt9': {
    id: 109,
    name: 'Covernat大學T 灰色',
    color: '深藍色',
    price: 980,
    image: Pt9Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['S'],
    category: 'hoodie'
  },
  // ✅ 新增 pt10
  'pt10': {
    id: 110,
    name: 'MLB短T  紐約洋基隊',
    color: '黑色',
    price: 1080,
    image: Pt10Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: [],
    category: 'tshirt'
   },
  // ✅ 新增 pt11
  'pt11': {
    id: 111,
    name: 'emis棒球帽 經典款',
    color: '棕色',
    price: 1180,
    image: Pt11Image,
    sizes: ['FREE'],
    unavailableSizes: [],
    category: 'hat'
  },
  // ✅ 新增 pt12
  'pt12': {
    id: 112,
    name: 'emis棒球帽',
    color: '酒紅色',
    price: 1180,
    image: Pt12Image,
    sizes: ['FREE'],
    unavailableSizes: [],
    category: 'hat'
  },
  // ✅ 新增 pt13
  'pt13': {
    id: 113,
    name: 'MLB可調式棒球帽 紐約洋基隊',
    color: '深灰色',
    price: 1280,
    image: Pt13Image,
    sizes: ['FREE'],
    unavailableSizes: [],
    category: 'hat'
  },
  'pt4': {
    id: 104,
    name: 'MLB硬頂棒球帽 紐約洋基隊',
    color: '深灰色',
    price: 1280,
    image: Pt4Image,
    sizes: ['FREE'], // 帽子只有均碼
    unavailableSizes: [],
    category: 'hat'
    }
};

// 根據 productId 獲取商品資料
export function getProductById(productId) {
  return products[productId] || null;
}

// ✅ 新增:根據分類獲取商品列表
export function getProductsByCategory(category) {
  return Object.entries(products)
    .filter(([key, product]) => product.category === category)
    .map(([key, product]) => ({
      ...product,
      slug: key // 加入 slug 方便路由使用
    }));
}

// ✅ 新增:獲取所有商品
export function getAllProducts() {
  return Object.entries(products)
    .map(([key, product]) => ({
      ...product,
      slug: key
    }))
    .sort((a, b) => a.id - b.id); // 按商品 ID 排序
}