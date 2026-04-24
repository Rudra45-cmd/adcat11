// Demo Authentication System
const demoUsers = [
  { email: "demo@adcat.com", name: "Demo User", plan: "Pro", credits: 2450 },
  { email: "basic@adcat.com", name: "Basic User", plan: "Starter", credits: 500 },
  { email: "admin@adcat.com", name: "Admin User", plan: "Enterprise", credits: 9999 }
];

function handleLogin(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorEl = document.querySelector('.field-meta');

  if (!email || !password) {
    errorEl.textContent = 'Please enter email and password';
    errorEl.className = 'field-meta text-center text-sm min-h-5 text-red-600 animate-pulse';
    return;
  }

  const demoUser = demoUsers.find(user => user.email === email);
  if (demoUser) {
    localStorage.setItem("user", JSON.stringify(demoUser));
    localStorage.setItem("token", "demo-token-" + Date.now());
    
    // Success feedback
    errorEl.textContent = 'Login successful! Redirecting...';
    errorEl.className = 'field-meta text-center text-sm min-h-5 text-green-600';
    
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  } else {
    errorEl.textContent = 'Invalid credentials. Try demo@adcat.com (password: anything)';
    errorEl.className = 'field-meta text-center text-sm min-h-5 text-red-600 animate-pulse';
  }
}

function fillDemo() {
  document.getElementById("email").value = "demo@adcat.com";
  document.getElementById("password").value = "anything";
  document.getElementById("email").focus();
}

function handleLogout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '../login.html';
}

function checkAuth() {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  
  if (!user || !token) {
    window.location.href = '../login.html';
    return null;
  }
  return JSON.parse(user);
}

// Auto-redirect logged-in users from login
if (window.location.pathname.includes('login.html') && checkAuth()) {
  window.location.href = 'dashboard.html';
}

