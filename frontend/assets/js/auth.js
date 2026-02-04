/**
 * Authentication Module
 * Handles login, signup, logout
 */

async function handleLogin(event) {
  event.preventDefault();
  const form = event.target;
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';
  const meta = form.querySelector('.field-meta');

  try {
    if (meta) { meta.textContent = ''; meta.style.color = ''; }

    const response = await API.login(email, password);

    // Store token and user info if API helpers exist
    if (API && typeof API.setToken === 'function') API.setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    // Prefer SPA dashboard if available, otherwise redirect to home
    if (typeof showDashboard === 'function') {
      try {
        showDashboard();
        if (typeof loadDashboardData === 'function') await loadDashboardData();
        return;
      } catch (e) {
        // fallback to redirect
      }
    }

    window.location.href = './index.html';
  } catch (error) {
    const msg = (error && (error.message || error.error)) || 'Login failed. Please try again.';
    if (meta) { meta.textContent = msg; meta.style.color = 'rgba(239,68,68,0.95)'; }
    console.error('Login error:', error);
  }
}

async function handleSignup(event) {
  event.preventDefault();
  const form = event.target;
  const nameInput = form.querySelector('input[type="text"][name="name"]') || form.querySelector('#name');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const name = nameInput ? nameInput.value.trim() : '';
  const email = emailInput ? emailInput.value.trim() : '';
  const password = passwordInput ? passwordInput.value : '';
  const meta = form.querySelector('.field-meta');

  // Validation
  if (name.length < 2) {
    if (meta) { meta.textContent = 'Name must be at least 2 characters'; meta.style.color = 'rgba(239,68,68,0.95)'; }
    if (nameInput) nameInput.focus();
    return false;
  }

  if (password.length < 8) {
    if (meta) { meta.textContent = 'Password must be at least 8 characters'; meta.style.color = 'rgba(239,68,68,0.95)'; }
    if (passwordInput) passwordInput.focus();
    return false;
  }

  try {
    if (meta) { meta.textContent = ''; meta.style.color = ''; }

    const response = await API.signup(email, password, name);

    // Store token and user info if helpers exist
    if (API && typeof API.setToken === 'function') API.setToken(response.token);
    localStorage.setItem('user', JSON.stringify(response.user));

    if (typeof showDashboard === 'function') {
      try {
        showDashboard();
        if (typeof loadDashboardData === 'function') await loadDashboardData();
        return;
      } catch (e) {
        // fallback
      }
    }

    window.location.href = './index.html';
  } catch (error) {
    if (meta) {
      if (error && error.status === 409) meta.textContent = 'Email already registered. Please login instead.';
      else meta.textContent = error.message || 'Signup failed. Please try again.';
      meta.style.color = 'rgba(239,68,68,0.95)';
    }
    console.error('Signup error:', error);
  }

  return false;
}

async function handleLogout() {
  if (!confirm('Are you sure you want to logout?')) {
    return;
  }

  try {
    await API.logout();
    API.clearToken();
    localStorage.removeItem('user');
    showAuthPage();
  } catch (error) {
    console.error('Logout error:', error);
    // Still logout on client side
    API.clearToken();
    localStorage.removeItem('user');
    showAuthPage();
  }
}

function toggleForm(event) {
  event.preventDefault();
  document.getElementById('login-form').classList.toggle('hidden');
  document.getElementById('signup-form').classList.toggle('hidden');
}

function showAuthPage() {
  // Hide home and dashboard, show auth
  const home = document.getElementById('home-page');
  if (home) home.classList.add('hidden');
  document.getElementById('auth-page').classList.remove('hidden');
  document.getElementById('dashboard-page').classList.add('hidden');
  document.getElementById('login-form').classList.remove('hidden');
  document.getElementById('signup-form').classList.add('hidden');
}

function showDashboard() {
  document.getElementById('auth-page').classList.add('hidden');
  const home = document.getElementById('home-page');
  if (home) home.classList.add('hidden');
  document.getElementById('dashboard-page').classList.remove('hidden');
  showTab('dashboard');
}

function showHomePage() {
  // Hide auth and dashboard, show home
  const auth = document.getElementById('auth-page');
  if (auth) auth.classList.add('hidden');
  const dashboard = document.getElementById('dashboard-page');
  if (dashboard) dashboard.classList.add('hidden');
  const home = document.getElementById('home-page');
  if (home) home.classList.remove('hidden');
}

function isAuthenticated() {
  try { return !!(API && API.getToken && API.getToken()); } catch (e) { return false; }
}

// Attach forms to handlers (if present on page)
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const signupForm = document.getElementById('signup-form');
  if (signupForm) signupForm.addEventListener('submit', handleSignup);
});
