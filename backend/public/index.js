
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

// sign in process //

class User {
  constructor(name, password) {
    this.name = name
    this.password = password
  }
}

let myHeaders = new Headers();
const signUpButton = document.getElementById("signup-form-submit"); 

signUpButton.addEventListener("click", (e) => {
  e.preventDefault();
  const loginForm = document.getElementById("sign-up-form");    
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  //let user = new User(username, password)

  const data = {
    username: username,
    password: password,
  }

  fetch("http://locaLhost:3000/signup", { 
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  }).then(response => {
    console.log("look at me", response);
  })
  
  /*if (username === "user" && password === "web_dev") {
      alert("You have successfully logged in.");
      location.reload();
  } else {
      console.log("tell me why")
  }*/
})

