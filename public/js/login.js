const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#inputEmail').value.trim();
  const password = document.querySelector('#inputPassword').value.trim();

  if (email && password) {
    // Send a POST request to login the user
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace('/');
    } else {
      const data = await response.json();
      alert(data.message);
    }
  }
};

// add event listener to login form submit button
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);
