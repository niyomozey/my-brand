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