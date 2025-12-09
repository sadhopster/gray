// firebase-config.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push, onValue, query, orderByChild } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyCGUMw_l3-LiF3n8T4C6V9p_9TCw9L6is8",
  authDomain: "gray-86c80.firebaseapp.com",
  databaseURL: "https://gray-86c80-default-rtdb.europe-west1.firebasedatabase.app/", // ← ВАЖНО: ваш URL
  projectId: "gray-86c80",
  storageBucket: "gray-86c80.firebasestorage.app",
  messagingSenderId: "887051116442",
  appId: "1:887051116442:web:84623a93cc4402f8bf6423",
  measurementId: "G-2H1M7GKRTN"
};
export let db: ReturnType<typeof getDatabase> | null = null;
export let firebaseAvailable = false;
export let analytics: ReturnType<typeof getAnalytics> | null = null;

try {
  const app = initializeApp(firebaseConfig);
  
  // Инициализируем Realtime Database
  db = getDatabase(app);
  
  // Инициализируем Analytics (опционально)
  analytics = getAnalytics(app);
  
  firebaseAvailable = true;
  console.log('Firebase initialized successfully');
} catch (e) {
  console.warn('Firebase not configured, using localStorage fallback', e);
  db = null;
  analytics = null;
  firebaseAvailable = false;
}

export { ref, set, push, onValue, query, orderByChild };