import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration object
const firebaseConfig = {
apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
storageBucket:process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
appId: process.env.EXPO_PUBLIC_APP_ID
};

// Initialize Firebase app only if no app is initialized yet
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Auth
export const auth = getAuth()

