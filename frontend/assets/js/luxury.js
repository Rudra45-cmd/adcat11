// Luxury small helpers: word highlight, reduced-motion tweaks
// Runs on DOMContentLoaded and plays nicely with existing microinteractions.js

document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Words/phrases to highlight (case-insensitive, word boundaries)
  const phrases = [
    'AI',
    'Automatically',
    'No editing',
    'Seconds',
    'seconds'
  ];

  const selectors = ['.features-section', '#features-premium', '.adcat-features'];
  const targetEls = Array.from(new Set([].concat(...selectors.map(s=>Array.from(document.querySelectorAll(s))))));
  if (targetEls.length === 0) return;

  const escapeReg = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = '\\b(' + Array.from(new Set(phrases.map(p => p.trim()))).map(escapeReg).join('|') + ')\\b';
  const re = new RegExp(pattern, 'gi');

  // Walk text nodes and replace matches safely
  function walkAndReplace(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(textNode => {
      if (!textNode.nodeValue || !re.test(textNode.nodeValue)) return;
      const fragHtml = textNode.nodeValue.replace(re, (m) => `<span class="gold-highlight">${m}</span>`);
      try {
        const frag = document.createRange().createContextualFragment(fragHtml);
        textNode.parentNode.replaceChild(frag, textNode);
      } catch (e) {
        // If replacement fails for any reason, skip to avoid breaking markup
      }
    });
  }

  targetEls.forEach(el => walkAndReplace(el));

  // Accessibility: ensure highlighted elements are non-disruptive
  document.querySelectorAll('.gold-highlight').forEach(s => {
    s.setAttribute('aria-hidden', 'false');
    s.setAttribute('role', 'text');
  });

  // Reduced-motion: pause CTA pulse
  if (reduceMotion) {
    document.querySelectorAll('.btn-luxury-gold').forEach(btn => btn.style.animation = 'none');
  }

});
