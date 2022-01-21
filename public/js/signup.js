// import { initializeApp } from 'firebase/app';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js';
import { getDatabase, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.0/firebase-database.js';
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
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
const auth = getAuth();
const db = getDatabase();

document.querySelector("#send").addEventListener("click", function () {
    console.log("button clicked")
    const fullname = updBtnupdBtn("#fullname").value
    const email = document.querySelector("#email").value
    const telphone = document.querySelector("#telphone").value
    const username = document.querySelector("#username").value
    const password = document.querySelector("#password").value
    const cpassword = document.querySelector("#Cpassword").value

    const data = {
        fullname: fullname,
        email: email,
        telphone: telphone,
        username: username,
        password: password,
        cpassword: cpassword
    }
    let validate=isValidate(data)
    console.log(validate.value)
    console.log(validate.error)
    
    if (validate.value) {

        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user
            const userData = {
                fullname: fullname,
                email: email,
                telphone: telphone,
                username: username,
                password: password,
                role: 'user'
            }
            set(ref(db, '/user/' + user.uid), userData).then(() => {
                location.href = './dashboard.html';
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            var err = document.getElementById('error')
            err.innerHTML = errorMessage
            err.style.color = 'red'
        })
    } else {
        const error = validate.error
        if(error.fullname!=''){
            document.querySelector("#fullname").style.border= "solid 2px red";
            document.querySelector(".ferror").innerHTML=error.fullname
        }
        if(error.password!=''){
            document.querySelector("#password").style.border= "solid 2px red"; 
            document.querySelector(".perror").innerHTML=error.password           
        }
        if(error.email!=''){
            document.querySelector("#email").style.border= "solid 2px red";
            document.querySelector(".eerror").innerHTML=error.email
        }
        if(error.username!=''){
            document.querySelector("#username").style.border= "solid 2px red";
            document.querySelector(".uerror").innerHTML=error.username
        }
        if(error.telphone!=''){
            document.querySelector("#telphone").style.border= "solid 2px red";
            document.querySelector(".terror").innerHTML=error.telphone
        }
    }

})

function isValidate(data) {
    const fname = /\d/.test(data.fullname);
    const username = /\d/.test(data.username);
    const email = /^[A-Za-z0-9+_.-]+@(.+)$/.test(data.email)
    var count=0;
    const errors={
        fullname: '',
        telphone: '',
        email:'',
        username:'',
        password:''
    }
    if(fname || data.fullname===''){
        console.log('fullname error')
        errors.fullname= 'fullname error'
        count++
    }

    if(data.telphone.length!=10){
        console.log('t.fullnameelphone error')
        errors.telphone='telphone error'
        count++
    }
    if(!email){
        console.log('email error'+email)
        errors.email='Email error'
        count++
    }
    if(username || data.username===''){
        console.log('username error')
        errors.username='username error'
        count++
    }

    if(data.password != data.cpassword || data.password.length <= 8){
        console.log('password error')
        errors.password='password error'
        count++
    }

    if(count==0){
        return {value: true,error:errors}
    }else{
        return {value: false,error:errors}
    }
    
}
// create -- save data
// function writeUserData(fullname, email, telphone, username, password) {
// 	const db = getDatabase();
// 	set(ref(db, '/user/'+username), {
// 		fullname: fullname,
// 		telphone: telphone,
// 		email: email,
// 		password: password
// 	}).then(() => {
// 		console.log("stored succesfull")
// 	}).catch((error) => {
// 		console.log(error)
// 	})
// }
// function selectAll(){
// 	ref().set
// }

