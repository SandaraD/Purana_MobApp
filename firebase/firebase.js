import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyC-mEOMbS8UMVMSj4KsybC1ItyxqYLIyUw",
  authDomain: "purana-f9f3a.firebaseapp.com",
  projectId: "purana-f9f3a",
  storageBucket: "purana-f9f3a.firebasestorage.app",
  messagingSenderId: "1023815844285",
  appId: "1:1023815844285:web:4c4859ed5e7309c28bd2d4",
  measurementId: "G-E88HC1NX69"
};

// Initialize Firebase App
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };



//mario@gmail.com
//Mario-123

//bruno@gmail.com
//Bruno-123
