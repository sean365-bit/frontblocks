"use strict";
console.log("This is project 5, this was developed by sean365-bit");

function initSlideshow({ slidesSelector, prevBtnId, nextBtnId }) {
  const slides = document.getElementsByClassName(slidesSelector);
  const previous = document.getElementById(prevBtnId);
  const next = document.getElementById(nextBtnId);

  let slideIndex = 1;

  function showSlides(n) {
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length;

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    // Show the current slide
    slides[slideIndex - 1].style.display = "block";
  }

  function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
  }

  // Initial render
  showSlides(slideIndex);

  // Event listeners (with correct callbacks)
  previous.addEventListener("click", () => changeSlide(-1));
  next.addEventListener("click", () => changeSlide(1));
}

document.addEventListener("DOMContentLoaded", () => {
  initSlideshow({
    slidesSelector: "mySlides",
    prevBtnId: "previous",
    nextBtnId: "next",
  });
});

/* mine */
// navMenu

const menu = document.getElementById("menu");

function myFunction() {
  const navMenu = document.getElementById("myTopnav");

  if (navMenu.className === "topnav") {
    navMenu.className += " responsive";
  } else {
    navMenu.className = "topnav";
  }
}

menu.addEventListener("click", myFunction);
