// js/firebase-config.js
// Initializes Firebase and exports the two service instances used across the app.
// Every other JS file imports from here — nothing else should call initializeApp().
// Note: Firebase Storage is not used — avatars use CSS initials only.

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ── Paste your config from Firebase Console ───────────────────────────────────
// Project Settings → Your apps → SDK setup and configuration → Config
const firebaseConfig = {
  apiKey: "AIzaSyD4yJJOew9FrpuidX_uHyftHd-jbVKpInc",
  authDomain: "checkpoint-game-hub.firebaseapp.com",
  projectId: "checkpoint-game-hub",
  storageBucket: "checkpoint-game-hub.firebasestorage.app",
  messagingSenderId: "798998645689",
  appId: "1:798998645689:web:d6ed7436247019c0d78468"
};
// ─────────────────────────────────────────────────────────────────────────────

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
