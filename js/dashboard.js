import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getStorage,ref as storage, uploadBytes,getDownloadURL,uploadBytesResumable} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';


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

logout.addEventListener('click',function(){
    
    onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;

          signOut(auth).then(() => {
             location.href='../index.html';
          }).catch((error) => {
                console.log('on logs found')
          });
        } else {
          console.log('no one logged in')
        }
      });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      document.body.style.display='block';
    } else {
      
      alert('First login');
      location.href='../index.html';
    }
  });

// upload Article
  var uploadbtn = document.getElementById('uploadArticle')
  let img ;
  let imgName;
  var uploadBlog;
  

  
 
  uploadbtn.addEventListener('click',function(){
     let user = getAuth().currentUser;
     console.log()
     const author = document.getElementById('author').value
     const title = document.getElementById('desc').value
     const content = document.getElementById('content').value
     const today = new Date()
      const dt = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()
    const imgurl='';
     
     console.log(author)
     console.log(title)
     console.log(content)
     console.log(dt)
     console.log(auth)



    console.log(img)
    var uploadB = storage(getStorage(),'images/'+imgName)
    var uploadBlog = uploadBytesResumable(uploadB, img)

    uploadBlog.on('state_changed',(snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          console.log('File available at :-->', downloadURL);
          
          set(ref(db,'/blogs/'+title), {
            title: title,
            author: author,
            photo: downloadURL,
            content: content,
            date: dt
          }).then(() => {
            console.log("stored succesfull")
            location.href = '#';
            window.alert('Blog save successfully')
          }).catch((error) => {
            console.log(error)
          })

        });
    })


      

  })

  document.getElementById('upload').addEventListener('change',function(event){
    var image = document.getElementById('bpc');
    image.src = URL.createObjectURL(event.target.files[0]);
    console.log(event.target.files[0].name)
    imgName = event.target.files[0].name;

    // img.readAsDataURL(event.target.files[0])
    
    img= event.target.files[0]

  })

  // Retreive comment && messages

var data = ref(db,"contact");




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
      var d1 = document.getElementById('pColumn');
      var addMessage='<div class="pCard">'+
          '<div class="pCard_header">'+
            '<img src="'+image+'" alt="">'+
            
          '</div>'+
          '<div class="pDescription">'+
            '<a href="#"><h3>'+title+'</h3></a>'+
          '</div>'+
          '<button id="'+title+'" class="dltBtn">Delete</button> <button id="'+title+'" class="updBtn">Update</button>'+
        '</div>';
    
      d1.insertAdjacentHTML('beforeend',addMessage);

     }

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

get(child(dbRef, 'contact')).then((snapshot) => {
  if (snapshot.exists()) {
    const data = snapshot.val()

    for (let property in data) {
      console.log(data[property])
      var sender  = data[property]
      const address = sender['address']
      const fullname = sender['fullname']
      const message = sender['message']
      const telphone = sender['telphone']

      var d1 = document.getElementById('fcomment');
      var addMessage ='<div class="messageInfo" id="messageInfo">'+
        '<div class="cont">'+
        '<div>Names : '+fullname+'</div>'+
        '<div>Address : '+address+'</div>'+
        '<div>Telphone : '+telphone+'</div>'+
        '</div>'+
        '<div class="mess">'+
        '<div>Message : '+message+'</div>'+
        '</div></div>';
    
      d1.insertAdjacentHTML('beforeend',addMessage);

     }

  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

// var comment = document.getElementById('commect')
// var el = document.createElement('div')


// d1.appendChild('<div id="two">two</div>')


// -------------------blog---------------


document.getElementById('msgbtn').addEventListener('click',function (){
  console.log('clicked')
    document.getElementById('comment').style.display="block"
    document.getElementById('messageInfo').style.display="block"
    document.getElementById('blog').style.display='none'
    document.getElementById('pContainer').style.display='none'
})

document.getElementById('createAr').addEventListener('click',function (){
  document.getElementById('blog').style.display='block'
  document.getElementById('comment').style.display="none"
    document.getElementById('messageInfo').style.display="none"
    document.getElementById('pContainer').style.display='none'
})


document.getElementById('viewArt').addEventListener('click',function (){
  document.getElementById('pContainer').style.display='block'
  document.getElementById('blog').style.display='none'
  document.getElementById('comment').style.display="none"
    document.getElementById('messageInfo').style.display="none"
})