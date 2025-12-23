// src/data/productData.js

// 匯入所有商品圖片
import Pt1Image from '@/assets/images/pt1.jpg';
import Pt2Image from '@/assets/images/pt2.jpg';
import Pt3Image from '@/assets/images/pt3.jpg';
import Pt4Image from '@/assets/images/pt4.jpg';

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
    description: '經典 C 字刺繡,百搭黑色款式'
  },
  'pt2': {
    id: 102,
    name: 'Covernat帽T 字母刺繡',
    color: '灰色',
    price: 1480,
    image: Pt2Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: ['XL'],
    description: '時尚字母設計,舒適灰色調'
  },
  'pt3': {
    id: 103,
    name: 'Covernat衛衣 品牌LOGO',
    color: '黑色',
    price: 1080,
    image: Pt3Image,
    sizes: ['S', 'M', 'L', 'XL'],
    unavailableSizes: [],
    description: '簡約品牌 LOGO,保暖舒適'
  },
  'pt4': {
    id: 104,
    name: 'MLB棒球帽 紐約洋基隊',
    color: '深灰色',
    price: 1280,
    image: Pt4Image,
    sizes: ['FREE'], // 帽子只有均碼
    unavailableSizes: [],
    description: '經典洋基隊標誌,一款多搭'
  }
};

// 根據 productId 獲取商品資料
export function getProductById(productId) {
  return products[productId] || null;
}