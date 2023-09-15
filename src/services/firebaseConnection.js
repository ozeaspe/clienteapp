import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBx2r-_l4LXEm9WYmM9ssoN3YrSlEYK2q8",
    authDomain: "fisioapp-a6aaa.firebaseapp.com",
    projectId: "fisioapp-a6aaa",
    storageBucket: "fisioapp-a6aaa.appspot.com",
    messagingSenderId: "526017355410",
    appId: "1:526017355410:web:890322b61910b0cc65104b",
    measurementId: "G-69KQBTBWHF"
  };

  const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export{ db, auth, storage };