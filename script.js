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
	document.querySelector("div#directoryPage").style.display = "none";
	document.querySelector("div#attendancePage").style.display = "block";
	markPresent("inPerson")
}


var attendancePage = document.getElementById('attendancePage');
attendancePage.querySelector('input#inPersonBtn').addEventListener("click",  function(){
	document.querySelector("table#inPersonTable").style.display = "block";
	document.querySelector("table#remoteTable").style.display = "none";
	markPresent("inPerson")
} );

attendancePage.querySelector('input#remoteBtn').addEventListener("click", function(){
	document.querySelector("table#inPersonTable").style.display = "none";
	document.querySelector("table#remoteTable").style.display = "block";
	markPresent("remote")
} );

//event listener to add pop up for submit button
attendancePage.querySelector('input#submitAttend').addEventListener("click", function(){
	document.body.style.backgroundColor = "yellow";
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

//Transition to health page from homePage
var homePage = document.getElementById('homePage');
homePage.querySelector('.healthButton').addEventListener("click", health)

function health(){
	//Got the date from stack overflow, can change https://stackoverflow.com/questions/25445377/how-to-get-current-date-without-time/25445633
	var nowDate = new Date(); 
	var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
	document.getElementById('currentDate').innerHTML= date;
	
	document.querySelector("div#homePage").style.display = "none";
	document.querySelector("div#directoryPage").style.display = "none";
	document.querySelector("div#healthPage").style.display = "block";

}

//when quarantine buttons are clicked
var count = 1;
function setColor(btn, color) {
  var property = document.getElementById(btn);
  if (count == 0) {
      property.style.backgroundColor = "#FFFFFF"
            count = 1;        
  }
  else {
    property.style.backgroundColor = "#7FFF00"
    count = 0;
  }
}

// -- DIRECTORY PAGE -- 
//Transition to directory page from homePage
homePage.querySelector('.directButton').addEventListener("click", directory);

// reveals mail popup 
function togglePopup(){
	document.getElementById("mailPopup").classList.toggle("active");
  }

function createStudentList(){

	studentList = document.getElementById('studentList'); //populate all students in studentList div
	var allStudents = document.createElement('ul');
	var students = ['John Doe', 'Sue Ellen', 'Lucy Hale', 'Tom Harris', 'Anna Marie','Chris Pine', 'Jeff Rogers', 'Arthur Lee'];

	//creates an li element for each student
	for(i=0; i<students.length; i++){

		var studentRow=document.createElement('li');
		studentRow.innerHTML=students[i];

		//each student mail icon opens mail popup
		var mailIcon = document.createElement('i');
		mailIcon.classList.add('fa', 'fa-envelope-square', 'fa-3x');
		mailIcon.setAttribute('id', 'mailBtn');
		mailIcon.addEventListener("click", togglePopup);
		studentRow.appendChild(mailIcon);

		//each student heart icon navigates to health portal info
		var heartIcon = document.createElement('i'); 
		heartIcon.classList.add('fa', 'fa-heart', 'fa-3x');
		heartIcon.addEventListener("click", function(){ health(); });
		studentRow.appendChild(heartIcon);

		var schedule = document.createElement('select'); //schedule drop down (options: Remote, Monday/Wednesday, Tuesday/Thursday)
		schedule.setAttribute('id', 'schedule');
		var remote = document.createElement('option');
		remote.innerHTML = 'Remote';
		var monWed = document.createElement('option');
		monWed.innerHTML = 'M/W';
		var tueThurs = document.createElement('option');
		tueThurs.innerHTML = 'T/T';

		schedule.appendChild(remote);
		schedule.appendChild(monWed);
		schedule.appendChild(tueThurs);

		studentRow.appendChild(schedule);
		allStudents.appendChild(studentRow);
	}

	studentList.append(allStudents);
}

function directory(){
	document.querySelector("div#homePage").style.display = "none";
	document.querySelector("div#attendancePage").style.display = "none";
	document.querySelector("div#directoryPage").style.display = "block";
	createStudentList();
}
