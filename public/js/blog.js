import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";


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
var auth = getAuth()
var logout = document.getElementById('logout')
const db = getDatabase();

const dbRef = ref(db);
get(child(dbRef, 'blogs')).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val()

    for (let property in data) {
      console.log(data[property])
      var blog  = data[property]
      const author = blog['author']
      const content = blog['content']
      const date = blog['date']
      const title = blog['title']
      const image = blog['photo']
      var d1 = document.getElementById('pContainer');
      var addMessage='<div class="pRow">'+
      '<div class="pColumn">'+
        '<div class="pCard">'+
          '<div class="pCard_header">'+
            '<img src="'+image+'" alt="">'+
            
          '</div>'+
          '<div class="pDescription">'+
            '<a href="./sblog.html"><h3>'+title+'</h3></a>'+
          '</div>'+
        //   '<button id="'+title+'" class="dltBtn">Delete</button> <button name="'+title+'" id="updBtn" class="updBtn">Update</button>'+
        '</div>'+
      '</div>'+					
      '</div>';
    
      d1.insertAdjacentHTML('afterend',addMessage);

     }

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});