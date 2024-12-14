// Lista av produkter och deras information.
const listItems = [
  {
  "name": "Rule",
 "text": "SEK 15 per m",
 "description": "45mm * 45mm",
 "price": 15
 },
 {
 "name": "Screw",
 "text": "SEK 150 per pack",
 "description": "Tall screw, torx",
 "price": 150
 },
 {
 "name": "Hole plate",
 "text": " SEK 8 per piece",
 "description": "To splice bars together",
 "price": 8
 }
];


//objekt som vi kan komma åt i resten av dokumentet.
let shoppingList = {};
//visar upp nyckelpar för shoppingList
function initShoppingList() {
// för var produkt skapar  en nyckel med produktens namn.
  for (let listItem of listItems) {
      shoppingList[listItem.name] = 0; //ger värdet 0
  }
}

function renderShoppingList() {
  let tbody = document.querySelector("#shoppingList > tbody");
  tbody.innerHTML = "";
  for (let listItem of listItems) {
      let row = tbody.insertRow(-1);
      let cellName = row.insertCell(-1);
      let cellAntal = row.insertCell(-1);
      let cellPrice = row.insertCell(-1);
      let antal = shoppingList[listItem.name];
      cellName.textContent = listItem.name;
      cellAntal.textContent = antal;
      cellPrice.textContent = antal * listItem.price;
  }
}
 //funktion för plus knapp
function increment(name) { // Ökar antalet av viss produkt när man trycker på plus kanppen och uppdaterar shoppinglistan.

  shoppingList[name]++;
  renderShoppingList();
}
//funktion för minus knapp 
function decrement(name) {  // Ökar antalet av viss produkt när man trycker på minus kanppen och uppdaterar shoppinglistan.
  shoppingList[name]--;
  renderShoppingList();
}


//Ger all produkt information.
function  renderItems() {
// Template för  produkter med placeholders för nyckelpar värden.
  const template = `
      <img>
      <div class="p-2">
          <div>
              <span class="name"></span>
              <span class="plus float-end" title="Lägg till i listan">
              <i class="bi-plus-square-fill" aria-hidden="true"></i></span>
              <span class="minus float-end" title="Ta bort">
              <i class="bi-dash-square-fill" aria-hidden="true"></i></span>
              
          </div>
          <div class="text"></div>
          <div class="description"></div>
      </div>
  `;


    // Hämtar div genom id där produkterna ska matas in.
  const container = document.querySelector("#listItems");
  for (let listItem of listItems) {
      let item = document.createElement("div"); // Skapar en div.
      item.classList.add("item"); // Ger div class "item".

      //template texten i div.
      item.innerHTML = template;
      item.querySelector(".name").textContent = listItem.name; //namne på objekt
      item.querySelector(".text").textContent = listItem.text; // visar "text" 
      item.querySelector(".description").textContent = listItem.description; //visar ut description text
      // Sätter till event listener så vi kan kallar på funktioner när plus och minus knapp trycks.
      item.querySelector(".plus").addEventListener("click", () => increment(listItem.name)); //knapp till plus klicken
      item.querySelector(".minus").addEventListener("click", () => decrement(listItem.name)); // knapp till minus klicken
      // Ger produktinformation till container.
      container.appendChild(item);
  }
}


// Här beräknar den totala kostnaden och antalet produkter.
function countTotal() {
  // Sparar antalen av produkter från shoppingList i en array.
  let itemAmounts = Object.values(shoppingList);
 
  // Summerar alla antalen till en total summa och sparar det i en variabel.
  let itemAmountsTotal = itemAmounts.reduce((a, b) => a + b, 0);

  // Deklarerar variabel för totala priset.
  let totalPrice = 0;

  // Vi tar priset för var produkt och multiplicerar det med antalet. 
  for (i = 0; i < listItems.length; i++){
    totalPrice += listItems[i].price * itemAmounts[i];
  }

  // Hämtar id elementet där beräkningen ska skrivas till användaren och sparar i variabel.
  let test = document.querySelector("#klick");
  
  // texten som kommer upp till användaren.
  test.textContent = "You have put " + " " + itemAmountsTotal + " " 
  + "products in the list and the total price is" + " " + totalPrice + " " + "kr";
}

 // funktioner
window.onload = function() {    
  renderItems();   
  initShoppingList();
  renderShoppingList();
}