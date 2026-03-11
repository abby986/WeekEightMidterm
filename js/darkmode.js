// js/darkmode.js
// Wires the dark-mode-toggle button on each page.
// The initial class application happens via a blocking inline <script> in each
// page's <head> so there's no flash of the wrong theme before JS loads.

export function initDarkMode() {
  const btn = document.getElementById('dark-mode-toggle');
  if (!btn) return;

  // Sync icon with the class already applied by the head script
  updateIcon(btn);

  btn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('cp-theme', isDark ? 'dark' : 'light');
    updateIcon(btn);
  });
}

function updateIcon(btn) {
  btn.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
}
