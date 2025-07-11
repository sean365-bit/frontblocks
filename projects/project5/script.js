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

/* menu */
const menu = document.getElementById("menu");
const closeMenu = document.getElementById("closeMenu");
const modal = document.getElementById("myModal");

function openNavBar() {
  const navMenu = document.getElementById("myTopnav");

  navMenu.className += " responsive";
  modal.classList.add("modal");
}

function closeNavBar() {
  const navMenu = document.getElementById("myTopnav");

  navMenu.className = "topnav";
  modal.classList.remove("modal");
}

menu.addEventListener("click", openNavBar);
closeMenu.addEventListener("click", closeNavBar);

/* counter */
const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
let counter = 0;
const items = document.getElementById("numberOfItems");
const addToCartBtn = document.getElementById("addToCart");

const itemsInCart = document.getElementById("itemsInCart");
const shoppingCart = document.getElementById("shoppingCart");

const decreaseseItem = function () {
  if (counter <= 0) {
    items.innerText = "0";
  } else {
    counter -= 1;
    items.innerText = counter;
  }
};

const increaseItem = function () {
  counter += 1;
  items.innerText = counter;
};

const addToCart = function () {
  const totalNumOfItems = (counter * 125).toFixed(2);

  console.log(`The total number of pairs is ${totalNumOfItems}`);

  itemsInCart.classList.add("show_items_in_cart");
  itemsInCart.innerText = counter;
};

increase.addEventListener("click", increaseItem);
decrease.addEventListener("click", decreaseseItem);
addToCartBtn.addEventListener("click", addToCart);
shoppingCart.addEventListener("click", () => {
  console.log("this is the shooping cart");
});
