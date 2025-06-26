"use strict";
console.log("This is project 4, this was developed by sean365-bit");

const toggleButton = document.getElementById("toggleButton");

// Initialize mode based on localStorage
function initializeMode() {
  const darkModeEnabled = localStorage.getItem("darkMode") === "false";
  if (darkModeEnabled) {
    document.body.classList.add("dark-mode");
    toggleButton.innerHTML = "☀️ Enable Light Mode";
  } else {
    toggleButton.innerHTML = "🌙 Enable Dark Mode";
  }
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");

  // Update button text and icon
  toggleButton.innerHTML = isDarkMode
    ? "☀️ Enable Light Mode"
    : "🌙 Enable Dark Mode";

  localStorage.setItem("darkMode", isDarkMode);
}

initializeMode();
