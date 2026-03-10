// js/db.js
// All Firestore read/write operations live here.
// Other files should import from db.js — never call Firestore directly.

import { db } from './firebase-config.js';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ── Games ──────────────────────────────────────────────────────────────────

// Fetches all documents from the games collection.
// Returns an array of game objects, each with its Firestore document ID attached.
export async function getAllGames() {
  const snapshot = await getDocs(collection(db, 'games'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Fetches a single game document by ID. Returns null if not found.
export async function getGame(gameId) {
  const snap = await getDoc(doc(db, 'games', gameId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// ── Favorites ─────────────────────────────────────────────────────────────

// Toggles a game in/out of the user's favorites subcollection.
// Reads the current state first so the result is always accurate.
// Returns true if now favorited, false if removed.
export async function toggleFavorite(userId, gameId, gameData) {
  const ref = doc(db, 'users', userId, 'favorites', gameId);
  const snap = await getDoc(ref);
  if (snap.exists()) {
    await deleteDoc(ref);
    return false;
  }
  await setDoc(ref, {
    gameId,
    title: gameData.title,
    coverImage: gameData.coverImage,
    addedAt: serverTimestamp()
  });
  return true;
}

// Returns true if the game is in the user's favorites.
export async function isFavorited(userId, gameId) {
  const snap = await getDoc(doc(db, 'users', userId, 'favorites', gameId));
  return snap.exists();
}

// ── Library ───────────────────────────────────────────────────────────────

// Saves or updates the user's play status for a game.
// status: 'not_started' | 'playing' | 'played'
// Title and coverImage are stored so the library page can render
// cards without fetching each game doc individually.
export async function setGameStatus(userId, gameId, status, gameData) {
  await setDoc(doc(db, 'users', userId, 'library', gameId), {
    gameId,
    title: gameData.title,
    coverImage: gameData.coverImage,
    status,
    updatedAt: serverTimestamp()
  });
}

// Returns the user's status string for this game, or null if not in library.
export async function getGameStatus(userId, gameId) {
  const snap = await getDoc(doc(db, 'users', userId, 'library', gameId));
  return snap.exists() ? snap.data().status : null;
}

// ── User profile ───────────────────────────────────────────────────────────

// Fetches a user's Firestore profile document.
// Used to get displayName, which is stored in Firestore — not on the Auth user.
export async function getUserProfile(userId) {
  const snap = await getDoc(doc(db, 'users', userId));
  return snap.exists() ? snap.data() : null;
}

// Updates only the supplied fields on the user's Firestore profile document.
// Using updateDoc (not setDoc) so unrelated fields like createdAt are untouched.
export async function updateUserProfile(userId, data) {
  await setDoc(doc(db, 'users', userId), data, { merge: true });
}

// Returns the number of games in the user's favorites subcollection.
export async function getFavoritesCount(userId) {
  const snap = await getDocs(collection(db, 'users', userId, 'favorites'));
  return snap.size;
}

// Returns the number of games in the user's library subcollection.
export async function getLibraryCount(userId) {
  const snap = await getDocs(collection(db, 'users', userId, 'library'));
  return snap.size;
}

// ── Reviews ───────────────────────────────────────────────────────────────

// Fetches all reviews for a game.
export async function getReviews(gameId) {
  const snapshot = await getDocs(collection(db, 'games', gameId, 'reviews'));
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

// Submits (or overwrites) the current user's review for a game.
// Using userId as the document ID enforces one review per user per game.
export async function submitReview(userId, gameId, { rating, text, displayName }) {
  await setDoc(doc(db, 'games', gameId, 'reviews', userId), {
    rating,
    text,
    displayName,
    timestamp: serverTimestamp()
  });
}
