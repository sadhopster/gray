// Firebase v9 (modular)
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, query, orderByChild } from 'firebase/database';

const firebaseConfig = {
  // ЗАМЕНИ на твой конфиг
  apiKey: "YOUR_API_KEY",
  authDomain: "PROJECT.firebaseapp.com",
  databaseURL: "https://PROJECT.firebaseio.com",
  projectId: "PROJECT",
  storageBucket: "PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

export let db: ReturnType<typeof getDatabase> | null = null;
export let firebaseAvailable = false;

try {
  const app = initializeApp(firebaseConfig);
  db = getDatabase(app);
  firebaseAvailable = true;
} catch (e) {
  console.warn('Firebase not configured, using localStorage fallback', e);
  db = null;
  firebaseAvailable = false;
}

export { ref, set, push, onValue, query, orderByChild };
