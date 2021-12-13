// import { initializeApp } from 'firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAX7RJI8ZtO6gDI2NRal8lYc-LrZZgqDBQ",
    authDomain: "mybrand-91d07.firebaseapp.com",
    projectId: "mybrand-91d07",
    databaseUrl: "https://mybrand-91d07-default-rtdb.firebaseio.com/",
    storageBucket: "mybrand-91d07.appspot.com",
    messagingSenderId: "893040789211",
    appId: "1:893040789211:web:5dfbbcf8d3b1ba010beefe"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth()

document.querySelector("#send").addEventListener("click", function () {
    console.log("button clicked")
    const email = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    // findAll(username,password)	
    // signInWithEmailAndPassword(auth, email, password)
    
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log(user)
                location.href = './dashboard.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode)
                console.log(errorMessage)
                var err = document.getElementById('error')
                err.innerHTML = 'Incorrect username or password'
                err.style.color = 'red'
            });

})

