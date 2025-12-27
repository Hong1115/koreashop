// src/utils/auth.js

// 獲取所有註冊會員
export function getUsers() {
  const usersData = localStorage.getItem('registeredUsers');
  return usersData ? JSON.parse(usersData) : [];
}

// 儲存會員資料
export function saveUsers(users) {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
}

// 註冊新會員
export function registerUser(userData) {
  const users = getUsers();
  
  // 檢查 Email 是否已被註冊
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    return { success: false, message: '此 Email 已被註冊!' };
  }
  
  // 新增會員
  const newUser = {
    id: Date.now(),
    email: userData.email,
    name: userData.name,
    phone: userData.phone,
    password: userData.password,
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  saveUsers(users);
  
  return { success: true, message: '註冊成功!', user: newUser };
}

// 登入驗證
export function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    // 登入成功,儲存當前登入會員資訊
    const loginData = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      loginTime: new Date().toISOString()
    };
    localStorage.setItem('currentUser', JSON.stringify(loginData));
    return { success: true, message: '登入成功!', user: loginData };
  }
  
  return { success: false, message: 'Email 或密碼錯誤!' };
}

// 獲取當前登入會員
export function getCurrentUser() {
  const userData = localStorage.getItem('currentUser');
  return userData ? JSON.parse(userData) : null;
}

// 登出
export function logoutUser() {
  localStorage.removeItem('currentUser');
}

// 檢查是否已登入
export function isLoggedIn() {
  return getCurrentUser() !== null;
}