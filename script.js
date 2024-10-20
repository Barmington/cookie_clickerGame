const cookieBtn = document.getElementById("cookie-btn");
const main = document.querySelector(".main-container");
const cookieDisplay = document.getElementById("cookie-display");
const cpsDisplay = document.getElementById("cps-display");
const upgradeBtn = document.getElementById("upgr-Btn");
const upgradeContainer = document.querySelector(".grid-container");
const upgradeNameDisplay = document.getElementById("upgrade-name");
const levelTopRight = document.querySelector(".levels");
const topLevel = document.querySelector(".item36");
const hideBtn = document.querySelector("hideBtn");
const hideCookiesTest = document.querySelector(".hideP");
const newBtn = document.createElement("button");
let newh2 = document.createElement("h2");

let cookies = Number(localStorage.getItem("cookies")) || 0;
let cps = Number(localStorage.getItem("cps"));
let counter = 0;
let upgrades;

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
      newh2.textContent = `Wohoo! You made it to the top 🎉!`;
      topLevel.append(newh2);
      upgradeBtn.classList.add("hide");
      main.style.backgroundImage =
        "linear-gradient(to top left, #753682 0%, #bf2e34 100%)";
      main.style.color = "white";

      clearInterval(intervalId);
    }
  }
}, 1000);

cookieBtn.addEventListener("click", () => {
  cookies++;
  cookieDisplay.textContent = cookies;
  localStorage.setItem("cookies", cookies);
});

upgradeBtn.addEventListener("click", () => {
  if (cookies >= upgrades[counter].cost) {
    cookies = cookies - upgrades[counter].cost;
    cps = cps + upgrades[counter].increase;
    cpsDisplay.textContent = cps;
    localStorage.setItem("cps", cps);
    newh2.textContent = `Upgrade level (${upgrades[counter].id}) - ${upgrades[counter].name}`;
    upgradeNameDisplay.textContent = newh2.innerHTML;
  }

  for (let i = 0; i < upgrades.length; i++) {
    levelTopRight.textContent = `(level ${counter + 1} of 10)`;
  }

  counter++;
});

fetchData();
