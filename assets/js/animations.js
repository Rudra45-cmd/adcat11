// Premium SaaS Animations - Vanilla JS, Lightweight
// Stripe/Razorpay-inspired: Subtle, smooth, performant

// 1. Hero Parallax (subtle Y movement)
function initHeroParallax() {
  const heroVideo = document.querySelector('.hero-video-parallax');
  if (!heroVideo) return;

  let lastScrollY = 0;
  window.addEventListener('scroll', () => {
    const rect = heroVideo.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const speed = 0.3; // Subtle
      const yPos = -(window.scrollY * speed);
      heroVideo.style.transform = `translateY(${yPos}px)`;
    }
  });
}

// 2. Typing Headline Effect (clean, single line)
function initTypingEffect() {
  const headline = document.querySelector('.typing-headline');
  if (!headline) return;

  const text = headline.dataset.text || 'High-Converting Ads with AI';
  let i = 0;
  headline.textContent = '';

  function type() {
    if (i < text.length) {
      headline.textContent += text.charAt(i);
      i++;
      setTimeout(type, 100); // Slow, deliberate
    }
  }
  setTimeout(type, 500);
}

// 3. Enhanced Stagger Reveal (Features/HowItWorks)
function initStaggerReveal() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('animate-fadeInUp');
        }, index * 150); // Stagger 150ms
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.stagger-item').forEach(el => observer.observe(el));
}

// 4. Timeline Line Draw (How It Works - subtle)
function initTimeline() {
  const lines = document.querySelectorAll('.timeline-line');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.strokeDashoffset = '0';
        observer.unobserve(entry.target);
      }
    });
  });
  lines.forEach(line => observer.observe(line));
}

// 5. Smooth Pricing Toggle Enhancement
function initPricingToggle() {
  const toggle = document.getElementById('billing-toggle');
  if (!toggle) return;

  const monthlyPrices = { starter: '₹499', growth: '₹1,499', pro: '₹4,999' };
  const annualPrices = { starter: '₹399', growth: '₹1,199', pro: '₹3,999' }; // 20% off

  toggle.addEventListener('change', (e) => {
    const isAnnual = e.target.checked;
    document.querySelectorAll('.price-amount').forEach((el, i) => {
      const plans = ['starter', 'growth', 'pro'];
      el.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      el.textContent = (isAnnual ? annualPrices : monthlyPrices)[plans[i]];
    });
  });
}

// Reduced Motion Support
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Only run if user prefers motion
}

// Init on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initHeroParallax();
  initTypingEffect();
  initStaggerReveal();
  initTimeline();
  initPricingToggle();
});

// Export for index.html
window.AdCatAnimations = {
  initHeroParallax,
  initTypingEffect,
  initStaggerReveal,
  initTimeline,
  initPricingToggle
};
