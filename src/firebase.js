// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAIp6_zL59i5OGvIP-mAbmlNKs9Qr-O-wA",
//   authDomain: "my-portfolio-e3fb0.firebaseapp.com",
//   projectId: "my-portfolio-e3fb0",
//   storageBucket: "my-portfolio-e3fb0.firebasestorage.app",
//   messagingSenderId: "94096193636",
//   appId: "1:94096193636:web:0ded84ae4ca6a7d481c771",
//   measurementId: "G-Z9GFE1T4V3"
// };

// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);        // ✅ Fix 1
// export const db = getFirestore(app);     // ✅ Fix 2
// export const storage = getStorage(app);  // ✅ Fix 3


import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// firebaseConfig.js
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

setPersistence(auth, browserSessionPersistence)
  .catch((error) => console.error("Persistence error:", error));
export const db = getFirestore(app);     // ✅ Fix 2
export const storage = getStorage(app);  // ✅ Fix 3
export { auth};