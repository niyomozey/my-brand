// import {initializeApp} from 'firebase/app';

// import {getAuth, onAuthStateChanged} from 'firebase/auth';
// import {getFirestore} from 'firebase/firestore';

// import {getDatabase, ref, set} from 'firebase/database';

const initializeApp= require('firebase/app')
const {getDatabase, ref, set} = require('firebase/database')


const firebaseConfig = {
    apiKey: "AIzaSyAX7RJI8ZtO6gDI2NRal8lYc-LrZZgqDBQ",
    authDomain: "mybrand-91d07.firebaseapp.com",
    projectId: "mybrand-91d07",
    databaseUrl : "https://mybrand-91d07-default-rtdb.firebaseio.com/",
    storageBucket: "mybrand-91d07.appspot.com",
    messagingSenderId: "893040789211",
    appId: "1:893040789211:web:5dfbbcf8d3b1ba010beefe"
  };

const app = initializeApp.initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp)
// const db = getFirestore(firebaseApp)

console.log("hello world")
//detect auth change
// onAuthStateChanged(auth, user =>{
//     if(user=! null){
//         console.log('logged in')
//     }else{
//         console.log('No user')
//     }
// });

// var sendBtn = document.querySelector(".sendMessage")
document.querySelector("#sendMessage").addEventListener("click",function(){
    console.log("button clicked")
    const fullname = document.querySelector("#fullname").value
    const email = document.querySelector("#email").value
    const telphone = document.querySelector("#address").value
    const message = document.querySelector("#message").value
   writeUserData(fullname,email,telphone,address,message)
    console.log(fullname)
    console.log(email)
    console.log(telphone)
    console.log(message)
})

// create -- save data
function writeUserData(fullname, email, telphone,address,message){
    const db = getDatabase();
    set(ref(db,'contact/',email),{
        fullname: fullname,
        telphone: telphone,
        address: address,
        message:message
    });
}