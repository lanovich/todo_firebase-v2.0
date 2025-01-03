import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyBOGPLttAgzD8T7p8kHv3RjYy6oK30otCg",
  authDomain: "todolistpro-d2ebc.firebaseapp.com",
  projectId: "todolistpro-d2ebc",
  storageBucket: "todolistpro-d2ebc.firebasestorage.app",
  messagingSenderId: "811827066580",
  appId: "1:811827066580:web:018c24c1062cc44d44ad41",
  databaseURL: "https://todolistpro-d2ebc-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)