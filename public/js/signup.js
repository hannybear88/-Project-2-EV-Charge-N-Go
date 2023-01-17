const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#inputUserName').value.trim();
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  // check if all fields have values
  if (name && password) {
    // send a POST request to the API endpoint for creating a new user
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      const data = await response.json();
      alert(data.errors[0].message || 'Failed to sign up.');
    }
  }
};

// add event listener to signup form submit button
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
