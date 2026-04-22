// Minimal interactions for smooth UI behavior.
document.addEventListener('DOMContentLoaded', () => {
  const playBtn = document.querySelector('.play-btn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      playBtn.textContent = '⏸';
      playBtn.setAttribute('aria-label', 'Pause demo');
    });
  }
});
