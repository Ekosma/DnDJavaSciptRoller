//adds login modal on load
window.onload = addLogIn()

//instantiates user class.
class userData{
  constructor(data) {
    this.name = data.user.username
    this.id = data.user.id
    this.characters = data.characters
    this.currentCharIndex = 0
  }
  //displays data based on characters array
  displayCharacter = (index) => {
    let charData = this.characters[index];
    document.getElementById("randNameTrait").innerHTML =  charData.name;
    document.getElementById("randRaceTrait").innerHTML =  charData.race;
    document.getElementById("randCharClassTrait").innerHTML =  charData.character_class;
    document.getElementById("randAlignTrait").innerHTML =  charData.alignment;
    document.getElementById("randStrRoll").innerHTML =  charData.strength;
    document.getElementById("randDexRoll").innerHTML =  charData.dexterity;
    document.getElementById("randConRoll").innerHTML =  charData.constitution;
    document.getElementById("randIntRoll").innerHTML =  charData.intelligence;
    document.getElementById("randWisRoll").innerHTML =  charData.wisdom;
    document.getElementById("randCharRoll").innerHTML =  charData.charisma;
  }
}

function addLogIn() {
  //checks if came from signup page to remove
  if (document.getElementById('signUpForm')) {
    document.getElementById('signUpForm').remove()
  }
  
  //adds login form
  let elem = document.getElementById("userForm")
  elem.innerHTML += "<div id='startPage'><div id='signTitle'> <b>Welcome to DnD Character Generator</b> </div> <div id='signIn'> <form id='login-form'> <input type='text' name='username' id='username-field' class='login-form-field' placeholder='Username'> <input type='password' name='password' id='password-field' class='login-form-field' placeholder='Password'> <input type='submit' class='button' value='Log In' id='login-form-submit'> </form> </div> <div id='signUp' onclick='addSignUp()'> Don't have an account? <button class='button'> Sign Up </button></div>"
  //creates eventListener for log in button
  const logInButton = document.getElementById("login-form-submit");
  logInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");    
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    //creates data to send to backend
    const data = {
      username: username,
      password: password,
    }
    //if either field blank, stops process
    if (username === "" || password === "") {
      alert("Field(s) can not be left Blank.")
    } else {
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
    //instantiates user
    let errors = JSON.stringify(data.errors)
    if (errors !== undefined) {
      alert(errors)
    } else {
    current_user = new userData(data);
    //removes log in page
    let elem = document.getElementById('modal')
    elem.remove()
    //adds all characters button
    let allchar = document.getElementById('charsheet')
    allchar.innerHTML += "<button id='allChar' class='button' onclick='allChar()'> All Characters </button> <button id='save' class='button' onclick='save()'> Save </button> <button id=ranButt' onclick='randomGenerator()' class='button'> Randomize </button>"
    }
    });
    }
  })
}

function addSignUp() {
  let elem = document.getElementById("startPage")
  let modal = document.getElementById('modal')
  elem.remove()
  modal.innerHTML += " <div id='signUpForm' >  <b>Sign up for DnD Character Generator Here </b> <form id='sign-up-form'> <input type='text' name='username' id='username-field' class='login-form-field' placeholder='Username'> <input type='password' name='password' id='password-field' class='login-form-field' placeholder='Password'> <input type='submit' class='button' value='Sign Up' id='signup-form-submit'> </form> Already have an  account? <button id='login' onclick='addLogIn()' class='button'> log in</button></div>>"
  const signUpButton = document.getElementById("signup-form-submit");
  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    const loginForm = document.getElementById("sign-up-form");    
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    //creates object to pass to backend
    const data = {
      username: username,
      password: password,
    }
    //checks if fields are blank
    if (username === "" || password === "") {
      alert("Field(s) can not be left Blank.")
    } else {
      fetch("http://locaLhost:3000/new", { 
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
      let errors = JSON.stringify(data.data)
      //states why user can not be added
      if (errors !== undefined) {
        alert(errors)
      } else {
      //instantiates user
      current_user = new userData(data);
      //removes log in page
      let elem = document.getElementById('modal')
      elem.remove()
      //adds all characters button
      let allchar = document.getElementById('charsheet')
      allchar.innerHTML += "<button id='allChar' class='button' onclick='allChar()'> All Characters </button> <button id='save' class='button' onclick='save()'> Save </button> <button id=ranButt' onclick='randomGenerator()' class='button'> Randomize </button>"
      } 
      });
    }
  })
}

