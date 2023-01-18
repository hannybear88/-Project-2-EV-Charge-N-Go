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



var contactlabel = document.createElement('label'); // Create Label for contact number
contactlabel.innerHTML = "Station Availability : "; // Set Field Labels
createform.appendChild(contactlabel);
var inputelement = document.createElement('input'); // Create Input Field for contact number
inputelement.setAttribute("type", "text");
inputelement.setAttribute("name", "contno");
createform.appendChild(inputelement);
var linebreak = document.createElement('br');
createform.appendChild(linebreak);
var emaillabel = document.createElement('label'); // Create Label for E-mail Field
emaillabel.innerHTML = "Your Email : ";
createform.appendChild(emaillabel);
var emailelement = document.createElement('input'); // Create Input Field for E-mail
emailelement.setAttribute("type", "text");
emailelement.setAttribute("name", "demail");
createform.appendChild(emailelement);
var emailbreak = document.createElement('br');
createform.appendChild(emailbreak);
var addresslabel = document.createElement('label'); // Append Textarea
addresslabel.innerHTML = "Your Address : ";
createform.appendChild(addresslabel);
var texareaelement = document.createElement('textarea');
texareaelement.setAttribute("name", "daddress");
createform.appendChild(texareaelement);
var messagebreak = document.createElement('br');
createform.appendChild(messagebreak);
var submitelement = document.createElement('input'); // Append Submit Button
submitelement.setAttribute("type", "submit");
submitelement.setAttribute("name", "dsubmit");
submitelement.setAttribute("value", "Submit");
createform.appendChild(submitelement);