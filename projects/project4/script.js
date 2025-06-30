"use strict";
console.log("This is project 4, this was developed by sean365-bit");

const toggle = document.getElementById("modeToggle");

function itemsToChange() {
  const element = document.body;
  element.classList.toggle("dark_mode");
}

toggle.addEventListener("change", itemsToChange);

// const buttonLight = document.querySelector(".slider");
/*
If you'd like the text to change from “Dark Mode” to “Light Mode” based on the current theme, update it in JS:

const modeText = document.querySelector(".mode_text");
function updateModeText(isDark) {
  modeText.textContent = isDark ? "Light Mode" : "Dark Mode";
}
*/
