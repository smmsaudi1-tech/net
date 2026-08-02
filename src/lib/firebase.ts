import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import { getAuth, Auth } from 'firebase/auth';

// Safe environment accessor
const env = (import.meta as any).env || {};

// Read custom stored API key if user configured it in Admin UI
const getCustomApiKey = () => {
  try {
    return localStorage.getItem('custom_firebase_api_key') || '';
  } catch {
    return '';
  }
};

const savedKey = getCustomApiKey();

// Standard Firebase Configuration
export const firebaseConfig = {
  apiKey: savedKey || env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForNextGenDevsStudio2026",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "next-gen-devs-studio.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "next-gen-devs-studio",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "next-gen-devs-studio.appspot.com",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abc123def456ghi789jkl"
};

// Initialize Firebase App gracefully
export let app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export let db: Firestore = getFirestore(app);
export let storage: FirebaseStorage = getStorage(app);
export let auth: Auth = getAuth(app);

export const updateCustomFirebaseApiKey = (newApiKey: string) => {
  try {
    localStorage.setItem('custom_firebase_api_key', newApiKey.trim());
    window.location.reload();
  } catch (e) {
    console.error('Error saving custom Firebase API key:', e);
  }
};

export default app;
