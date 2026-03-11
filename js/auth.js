// js/auth.js
// Handles all Firebase Authentication logic.
// Other files should never call Firebase auth methods directly — import from here.

import { auth, db } from './firebase-config.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  doc,
  setDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ── Auth operations ───────────────────────────────────────────────────────────

// Creates a Firebase Auth user, then writes their initial Firestore document.
// Both must succeed — if createUserWithEmailAndPassword throws, setDoc never runs.
export async function registerUser(email, password, displayName) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  // Set displayName on the Auth user object so user.displayName is available
  // on every page without needing an extra Firestore read.
  await updateProfile(user, { displayName });
  await setDoc(doc(db, 'users', user.uid), {
    displayName,
    status: '',
    createdAt: serverTimestamp()
  });
  return user;
}

export async function loginUser(email, password) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function logoutUser() {
  await signOut(auth);
}

// Keeps Firebase Auth displayName in sync with Firestore when a user edits
// their profile. Called from profile.html alongside updateUserProfile().
export async function updateDisplayName(user, displayName) {
  await updateProfile(user, { displayName });
}

// ── Auth guards ───────────────────────────────────────────────────────────────

// For index.html: if a user is already signed in, skip the login page entirely.
// Unsubscribes immediately after the first check so this listener never fires
// again during the session — prevents it from redirecting mid-registration
// when auth state changes after createUserWithEmailAndPassword resolves.
export function redirectIfLoggedIn() {
  const unsubscribe = onAuthStateChanged(auth, user => {
    unsubscribe();
    if (user) window.location.href = 'browse.html';
  });
}

// For all protected pages: redirect to login if not signed in.
// Calls onUser(user) once auth is confirmed so each page can initialize.
// Also wires up the logout button — every protected page gets this for free.
// The initialized flag prevents onAuthStateChanged from re-running setup
// on subsequent firings (e.g. token refresh), which would stack duplicate
// click listeners on the logout button.
export function requireAuth(onUser) {
  let initialized = false;
  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = 'index.html';
      return;
    }
    if (initialized) return;
    initialized = true;

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', async () => {
        await logoutUser();
        window.location.href = 'index.html';
      });
    }

    onUser(user);
  });
}

// ── Error messages ────────────────────────────────────────────────────────────

// Maps Firebase error codes to readable messages for users.
export function friendlyError(code) {
  const map = {
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/missing-email': 'Please enter your email.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/missing-password': 'Please enter your password.',
    'auth/invalid-credential': 'Invalid email or password. Please try again.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}
