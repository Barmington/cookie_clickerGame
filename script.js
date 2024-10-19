const cookieBtn = document.getElementById("cookie-btn");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const autoClicker = document.getElementById("auto_clicker");
const upgradeBtn = document.getElementById("upgr-Btn");
const upgradeContainer = document.querySelector("div");
const upgradeNameDisplay = document.getElementById("upgrade-name");
const levelTopRight = document.querySelector(".levels");

let cookies = Number(localStorage.getItem("cookies")) || 0;
let cps = Number(localStorage.getItem("cps"));
let counter = 0;
let upgrades;
//Fetch api
async function fetchData() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  upgrades = await response.json();
}

let intervalId = setInterval(function () {
  for (let i = 0; i < upgrades.length; i++) {
    if (counter < upgrades.length) {
      cookies = cookies + cps;
      cookieDisplay.textContent = cookies;
    } else {
      clearInterval(intervalId);
    }
  }
}, 100);

cookieBtn.addEventListener("click", () => {
  cookies++;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies);
  localStorage.clear("cookies");
});

const newBtn = document.createElement("button");

upgradeBtn.addEventListener("click", () => {
  if (cookies >= upgrades[counter].cost) {
    cookies = cookies - upgrades[counter].cost;
    cps = cps + upgrades[counter].increase;
    cpsDisplay.textContent = cps;
    localStorage.setItem("cps", cps);
    localStorage.clear("cps");

    let newh2 = document.createElement("h2");
    newh2.textContent += `${upgrades[counter].name}: costs ${upgrades[counter].cost}`;
    upgradeContainer.append(newh2);

    counter++;
  }
});

// newBtn.addEventListener("click", () => {
//   if (cookies >= upgrades[counter].cost) {
//     cookies = cookies - upgrades[counter].cost;
//     cps = cps + upgrades[counter].increase;

//     cpsDisplay.textContent = cps;
//     newh2 = document.createElement("h2");
//     newh2.textContent += `${upgrades[counter].name}: costs ${upgrades[counter].cost} cookies, click the button below to buy.`;
//     upgradeContainer.append(newh2);
//     upgradeContainer.append(newBtn);

//     counter++;
//   }
// });

fetchData();
