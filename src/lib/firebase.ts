
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
 apiKey: "AIzaSyDsJcis-MrcwZVEnWhq89kS4ZorQj8_vGE",
  authDomain: "globalvista-cb047.firebaseapp.com",
  projectId: "globalvista-cb047",
  storageBucket: "globalvista-cb047.firebasestorage.app",
  messagingSenderId: "856716454203",
  appId: "1:856716454203:web:09781a07960df646cbaf1e",
  measurementId: "G-ZNL5SKFBYD"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);


export const db = getFirestore(app);

export default app;
