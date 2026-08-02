import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Standard Firebase Configuration
// Replace with your Firebase Console Project credentials or environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForNextGenDevsStudio2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "next-gen-devs-studio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "next-gen-devs-studio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "next-gen-devs-studio.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase App gracefully
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