newForm = () => {
  //creates empty form
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
  let charsheet = document.getElementById('charsheet')
  //removes all buttons
  let button = document.getElementsByClassName('button')
    for (;button.length;) {
        button[0].remove();
    }
  //adds all char and save button
  charsheet.innerHTML += "<button id='allChar' class='button' onclick='allChar()'> All Characters </button> <button id='save' class='button' onclick='save()'> Save </button> <button id='ranButt' onclick='randomGenerator()' class='button'> Randomize </button>"
  //remove new form button
  //QUESTION is it okay to have uncaught promises if they do not affect anything?
}

//form fillers and random generator 
const names = ["Dian", "Nese", "Falledrick", "Mae", "Valhein", "Dol", "Earl", "Cedria", "Azulei", "Yun", "Cybel", "Ina", "Foolly", "Skili", "Juddol", "Janver", "Viska", "Hirschendy", "Silka", "Hellsturn", "Essa", "Mykonos", "Fenton", "Tyrena", "Inqoul", "Mankov", "Derilia", "Hexema", "Wyton", "Kaedum", "Gouram", "Libertia", "Berasailles", "Juxta", "Tae’hr", "Comtol", "Gherak", "Hest", "Qony", "Masamka", "Twyll", "Tenos", "Axim", "Westrynda", "Saphros", "Olkham", "Handok", "Kemetra", "Yos", "Wentingle", "Ames", "Molosh", "Inkov", "Phasasia", "Ziedinghal", "Bregul", "Eishvack", "Lora", "Krenting", "Symbole", "Elignoir", "Keligkrul", "Qwey", "Vindinglag", "Kusakira", "Weme", "Fayd", "Rushvita", "Vulkor", "Amers", "Ortos", "Vanius", "Chandellia", "Lilikol", "Catca", "Cormus", "Yuela", "Ariban", "Tryton", "Fesscha", "Opalul", "Zakzos", "Hortimer", "Anklos", "Dushasiez", "Polop", "Mektal", "Orinphus", "Denatra", "Elkazzi", "Dyne", "Domos", "Letryal", "Manniv", "Sylestia", "Esnol", "Fasafuros", "Ghanfer", "Kahnite", "Sweyda", "Uylis", "Retenia", "Bassos", "Arkensval", "Impelos", "Grandius", "Fulcrux", "Lassahein", "Edsveda", "Earakun", "Fous", "Maas", "Basenphal", "Jubidya", "Divya", "Kosunten", "Ordayius", "Donfer", "Gangher", "Escha", "Manchul", "Kempos", "Kulo", "Urtench", "Kesta", "Helahona", "Ryte", "Falcia", "Umannos", "Urkensvall", "Fedra", "Bulkensar", "Comia", "Tyul", "Lasendarl"]
const races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Tiefling"]
const charClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rouge", "Sorceror", "Warlock", "Wizard"]
const allignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Neutral", "Unaligned"]

//pulls random trait from array
const getRandomTrait = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const trait = arr[randomIndex];
  return trait;
}

//generates random number from 1-20
function randomRoll() {
  let theRoll = Array.from({length: 4}, () => Math.floor(Math.random() * 6)+1);
  theRoll.sort().shift()
  return theRoll.reduce((a, b) => a + b, 0)
}

//assigns random roll to page
function randomGenerator() {
  document.getElementById("randNameTrait").innerHTML =  getRandomTrait(names);
  document.getElementById("randRaceTrait").innerHTML =  getRandomTrait(races);
  document.getElementById("randCharClassTrait").innerHTML =  getRandomTrait(charClasses);
  document.getElementById("randAlignTrait").innerHTML =  getRandomTrait(allignments);
  document.getElementById("randStrRoll").innerHTML =  randomRoll();
  document.getElementById("randDexRoll").innerHTML =  randomRoll();
  document.getElementById("randConRoll").innerHTML =  randomRoll();
  document.getElementById("randIntRoll").innerHTML =  randomRoll();
  document.getElementById("randWisRoll").innerHTML =  randomRoll();
  document.getElementById("randCharRoll").innerHTML =  randomRoll();
}

