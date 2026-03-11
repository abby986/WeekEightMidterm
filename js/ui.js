// js/ui.js
// Shared UI helpers used across multiple pages.

// ── Avatar ─────────────────────────────────────────────────────────────────

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function getAvatarColor(name) {
  const colors = ['#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f39c12', '#1abc9c'];
  return colors[name.charCodeAt(0) % colors.length];
}

// Builds and returns a circular initials avatar element.
export function renderAvatar(displayName, size = 40) {
  displayName = displayName || '?';
  const div = document.createElement('div');
  div.style.cssText = `
    width:${size}px; height:${size}px; border-radius:50%;
    background:${getAvatarColor(displayName)};
    display:flex; align-items:center; justify-content:center;
    color:#fff; font-weight:bold; font-size:${Math.round(size * 0.4)}px;
    flex-shrink:0;
  `;
  div.textContent = getInitials(displayName);
  return div;
}

// Populates the #nav-avatar element with a small initials avatar.
export function initNavAvatar(displayName) {
  const container = document.getElementById('nav-avatar');
  if (!container) return;
  container.appendChild(renderAvatar(displayName || '?', 36));
}

// Shows a brief toast notification at the bottom of the screen.
// type: 'success' (green) | 'error' (red)
export function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    padding: 10px 20px; border-radius: 8px; font-size: 0.875rem; font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4); z-index: 9999;
    transition: opacity 0.3s ease;
    background: ${type === 'success' ? '#3a8d34' : '#dc2626'}; color: white;
    white-space: nowrap;
  `;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// ── Game Cards ─────────────────────────────────────────────────────────────

// Builds and returns a game card <a> element.
// The entire card is a link so clicking anywhere navigates to the detail page.
export function renderGameCard(game) {
  const a = document.createElement('a');
  a.href = `game-detail.html?id=${game.id}`;
  a.className = 'group block bg-cp-surface border border-cp-border rounded-xl overflow-hidden hover:border-cp-green transition-colors cursor-pointer';

  a.innerHTML = `
    <div class="h-28 bg-cp-bg overflow-hidden">
      <img
        src="${game.coverImage}"
        alt="${game.title}"
        class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
        onerror="this.style.display='none'"
      />
    </div>
    <div class="p-3">
      <p class="font-semibold text-sm leading-tight mb-1 line-clamp-2">${game.title}</p>
      <p class="text-xs text-cp-green">${game.genre}</p>
      <p class="text-xs text-gray-500 mt-0.5 truncate">${game.platform}</p>
    </div>
  `;

  return a;
}
