// Theme toggle — flips the data-theme attribute set pre-paint in index.html.
document.querySelector('.theme-toggle').addEventListener('click', () => {
  const root = document.documentElement;
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);
});

// Case-study carousel arrows (hidden on touch widths, where swipe takes over).
const cases = document.querySelector('.cases');
const cardStep = () =>
  cases.querySelector('.case').getBoundingClientRect().width + 20;
document.querySelector('.cases-prev').addEventListener('click', () => {
  cases.scrollBy({ left: -cardStep(), behavior: 'smooth' });
});
document.querySelector('.cases-next').addEventListener('click', () => {
  cases.scrollBy({ left: cardStep(), behavior: 'smooth' });
});
