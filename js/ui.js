// js/ui.js
// Shared UI helpers used across multiple pages.

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
