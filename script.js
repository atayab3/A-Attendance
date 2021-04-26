function goAttendance(){
    location.href = "attend.html";
}
function goHealth(){
    location.href = "health.html";
}
function goDirectory(){
    location.href = "direct.html";
}

var students = ['John Doe', 'Sue Ellen', 'Lucy Hale', 'Tom Harris', 'Anna Marie','Chris Pine', 'Jeff Rogers', 'Arthur Lee', 'Anita Padman', 'Adam Tayabali', 'Manaal Mariyah', 'Kholoud Khaleel'];
var HybridDay = ['T/T', 'Remote', 'Remote', 'M/W', 'M/W', 'Remote', 'T/T', 'Remote', 'M/W', 'Remote', 'T/T', 'Remote']; //schedule for each student in students array (line 11)
var sickStudents = ['Arthur Lee','Anna Marie', 'Tom Harris'];
var nurseNotes = ["Coughing and mild fever", "Recently exposed to sick grandparent", "Coughing after Winter Break trip"]
//==ATTENDANCE PAGE==

function attendance(){ 
    //Got the date from stack overflow, can change https://stackoverflow.com/questions/25445377/how-to-get-current-date-without-time/25445633
    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
    document.getElementById('currentDate').innerHTML= date;

}

var attendancePage = document.getElementById('attendancePage');
if(attendancePage!=null){ //sanity check b/c these output to null if this JS is loaded too soon
    attendancePage.querySelector('input#inPersonBtn').addEventListener("click",  function(){
		document.getElementById('inPersonBtn').style.backgroundColor='#228B22';
		document.getElementById('remoteBtn').style.backgroundColor='rgb(247, 200, 72)';
        document.querySelector("table#inPersonTable").style.display = "block";
        document.querySelector("table#remoteTable").style.display = "none";
    } );

    attendancePage.querySelector('input#remoteBtn').addEventListener("click", function(){
		document.getElementById('inPersonBtn').style.backgroundColor='rgb(247, 200, 72)';
		document.getElementById('remoteBtn').style.backgroundColor='#228B22';
        document.querySelector("table#inPersonTable").style.display = "none";
        document.querySelector("table#remoteTable").style.display = "block";
    } );
    //event listener to add pop up for submit button
    attendancePage.querySelector('input#submitAttend').addEventListener("click", function(){
    document.body.style.backgroundColor = "yellow";
    } );
    
}

function addQuarantine(){
	var daysInQuarantine = document.getElementById('outer');
  var numDays = Math.random() * (14);

  //while loop from: https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  while (daysInQuarantine.firstChild) {
    daysInQuarantine.removeChild(daysInQuarantine.lastChild);
  }
	for(i=0; i<13; i++){
		var quarantineDay = document.createElement('input');
    if(i < numDays){
      quarantineDay.classList.add("btn6");
    } else{
      quarantineDay.classList.add("btn5");

    }
	quarantineDay.setAttribute("style", "font-size : 15px;");
	quarantineDay.setAttribute("type", "button");
	quarantineDay.setAttribute("id", "b" + i);
    quarantineDay.setAttribute("value", i+1);
    daysInQuarantine.appendChild(quarantineDay);
	}
}

//== HEALTH PAGE==
function health(){
    //Got the date from stack overflow, can change https://stackoverflow.com/questions/25445377/how-to-get-current-date-without-time/25445633
    var nowDate = new Date(); 
    var date = nowDate.getFullYear()+'/'+(nowDate.getMonth()+1)+'/'+nowDate.getDate();
    document.getElementById('currentDate').innerHTML= date;
    addQuarantine();
}


function updateStudent(){
  var studentNameSearch = document.getElementById("form1").value;

  if(studentNameSearch != "" && sickStudents.includes(studentNameSearch)){ //only provide health info for sick students
	//update student name/nurse note of new student profile upon search 
	var studentName = document.getElementById('studentName');
    studentName.childNodes[0].textContent = studentNameSearch;
	var studentIndex = sickStudents.indexOf(studentNameSearch);
	document.getElementById('nurseNote').childNodes[0].textContent = "Nurse's Note: " + nurseNotes[studentIndex];
  }
  else{ //error checking in search bar
	  if(studentNameSearch == ""){ //blank search request
		  alert("Sorry, that's not a valid search request. Try another first and last name");
	  }
	  else{ //invalid search request
		  alert("This student is not sick and does not have a nurse's note! Try another first and last name");
	  }
  }
  addQuarantine()
}

//==DIRECTORY PAGE==

// reveals mail popup 
function togglePopup(){
    document.getElementById("mailPopup").classList.toggle("active");
}

function subTogglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}
	


function createStudentList(){
    studentList = document.getElementById('studentList'); //populate all students in studentList div
    var allStudents = document.createElement('ul');

    //creates an li element for each student
    for(i=0; i<students.length; i++){

        var studentRow=document.createElement('li');
        studentRow.innerHTML=students[i];
        studentRow.setAttribute('id', students[i]);

        //each student mail icon opens mail popup
        var mailIcon = document.createElement('i');
        mailIcon.classList.add('fa', 'fa-envelope-square', 'fa-3x');
        mailIcon.setAttribute('id', 'mailBtn');
        mailIcon.addEventListener("click", togglePopup);
        studentRow.appendChild(mailIcon);

        //each student heart icon navigates to health portal info
        var heartIcon = document.createElement('i'); 
        heartIcon.classList.add('fa', 'fa-heart', 'fa-3x');
        heartIcon.addEventListener("click", function(event){
            // console.log(event.target.parentNode.innerText);
            location.href = "health.html";
        });
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

        schedule.value=HybridDay[i]
        // set student schedule in drop down

        studentRow.appendChild(schedule);
        allStudents.appendChild(studentRow);
    }

    studentList.append(allStudents);
}

// clear email body upon button click
function clearEmail(){
    document.getElementById('email-body').value = "";
}

//highlights background of student in directory upon search, also clears previous search highlight
function findStudent(){
    var studentNameSearch = document.getElementById("directForm").value;
    if(!students.includes(studentNameSearch) || studentNameSearch==""){
        if(studentNameSearch==""){
            window.alert("You must enter a student's first and last name");
        }
        else{ //blank search query
            window.alert("This student is not in this class. Try another first and last name");
        }
    }
    else{
        //remove previous highlighting
        var allStudents = document.getElementById('studentList').getElementsByTagName('ul')[0];
        var items = allStudents.getElementsByTagName("li");
        for (var i = 0; i < items.length; ++i) {
            // do something with items[i], which is a <li> element
           items[i].style.backgroundColor = 'rgb(186, 217, 243)';
        }

        //highlight selected student
        var studentRow = document.getElementById(studentNameSearch);
        studentRow.style.backgroundColor = '#1E90FF';
    }
}