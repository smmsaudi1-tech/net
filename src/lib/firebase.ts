import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Safe environment accessor
const env = (import.meta as any).env || {};

// Standard Firebase Configuration
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForNextGenDevsStudio2026",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "next-gen-devs-studio.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "next-gen-devs-studio",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "next-gen-devs-studio.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase App gracefully
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;
