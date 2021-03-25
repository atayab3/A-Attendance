var loginPage = document.getElementById('loginForm');
loginPage.querySelector('div#notExistingUser').addEventListener("click", changeForms);
loginPage.querySelector('#login').addEventListener("click", login );


var signUpPage = document.getElementById('signUpForm');
signUpPage.querySelector('div#isExistingUser').addEventListener("click", changeForms);
signUpPage.querySelector('#signup').addEventListener("click", login );

// TODO: We can start thinking about splitting the code for multiple JS or HTML files
// TODO: small bug causes rest of script to not execute with below statement
// document.getElementById("homebtn").addEventListener("click", home) 

function changeForms() {
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
	document.querySelector("div#homePage").style.display = "block";
}

// function home(){
//   document.querySelector("div#loginForm").style.display = "none";
// 	document.querySelector("div#signUpForm").style.display = "none";
//   document.querySelector("div#homePage").style.display = "none";
// 	document.querySelector("header").style.display = "flex";
// }



//Transition to attendance page from homePage
var homePage = document.getElementById('homePage');
homePage.querySelector('.attendButton').addEventListener("click", attendance)

function attendance(){
	//Got the date from stack overflow, can change https://stackoverflow.com/questions/25445377/how-to-get-current-date-without-time/25445633
	var nowDate = new Date(); 
	var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
	document.getElementById('currentDate').innerHTML= date;
	
	document.querySelector("div#homePage").style.display = "none";
	document.querySelector("div#attendancePage").style.display = "block";
	markPresent("inPerson")
}


var attendancePage = document.getElementById('attendancePage');
attendancePage.querySelector('button#inPersonbtn').addEventListener("click",  function(){
	document.querySelector("table#inPersonTable").style.display = "block";
	document.querySelector("table#remoteTable").style.display = "none";
	markPresent("inPerson")
} );

attendancePage.querySelector('button#remotebtn').addEventListener("click", function(){
	document.querySelector("table#inPersonTable").style.display = "none";
	document.querySelector("table#remoteTable").style.display = "block";
	markPresent("remote")
} );


// This function handles the logic for when the present box of a student is clicked is clicked
function markPresent(tabletype){
	var table ;
	//Get the correct table for attendance marking
	if(tabletype == "inPerson"){
		table = document.getElementById('attendancePage').querySelector('table#inPersonTable');
	} else{
		table = document.getElementById('attendancePage').querySelector('table#remoteTable');
	} 
	
	var rows = table.rows;
	console.log(rows);
	for(var i = 0; i < rows.length; i++){
		console.log("row no. "+ i +" is " + rows[i]);
		var dataRows = rows[i].querySelectorAll('td')
		console.log(dataRows);

		if(dataRows.length >0){ 
			console.log("in here") 
			dataRows[dataRows.length-1].addEventListener("click", function(){
				if(this.style.backgroundColor == "green"){
					this.style.backgroundColor = "white";
				}
				else{
					this.style.backgroundColor = "green"; 
				}
				
			})
		}
	}
}




