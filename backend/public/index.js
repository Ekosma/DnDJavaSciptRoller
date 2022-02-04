
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
  }).then(response => {
    console.log("save", response);
  })
})


// sign in, sign up, sign out process //

let myHeaders = new Headers();
const signUpButton = document.getElementById("signup-form-submit"); 
const logInButton = document.getElementById("login-form-submit"); 


signUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  const loginForm = document.getElementById("sign-up-form");    
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  const data = {
    username: username,
    password: password,
  }

  fetch("http://locaLhost:3000/new", { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  }).then(response => {
    console.log("sign up form", response);
  })
})

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
  current_user = new userData(data)
  });
})

class userData{
  constructor(data) {
    this.name = data.user.username
    this.id = data.user.id
  }
}

//routing to char_sheets//

const nextButton = document.getElementById("next");

nextButton.addEventListener("click", (e) => {
  e.preventDefault();
  let data = 
  fetch("http://locaLhost:3000/characters", { 
    method: "GET",
  }).then(response => {
    console.log("next", response);
  })
})

displayCharacter = () => {

}