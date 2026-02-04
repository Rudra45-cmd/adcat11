// Auth UI helpers (validation + microinteractions)
// Lightweight, independent from API auth logic (safe for static pages)

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function showError(input, msg) {
    input.setAttribute('aria-invalid', 'true');
    const meta = input.parentElement.querySelector('.field-meta');
    if (meta) {
      meta.textContent = msg;
      meta.style.color = 'rgba(239,68,68,0.95)';
    }
  }
  function clearError(input) {
    input.removeAttribute('aria-invalid');
    const meta = input.parentElement.querySelector('.field-meta');
    if (meta) { meta.textContent = ''; meta.style.color = ''; }
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function bindForm(form) {
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const inputs = Array.from(form.querySelectorAll('input[required]'));
      let ok = true;
      inputs.forEach(i => clearError(i));

      inputs.forEach(i => {
        const v = i.value && i.value.trim();
        if (!v) { ok = false; showError(i, 'This field is required'); }
        else if (i.type === 'email' && !emailRe.test(v)) { ok = false; showError(i, 'Please enter a valid email'); }
        else if (i.minLength && v.length < parseInt(i.minLength, 10)) { ok = false; showError(i, `Minimum ${i.minLength} characters`); }
      });

      if (!ok) {
        const first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }

      // UI success feedback — simulate processing
      const submit = form.querySelector('button[type="submit"]');
      if (submit) {
        submit.disabled = true;
        const orig = submit.textContent;
        submit.textContent = 'Processing...';
        setTimeout(() => { submit.textContent = 'Success'; submit.classList.add('btn-success'); }, 700);
        setTimeout(() => { submit.textContent = orig; submit.disabled = false; submit.classList.remove('btn-success'); }, 1400);
      }
    });

    form.querySelectorAll('input').forEach(i => {
      i.addEventListener('input', () => clearError(i));
      i.addEventListener('focus', () => { i.style.boxShadow = '0 8px 36px rgba(212,175,55,0.12)'; });
      i.addEventListener('blur', () => { i.style.boxShadow = ''; });
    });
  }

  bindForm(document.getElementById('login-form'));
  bindForm(document.getElementById('signup-form'));

  if (reduceMotion) {
    document.querySelectorAll('.btn-luxury-gold').forEach(b => b.style.animation = 'none');
  }
});