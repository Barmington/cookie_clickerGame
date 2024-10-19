const cookieBtn = document.getElementById("cookie-btn");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const autoClicker = document.getElementById("auto_clicker");
const upgradeBtn = document.getElementById("upgr-Btn");
const upgradeContainer = document.querySelector("div");
const upgradeNameDisplay = document.getElementById("upgrade-name");
const levelTopRight = document.querySelector(".levels");
// const nextUpgrNotification = document.querySelector("nextUpgrAlert");

console.log(nextUpgrNotification);

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
let newh2 = document.createElement("h2");

upgradeBtn.addEventListener("click", () => {
  if (cookies >= upgrades[counter].cost) {
    cookies = cookies - upgrades[counter].cost;
    cps = cps + upgrades[counter].increase;
    cpsDisplay.textContent = cps;
    localStorage.setItem("cps", cps);
    localStorage.clear("cps");

    newh2.textContent = `Upgrade level (${upgrades[counter].id}) - ${upgrades[counter].name}`;
    upgradeContainer.append(newh2);
  }
  for (let i = 0; i < upgrades.length; i++) {
    levelTopRight.textContent = `(level ${counter + 1} of 10)`;
  }
  counter++;
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
