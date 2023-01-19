var x = document.getElementById("form_sample");
var createform = document.createElement('form');

 // Create New Element Form
createform.setAttribute("action", "");

 // Setting Action Attribute on Form
createform.setAttribute("method", "post");

// Setting Method Attribute on Form
x.appendChild(createform);
var heading = document.createElement('h2');

// Heading of Form
heading.innerHTML = "Station Registration Form ";
createform.appendChild(heading);
var line = document.createElement('hr');

// Giving Horizontal Row After Heading
createform.appendChild(line);
var linebreak = document.createElement('br');
createform.appendChild(linebreak);
var namelabel = document.createElement('label');

// Create Label for Charger Type Field
namelabel.innerHTML = "Your Charger Type : ";

// Set Field Labels
createform.appendChild(namelabel);
var inputelement = document.createElement('input');

// Create Input Field for Name
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "dname");
createform.appendChild(inputelement);
var linebreak = document.createElement('br');
createform.appendChild(linebreak);
var usernamelabel = document.createElement('label');

// Create Label for Address Field
usernamelabel.innerHTML = "Station Address : ";
// Set Field Labels
createform.appendChild(usernamelabel);
var inputelement = document.createElement('input');

// Create Input Field for Name
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "usrname");
createform.appendChild(inputelement);
var linebreak = document.createElement('br');
createform.appendChild(linebreak);
var pswdlabel = document.createElement('label');


// Function to call time.
let startTime = document.getElementById('startTime');
let endTime = document.getElementById('endtime');

// Local Storage information
signUpButton.addEventListener("click", function(event) {
    event.preventDefault();
    
    // create user object from submission
    var user = {
      // Form inputs
      
    };
  
    // set new submission to local storage 
    localStorage.setItem("newStation", JSON.stringify(newStation));
    
  });
