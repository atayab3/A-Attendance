var loginPage = document.getElementById('loginForm');
loginPage.querySelector('div#notExistingUser').addEventListener("click", changeForms);
loginPage.querySelector('#login').addEventListener("click", login );


var signUpPage = document.getElementById('signUpForm');
signUpPage.querySelector('div#isExistingUser').addEventListener("click", changeForms);
signUpPage.querySelector('#signup').addEventListener("click", login );


function changeForms() {
//tried using a boolean for if statement but it stayed true
	if(document.querySelector("div#loginForm").style.display == "block"){
		document.querySelector("div#loginForm").style.display = "none";
		document.querySelector("div#signUpForm").style.display = "block";
	}
	else{
		document.querySelector("div#loginForm").style.display = "block";
		document.querySelector("div#signUpForm").style.display = "none";
	}	
}

function login(){
	document.querySelector("div#loginForm").style.display = "none";
	document.querySelector("div#signUpForm").style.display = "none";
}