//instantiates characters
class Character {
  constructor() {
    this.name = document.getElementById("randNameTrait").innerHTML
    this.race = document.getElementById("randRaceTrait").innerHTML
    this.character_class = document.getElementById("randCharClassTrait").innerHTML
    this.alignment = document.getElementById("randAlignTrait").innerHTML
    this.strength = document.getElementById("randStrRoll").innerHTML
    this.dexterity = document.getElementById("randDexRoll").innerHTML
    this.constitution = document.getElementById("randConRoll").innerHTML
    this.intelligence = document.getElementById("randIntRoll").innerHTML
    this.wisdom = document.getElementById("randWisRoll").innerHTML
    this.charisma = document.getElementById("randCharRoll").innerHTML
    this.user_id = current_user.id
  }
}

//function to pull all saved characters and format page
function allChar() {
  //checks if there is currently an array of characters
  if (current_user.characters === undefined || current_user.characters.length === 0) {
    console.log("if")
    alert("No characters to view.")
  } else {
    console.log("else")
    //removes save, random, and all characters button, adds new form button
    let charSheet = document.getElementById("charsheet")
    //loops to delete all buttons on page. Must be 0 instead of i as length varries ITS ALIVE (object cough cough)!!!
    let button = document.getElementsByClassName('button')
    for (;button.length;) {
        button[0].remove();
    }
    charSheet.innerHTML += "<button id= 'newForm' onclick='newForm()' class='button'> Generate New Character</button><button id='delete' onclick='deleteChar()' class='button'> Delete </button>"
    //add next and back buttons
    current_user.displayCharacter(0)
    current_user.currentCharIndex = 0
    let elem = document.getElementById('charsheet')
    elem.innerHTML += "<button id='previous' class='button'> Previous </button>"
    elem.innerHTML += "<button id='next' class='button'> Next </button>"
    //add next event listener
    let nextButton = document.getElementById("next");
    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("next")
      current_user.currentCharIndex = current_user.currentCharIndex + 1;
      current_user.currentCharIndex = current_user.currentCharIndex % current_user.characters.length
      current_user.displayCharacter(current_user.currentCharIndex);
    })
    // add back eventListener
    let previousButton = document.getElementById("previous")
    previousButton.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("preious")
      if (current_user.currentCharIndex == 0) {
        current_user.currentCharIndex = current_user.characters.length
      }
      current_user.currentCharIndex = current_user.currentCharIndex - 1;
      current_user.displayCharacter(current_user.currentCharIndex);
    })
  }
}

//save Character //
function save() {
  console.log("save")
  if (document.getElementById("randNameTrait").innerHTML.trim() === "" ) {
    alert("No Character to Save")
  } else {
  //instantiates new character
    let data = new Character()
    fetch("http://locaLhost:3000/characters", { 
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    }).then(response => response.json())
    .then(response => { 
      current_user.characters = response;
      console.log(current_user.characters);
    })
  }
}

//logout function
function logout() {
  console.log("logout")
  let button = document.getElementsByClassName('button')
  for (;button.length;) {
      button[0].remove();
  }
  document.body.innerHTML = document.body.innerHTML += "<div id='modal' class='modal hide fade in' data-keyboard='false' data-backdrop='static'> <div id='userForm'> </div> </div>"
  addLogIn()
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
  /* Technically works lol
  window.location.reload(); */
}

//delete character
function deleteChar() {
  console.log("delete")
  let data = current_user.characters[current_user.currentCharIndex].id
  fetch(`http://locaLhost:3000/characters/${data}`, { 
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  }).then(response => response.json())
  .then(response => { 
    current_user.characters = response;
    console.log(current_user.characters);
    if (current_user.characters.length === 0) {
      newForm()
    } else {
      allChar()
    }
  })
}


