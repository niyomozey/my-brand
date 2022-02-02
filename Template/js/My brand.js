//const url = 'https://niyonkuru-app.herokuapp.com/niyo/'
const url = 'http://localhost:1111/niyo/'

function myFunction(){
    var x = document.getElementById("topnavbar")
    var y = document.getElementById("hicon")
    var z = document.getElementById("ic")
    var navbar = document.getElementById("navbar")
    console.log(x.className)
	if( x.className === 'nav-list'){
		x.className += ' responsive';
        y.className += ' responsive';
        z.className = 'fa fa-window-close fa-2x';
        navbar.className += ' responsive';
	}else{
		x.className = 'nav-list';
        y.className += 'homeIcon';
        z.className = 'fa fa-bars fa-2x';
        navbar.className = 'navbar';
	}   
}
// fetch(url+'blogs').then(res =>{
//     if(res.status !== 200){
//         throw new Error('Invalid request')
//     }
//     console.log(res)
//     return res
// })
// const url = `https://brasilapi.com.br/api/cep/v1/${cepWithLeftPad}`
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
    console.log('---fetching----')
    await fetch(url+'blogs', options)
    .then(res =>{
        if(res.status !== 200){
            throw new Error('Invalid request')
        }
        return res.json()
    }).then(data =>{ 
                     
        for (const key in data){
            if(data.hasOwnProperty(key)){
              const blogs = data[key]
                    var d1 = document.getElementById('bRow');
                    const blogInfo = `<div class="bCard">
					<div>
						<p>${blogs.title}</p>
                        </div>
                        <div>
                            <button onclick="location.href='./html/sblog.html?id=${key}'" class="readMe">Read ME</button>
                        </div>
				    </div>`
                    d1.insertAdjacentHTML('beforeend',blogInfo)
            }
          }
    })
    
}
