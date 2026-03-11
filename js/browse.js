// js/browse.js
// Client-side search, filter, and sort logic for the browse page.
// All filtering runs against the in-memory games array — no extra Firestore calls.

// Filters and sorts a games array based on the provided options.
// All parameters are optional and default to "show everything, sort A-Z".
export function filterAndSort(games, { query = '', genre = '', platform = '', sort = 'az' } = {}) {
  const q = query.toLowerCase();

  const result = games.filter(game => {
    const matchesQuery = game.title.toLowerCase().includes(q);
    const matchesGenre = !genre || game.genre === genre;
    const matchesPlatform = !platform || game.platform.toLowerCase().includes(platform.toLowerCase());
    return matchesQuery && matchesGenre && matchesPlatform;
  });

  result.sort((a, b) => {
    switch (sort) {
      case 'za': return b.title.localeCompare(a.title);
      case 'newest': return b.releaseYear - a.releaseYear;
      case 'rating': return (b.avgRating || 0) - (a.avgRating || 0);
      default: return a.title.localeCompare(b.title); // 'az'
    }
  });

  return result;
}

// Returns a debounced version of fn.
// Waits `delay` ms after the last call before executing — prevents
// a Firestore re-render firing on every single keystroke.
export function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
