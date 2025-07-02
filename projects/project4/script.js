"use strict";
console.log("This is project 4, this was developed by sean365-bit");

const toggle = document.getElementById("modeToggle");
const modeText = document.querySelector(".mode_text");

function itemsToChange() {
  const element = document.body;

  element.classList.toggle("dark_mode");
  modeText.textContent = toggle.checked ? "Dark Mode" : "Light Mode";
}

toggle.addEventListener("change", itemsToChange);
