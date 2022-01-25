const userName = document.getElementById("uname")
const userPassword = document.getElementById("psw")

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = userName.username.value;
  const password = loginForm.userPassword.value;

  if (username === "user" && password === "web_dev") {
      alert("You have successfully logged in.");
      location.reload();
  } 
})