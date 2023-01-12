const signupFormHandler = async function(event) {
    event.preventDefault();
  
    const usernameEl = document.querySelector("#username-input-signup");
    const passwordEl = document.querySelector("#password-input-signup");
    fetch("/api/users", {
      method: "post",
      body: JSON.stringify({
        username: usernameEl.value,
        password: passwordEl.value
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(function() {
        document.location.replace("/userRoutes");
      })
      .catch(err => console.log(err));
  };
  
  document
    .querySelector("#signup-form")
    .addEventListener("submit", signupFormHandler);