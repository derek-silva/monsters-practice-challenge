// URLs
const URL = "http://localhost:3000/monsters";

// create page variable globally that indicates what page user is on
let page = 1;

// UI Elements
const monsterContainer = document.querySelector("#monster-container");
const createMonsterDiv = document.querySelector("#create-monster");
const backBTN = document.querySelector("#back");
const forwardBTN = document.querySelector("#forward");

// Event Listeners
document.addEventListener("DOMContentLoaded", getMonsters);
document.addEventListener("DOMContentLoaded", displayMonsterForm);
document.addEventListener("DOMContentLoaded", addNavListeners);

// Fetch Monster Data, Parse and then call function to display
function getMonsters() {
  fetch(URL + `/?_limit=10&_page=${page}`)
    .then(response => response.json())
    .then(monsterObjects => displayMonsters(monsterObjects));
}

// Iterate through monster objects and create HTML elements for each object
function displayMonsters(monsterObjects) {
  // every time displayMonsters is called reset div's inner html to empty string
  monsterContainer.innerHTML = "";
  monsterObjects.forEach(monsterObject => {
    let div = document.createElement("div");
    let p = document.createElement("p");

    div.innerHTML = `<h2>${monsterObject.name}</h2>
		<h4>Age: ${monsterObject.age}</h4>`;

    p.innerHTML = monsterObject.description;

    monsterContainer.appendChild(div);
    monsterContainer.appendChild(p);
  });
}

// Add Form element to create monster DIV and call function to create event listener for submit
function displayMonsterForm() {
  createMonsterDiv.innerHTML = `<form id="monster-form"><input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><button>Create</button></form>`;

  addSubmitEventListener();
}

// Adds event listener to monster form to call POST new monster object then getMonsters and displayMonsters again, then clear the form
function addSubmitEventListener() {
  const monsterForm = document.querySelector("#monster-form");

  monsterForm.addEventListener("submit", e => {
    e.preventDefault();
    postNewMonster();
    getMonsters();
    displayMonsters();
    clearForm();
  });
}

// Selects and clears form
function clearForm() {
  const monsterForm = document.querySelector("#monster-form");

  monsterForm.reset();
}

// Gets form input and returns it in an object
function getFormData() {
  let monsterName = document.querySelector("#name"),
    monsterAge = document.querySelector("#age"),
    monsterDescription = document.querySelector("#description");
  return {
    name: monsterName.value,
    age: parseFloat(monsterAge.value),
    description: monsterDescription.value
  };
}

// Send Post Request for new Monster Object
function postNewMonster() {
  fetch(URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(getFormData())
  });
}

// Add event listeners to nav buttons
function addNavListeners() {
  backBTN.addEventListener("click", pageDown);

  forwardBTN.addEventListener("click", pageUp);
}

// decreases page value if '1 < page' and makes request for new page of results else nothing
function pageDown() {
  if (1 < page) {
    page--;
    getMonsters();
  }
}

// increases page value and makes request for new page of results
function pageUp() {
  page++;
  getMonsters();
}
