

import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyAX7RJI8ZtO6gDI2NRal8lYc-LrZZgqDBQ",
  authDomain: "mybrand-91d07.firebaseapp.com",
  databaseURL: "https://mybrand-91d07-default-rtdb.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);