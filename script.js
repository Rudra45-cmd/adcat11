function initIntroLoader() {
  const loader = document.getElementById('intro-loader');
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add('active');
  }, 300);

  setTimeout(() => {
    loader.style.transition = 'opacity 0.6s ease';
    loader.style.opacity = '0';
  }, 2000);

  setTimeout(() => {
    loader.style.display = 'none';
  }, 2600);
}

function showLoader() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'flex';
}

function hideLoader() {
  const overlay = document.getElementById('loading-overlay');
  if (overlay) overlay.style.display = 'none';
}

function withLoader(action) {
  showLoader();
  return Promise.resolve()
    .then(action)
    .finally(hideLoader);
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.hero-actions a, .btn-premium, .btn-primary, a[href*="dashboard"], a[href*="generating"], a[href*="create-ad"]').forEach((el) => {
    el.addEventListener('click', () => showLoader());
  });

  const nativeFetch = window.fetch;
  window.fetch = (...args) => {
    showLoader();
    return nativeFetch(...args).finally(() => hideLoader());
  };

  setTimeout(hideLoader, 300);
});

window.showLoader = showLoader;
window.hideLoader = hideLoader;
window.withLoader = withLoader;
window.addEventListener('load', initIntroLoader);
