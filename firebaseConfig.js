// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getReactNativePersistence, initializeAuth } from 'firebase/auth';
// Your web app's Firebase configuration
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCbF41LC2_B41s8goMLFtbOriH-TWr8Q3I',
  authDomain: 'fir-chat-1fa24.firebaseapp.com',
  projectId: 'fir-chat-1fa24',
  storageBucket: 'fir-chat-1fa24.firebasestorage.app',
  messagingSenderId: '964702238685',
  appId: '1:964702238685:web:e1394f00f32cfa3e13a834',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//при обновлении даннеы пользователя не исчезали
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'rooms');
