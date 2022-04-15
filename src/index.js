// import "./styles.css";

import menu from "./menu.js";

const menuItems = menu.items;
let includeSpicyItems = true;

//types array contains unique item types,
//menuItems.map is returning only type property from objects
//Set return only unique elements from the array gotten from map function
const types = [...new Set(menuItems.map((item) => item.type))];

//get main element from the DOM
const main = document.getElementsByTagName("main");

function displayItems() {
  //create sections based on the types array
  types.forEach((type) => {
    const section = document.createElement("section");
    section.setAttribute("id", type);
    const h2 = document.createElement("h2");
    //first letter of type needs to be upper case and the rest lower case
    h2.innerHTML = type[0].toUpperCase() + type.substring(1).toLowerCase();

    const itemsContainer = document.createElement("div");
    itemsContainer.setAttribute("id", type + "-container");
    itemsContainer.setAttribute("class", "itemsContainer");
    section.appendChild(h2);
    section.appendChild(itemsContainer);
    main[0].appendChild(section);
  });

  //calling sorting function for each type
  types.forEach((type) => {
    sorting(type, document.getElementById(type + "-container"));
  });
}

//filter by type of item (starter, pizza or pasta)
//then sort them by menuOrder property
//then display the item
function sorting(type, container) {
  menuItems
    .filter((e) => e.type === type)
    .sort((a, b) => {
      return a.menuOrder - b.menuOrder;
    })
    .forEach((item) => {
      if (item.spicy) {
        if (includeSpicyItems) displayElement(item, container);
      } else {
        displayElement(item, container);
      }
    });
}

//function to create the item element to be displayed
function displayElement(item, container) {
  let itemDiv = document.createElement("div");
  let pName = document.createElement("p");
  let pPrice = document.createElement("p");
  pName.innerHTML = item.name;

  //Add spicy icon onlu if the spicy property is true
  if (item.spicy) {
    const spanSpicy = document.createElement("span");
    spanSpicy.setAttribute("class", "spicy");
    pName.appendChild(spanSpicy);
  }

  //format the price un US dollars
  pPrice.innerHTML = item.price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  itemDiv.setAttribute("class", "itemDiv");
  itemDiv.appendChild(pName);
  itemDiv.appendChild(pPrice);
  container.appendChild(itemDiv);
}

function filterSpicy(e) {
  includeSpicyItems = e.target.checked;

  //remove all nodes from main
  main[0].innerHTML = "";

  //display items
  displayItems();
}

displayItems();

const chkSpicy = document.getElementById("chkSpicy");
chkSpicy.addEventListener("click", (e) => filterSpicy(e));
