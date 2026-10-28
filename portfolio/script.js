// Scroll-down arrow on the hero takes you to the About section
document.addEventListener('DOMContentLoaded', () => {
  // Endless typing animation for the hero quote, zooming in slightly while typing
  const typed = document.getElementById('typed');
  if (typed) {
    const lines = ['creating,', 'experimenting,', 'learning.'];
    const full = lines.join('\n');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const caret = document.createElement('span');
    caret.className = 'caret';
    const text = document.createTextNode('');
    typed.append(text, caret);
    typed.style.whiteSpace = 'pre-line';

    if (reduce) {
      text.nodeValue = full;
    } else {
      let n = 0, dir = 1;
      const tick = () => {
        n += dir;
        text.nodeValue = full.slice(0, n);
        typed.style.transform = `scale(${1 + 0.06 * (n / full.length)})`;
        let delay = dir === 1 ? 75 : 30;
        if (n === full.length) { dir = -1; delay = 1800; }
        else if (n === 0) { dir = 1; delay = 500; }
        setTimeout(tick, delay);
      };
      setTimeout(tick, 400);
    }
  }

  // Fade in elements as they scroll into view
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObserver.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach((el) => fadeObserver.observe(el));

  const scrollBtn = document.getElementById('scrollDown');
  const about = document.getElementById('about');

  if (scrollBtn && about) {
    scrollBtn.addEventListener('click', () => {
      about.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Highlight the active nav link based on which section is in view
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const setActive = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((s) => observer.observe(s));
});
