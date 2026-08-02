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

// User Real Firebase Configuration
export const firebaseConfig = {
  apiKey: savedKey || env.VITE_FIREBASE_API_KEY || "AIzaSyAmpOrpmQP4mDNqQ901xZ9slxhNLWf5hWo",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "project-4758047965677777481.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "project-4758047965677777481",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "project-4758047965677777481.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "486512069256",
  appId: env.VITE_FIREBASE_APP_ID || "1:486512069256:web:9de02a8be691b0e99e2d3d",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-YBW8PQ5STE"
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
