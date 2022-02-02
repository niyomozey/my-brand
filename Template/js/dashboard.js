import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, get, set, child } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
import { getStorage,ref as storage, uploadBytes,getDownloadURL,uploadBytesResumable} from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-storage.js';
// const url = 'https://niyonkuru-app.herokuapp.com/niyo/'
const url = 'http://localhost:1111/niyo/'



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
document.body.style.display='block';

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

// onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       document.body.style.display='block';
//     } else {
      
//       alert('First login');
//       location.href='../index.html';
//     }
//   });

// upload Article
  var uploadbtn = document.getElementById('uploadArticle')
  let img ;
  let imgName;
  var uploadBlog;
  

 
  uploadbtn.addEventListener('click',function(){
    //  let user = getAuth().currentUser;
     console.log('------')
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
    var uploadB = storage(getStorage(),'blogs/'+imgName)
    var uploadBlog = uploadBytesResumable(uploadB, img)
    console.log('upload blogs : ',uploadBlog)
    uploadBlog.on('state_changed',(snapshot) => {
      var i=0;
      if(i<=0){      
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          fetch(url+'createBlog',{
            method: 'POST',
            body: JSON.stringify({
                title: title,
                author: author,
                photo: downloadURL,
                content: content,
            }),
            headers:{
                'content-type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWVhOGQ4MzFhYjdlNWVkODNkZDRiNmYiLCJpYXQiOjE2NDMxMzkxOTF9.-fLNjvSFGKc6ES-3cceDgcnmuixL_vlKU6q4_0FBoAA'
            }
    
        }).then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.message){ 
                location.href = '#';
                 window.alert(data.message)
            }else{
                    i++;
                location.href = './dashboard.html';
            }
            
        })
        // ------------------------
          // set(ref(db,'/blogs/'+title), {
          //   title: title,
          //   author: author,
          //   photo: downloadURL,
          //   content: content,
          //   date: dt
          // }).then(() => {
          //   console.log("stored succesfull")
          //   location.href = '#';
          //   window.alert('Blog save successfully')
          // }).catch((error) => {
          //   console.log(error)
          // })

        });
      }

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

// var data = ref(db,"contact");




// const dbRef = ref(db);
// get(child(dbRef, 'blogs')).then((snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.val()

//     for (let property in data) {
//       console.log(data[property])
//       var blog  = data[property]
//       const author = blog['author']
//       const content = blog['content']
//       const date = blog['date']
//       const title = blog['title']
//       const image = blog['photo']
//       var d1 = document.getElementById('pColumn');
//       var addMessage='<div class="pCard">'+
//           '<div class="pCard_header">'+
//             '<img src="'+image+'" alt="">'+
            
//           '</div>'+
//           '<div class="pDescription">'+
//             '<a href="#"><h3>'+title+'</h3></a>'+
//           '</div>'+
//           '<button id="'+title+'" class="dltBtn">Delete</button> <button id="'+title+'" class="updBtn">Update</button>'+
//         '</div>';
    
//       d1.insertAdjacentHTML('beforeend',addMessage);

//      }

//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// get(child(dbRef, 'contact')).then((snapshot) => {
//   if (snapshot.exists()) {
//     const data = snapshot.val()

//     for (let property in data) {
//       console.log(data[property])
//       var sender  = data[property]
//       const address = sender['address']
//       const fullname = sender['fullname']
//       const message = sender['message']
//       const telphone = sender['telphone']

//       var d1 = document.getElementById('fcomment');
//       var addMessage ='<div class="messageInfo" id="messageInfo">'+
//         '<div class="cont">'+
//         '<div>Names : '+fullname+'</div>'+
//         '<div>Address : '+address+'</div>'+
//         '<div>Telphone : '+telphone+'</div>'+
//         '</div>'+
//         '<div class="mess">'+
//         '<div>Message : '+message+'</div>'+
//         '</div></div>';
    
//       d1.insertAdjacentHTML('beforeend',addMessage);

//      }

//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// var comment = document.getElementById('commect')
// var el = document.createElement('div')


// d1.appendChild('<div id="two">two</div>')


// -------------------blog---------------

const options = {
  method: 'GET',
  mode: 'cors',
  headers: {
 //   'content-type': 'application/json;charset=utf-8',
 //   'Access-Control-Allow-Credentials': 'true',
 //   'Accept': 'application/json',
 //   'Access-Control-Allow-Origin': 'http://localhost:1111'
  }
 }
 getBlogs();
async function getBlogs(){
    await fetch(url+'blogs', options)
    .then(res =>{
        if(res.status !== 200){
            throw new Error('Invalid request')
        }
        return res.json()
    }).then(data =>{              
        for (const key in data){
          if(data.hasOwnProperty(key)){
      // console.log(data[property])
      // var blog  = data[property]
      const blogs = data[key]
      const author = blogs.author
      const content = blogs.content
      const date = blog['date']
      const title = blogs.title
      const image = blogs.photo
      var d1 = document.getElementById('pColumn');
      var addMessage='<div class="pCard">'+
          '<div class="pCard_header">'+
            '<img src="'+image+'" alt="">'+
            
          '</div>'+
          '<div class="pDescription">'+
            '<a href="#"><h3>'+title+'</h3></a>'+
          '</div>'+
          '<button id="'+title+'" class="dltBtn" onclick="getHello(\'id\')" >Delete</button> <button id="'+title+'" class="updBtn">Update</button>'+
        '</div>';
      d1.insertAdjacentHTML('beforeend',addMessage);

  
          //   if(data.hasOwnProperty(key)){
          //     const blogs = data[key]
          //           var d1 = document.getElementById('bRow');
          //           const blogInfo = `<div class="bCard">
					// <div>
					// 	<p>${blogs.title}</p>
          //               </div>
          //               <div>
          //                   <button onclick="location.href='./html/sblog.html?id=${key}'" class="readMe">Read ME</button>
          //               </div>
				  //   </div>`
          //           d1.insertAdjacentHTML('beforeend',blogInfo)
          //   }
             }
          }
    })
    
}

function deleteBlog(id){
  console.log(id)
  
}
function getHello(id){
  console.log('-----')
}

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
// document.getElementById('pContainer').style.display='none'

document.getElementById('viewArt').addEventListener('click',function (){
  console.log('clicked---')
  document.getElementById('pContainer').style.display='block'
  document.getElementById('blog').style.display='none'
  document.getElementById('comment').style.display="none"
    // document.getElementById('messageInfo').style.display="none"
})

document.querySelector('#edit').addEventListener('click',function(){
  var matches = document.getElementsByClassName('pdetail');
  for (var i=0; i<matches.length; i++) {
    matches[i].classList.remove('colorbox');
    matches[i].style.border= 'solid 2px gainsboro';
  }
  document.getElementById('updateProfile').disabled = false
  document.getElementById('updateProfile').style.cursor = 'pointer'
})