// var queryString = location.search.id
// console.log(queryString)
// const url = 'https://niyonkuru-app.herokuapp.com/niyo/'
const url = 'http://localhost:1111/niyo/'

var queryString = location.search
let params = new URLSearchParams(queryString)
const _id = params.get('id')
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
if(!_id){
    console.log('blog doesnt exists')
}else{
    getBlogs();
}

async function getBlogs(){
    await fetch(url+`blog/${_id}`, options)
    .then(res =>{
        if(res.status !== 200){
            throw new Error('Invalid request')
        }
        return res.json()
    }).then(data =>{ 
        console.log(data.comments) 
        document.getElementById('photo').src=data.blog.photo
        document.getElementById('title').innerHTML=data.blog.title
        document.getElementById('date').innerHTML=data.blog.created
        document.getElementById('author').innerHTML=data.blog.author
        document.getElementById('content').innerHTML=data.blog.content 
        data.comments.forEach(element => {
            console.log('----',element)
              var d1 = document.getElementById('commentRow');
                        const comment = `
                        <div class="cList">
                            <div class="cHead">
                                <h4 id="cusername">${element.username}</h4>
                                <h5 id="dt">Date</h5>
                            </div>
                            <div class="ccontent">
                                <p id="message">
                                 ${element.comment}
                                </p>
                            </div>
                        </div>
                        `
                        d1.insertAdjacentHTML('beforeend',comment)
        });
    })
    
}

document.getElementById('sendComment').addEventListener('click',function(){

    const username = document.getElementById('username').value
    const comment = document.getElementById('cmt').value
    fetch(url+`comment/${_id}`,{
        method: 'POST',
        body: JSON.stringify({
            username: username,
            comment: comment
        }),
        headers:{
            'content-type': 'application/json;charset=utf-8',
        }

    }).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message){ 
            location.href = '';
             window.alert(data.message)
        }else{
            location.href = '#';
        }
        
    })
})