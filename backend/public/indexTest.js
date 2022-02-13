window.onload = addLogIn()

class userData{
  constructor(data) {
    this.name = data.user.username
    this.id = data.user.id
    this.characters = data.characters
    this.currentCharIndex = 0
  }
}


function addLogIn() {
  let elem = document.getElementById("userForm")
  elem.innerHTML += "<div id='signTitle'> <b>Welcome to DnD Character Generator</b> </div> <div id='signIn'> <form id='login-form'> <input type='text' name='username' id='username-field' class='login-form-field' placeholder='Username'> <input type='password' name='password' id='password-field' class='login-form-field' placeholder='Password'> <input type='submit' class='button' value='Log In' id='login-form-submit'> </form> </div> <div id='signUp' onclick='addSignUp()'> Don't have an account? <button class='button'> Sign Up </button>"
  const logInButton = document.getElementById("login-form-submit");
  logInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");    
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    const data = {
      username: username,
      password: password,
    }
    fetch("http://locaLhost:3000/login", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    }).then(
      (response => response.json()
    )
  ).then(data => {
    console.log(data);
    current_user = new userData(data);
    newForm()
    let elem = document.getElementById('modal')
    elem.remove()
    });
  })
}

newForm = () => {
  document.getElementById("randNameTrait").innerHTML =  [];
  document.getElementById("randRaceTrait").innerHTML =  [];
  document.getElementById("randCharClassTrait").innerHTML =  [];
  document.getElementById("randAlignTrait").innerHTML =  [];
  document.getElementById("randStrRoll").innerHTML =  [];
  document.getElementById("randDexRoll").innerHTML =  [];
  document.getElementById("randConRoll").innerHTML =  [];
  document.getElementById("randIntRoll").innerHTML =  [];
  document.getElementById("randWisRoll").innerHTML =  [];
  document.getElementById("randCharRoll").innerHTML =  [];
  let elem = document.getElementById('charsheet')
  elem.innerHTML += "<button id='allChar' class='button onClick='allChar'> All Characters </button>"
}

allChar = () => {
  e.preventDefault()
  if (current_user.characters.length === 0) {
    alert("No characters to view.")
  } else {
  //add next and back buttons
  let elem = document.getElementById('charsheet')
  elem.innerHTML += "<button id='previous' class='button'> Previous </button>"
  elem.innerHTML += "<button id='next' class='button'> Next </button>"
  //add next event listener
  let nextButton = document.getElementById("next");
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    current_user.currentCharIndex = current_user.currentCharIndex + 1;
    current_user.currentCharIndex = current_user.currentCharIndex % current_user.characters.length
    current_user.displayCharacter(current_user.currentCharIndex);
  })
  // add back eventListener
  let previousButton = document.getElementById("previous")
  previousButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (current_user.currentCharIndex == 0) {
      current_user.currentCharIndex = current_user.characters.length
    }
    current_user.currentCharIndex = current_user.currentCharIndex - 1;
    current_user.displayCharacter(current_user.currentCharIndex);
  })
}
}