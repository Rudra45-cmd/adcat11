// Minimal interactions for smooth UI behavior.
document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.textContent = '⏸';
      playBtn.setAttribute('aria-label', 'Pause demo');
    });
  }

  const nav = document.querySelector('.nav');
  if (nav) {
    const syncNavState = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 8);
    };

    syncNavState();
    window.addEventListener('scroll', syncNavState, { passive: true });
  }
});
