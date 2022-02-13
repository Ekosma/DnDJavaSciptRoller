window.onload = addLogIn()

class userData{
  constructor(data) {
    this.name = data.user.username
    this.id = data.user.id
    this.characters = data.characters
    this.currentCharIndex = 0
  }
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
    let elem = document.getElementById('modal')
    elem.remove()
    newForm()
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
  elem.innerHTML += "<button id='allChar' class='button' onclick='allChar()'> All Characters </button>"
  let previous = document.getElementById('previous');
  let next = document.getElementById("next");
  previous.remove()
  next.remove()
  //QUESTION is it okay to have uncaught promises if they do not affect anything?
}

//form fillers and random generator 

const names = ["Dian", "Nese", "Falledrick", "Mae", "Valhein", "Dol", "Earl", "Cedria", "Azulei", "Yun", "Cybel", "Ina", "Foolly", "Skili", "Juddol", "Janver", "Viska", "Hirschendy", "Silka", "Hellsturn", "Essa", "Mykonos", "Fenton", "Tyrena", "Inqoul", "Mankov", "Derilia", "Hexema", "Wyton", "Kaedum", "Gouram", "Libertia", "Berasailles", "Juxta", "Tae’hr", "Comtol", "Gherak", "Hest", "Qony", "Masamka", "Twyll", "Tenos", "Axim", "Westrynda", "Saphros", "Olkham", "Handok", "Kemetra", "Yos", "Wentingle", "Ames", "Molosh", "Inkov", "Phasasia", "Ziedinghal", "Bregul", "Eishvack", "Lora", "Krenting", "Symbole", "Elignoir", "Keligkrul", "Qwey", "Vindinglag", "Kusakira", "Weme", "Fayd", "Rushvita", "Vulkor", "Amers", "Ortos", "Vanius", "Chandellia", "Lilikol", "Catca", "Cormus", "Yuela", "Ariban", "Tryton", "Fesscha", "Opalul", "Zakzos", "Hortimer", "Anklos", "Dushasiez", "Polop", "Mektal", "Orinphus", "Denatra", "Elkazzi", "Dyne", "Domos", "Letryal", "Manniv", "Sylestia", "Esnol", "Fasafuros", "Ghanfer", "Kahnite", "Sweyda", "Uylis", "Retenia", "Bassos", "Arkensval", "Impelos", "Grandius", "Fulcrux", "Lassahein", "Edsveda", "Earakun", "Fous", "Maas", "Basenphal", "Jubidya", "Divya", "Kosunten", "Ordayius", "Donfer", "Gangher", "Escha", "Manchul", "Kempos", "Kulo", "Urtench", "Kesta", "Helahona", "Ryte", "Falcia", "Umannos", "Urkensvall", "Fedra", "Bulkensar", "Comia", "Tyul", "Lasendarl"]
const races = ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Halfling", "Half-Orc", "Human", "Tiefling"]
const charClasses = ["Barbarian", "Bard", "Cleric", "Druid", "Fighter", "Monk", "Paladin", "Ranger", "Rouge", "Sorceror", "Warlock", "Wizard"]
const allignments = ["Lawful Good", "Neutral Good", "Chaotic Good", "Lawful Neutral", "True Neutral", "Chaotic Neutral", "Lawful Evil", "Neutral Evil", "Chaotic Neutral", "Unaligned"]

const getRandomTrait = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const trait = arr[randomIndex];
  return trait;
}

function randomRoll() {
  let theRoll = Array.from({length: 4}, () => Math.floor(Math.random() * 6)+1);
  theRoll.sort().shift()
  return theRoll.reduce((a, b) => a + b, 0)
}

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

//save Character //
//BROKEN??//
const saveButton = document.getElementById("save");

saveButton.addEventListener("click", (e) => {
  e.preventDefault();
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
})








function allChar() {
  //checks if there is currently an array of characters
  if (current_user.characters.length === 0) {
    console.log("if")
    alert("No characters to view.")
  } else {
    console.log("else")
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
  let allChar = document.getElementById("allChar")
  let save = document.getElementById("save")
  let ranButt = document.getElementById("ranButt")
  allChar.remove()
  save.remove()
  ranButt.remove()
}
}





