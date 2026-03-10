// js/db.js
// All Firestore read/write operations live here.
// Other files should import from db.js — never call Firestore directly.

import { db } from './firebase-config.js';
import {
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';

// ── Games ──────────────────────────────────────────────────────────────────

// Fetches all documents from the games collection.
// Returns an array of game objects, each with its Firestore document ID attached.
export async function getAllGames() {
  const snapshot = await getDocs(collection(db, 'games'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
