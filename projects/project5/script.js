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

const quantity = document.getElementById("quantity");
const totalPrice = document.getElementById("totalUSD");
const deleteButton = document.getElementById("deleteButton");
const checkoutButton = document.getElementById("checkoutButton");

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

/*  */
const addToCart = function () {
  const totalNumOfItems = (counter * 125).toFixed(2);

  quantity.innerText = `${counter}  `;
  totalPrice.innerText = `$${totalNumOfItems}`;

  itemsInCart.classList.add("show_items_in_cart");
  itemsInCart.innerText = counter;

  hidePopup();
  console.log(`The total number of pairs is ${totalNumOfItems} || ${counter}`);
};

const showPopup = function () {
  const cart_body_p = document.querySelector(".cart_body_p");
  cart_body_p.classList.add("show_popup");

  const cartOrder = document.querySelector(".cart_oder");
  cartOrder.classList.add("hide_popup");
};

const hidePopup = function () {
  const cart_body_p = document.querySelector(".cart_body_p");
  cart_body_p.classList.remove("show_popup");

  const cartOrder = document.querySelector(".cart_oder");
  cartOrder.classList.remove("hide_popup");
};

const resetCounter = function () {
  showPopup();

  items.innerText = "0";
  counter = 0;

  itemsInCart.classList.remove("show_items_in_cart");
  itemsInCart.innerText = 0;
};

increase.addEventListener("click", increaseItem);
decrease.addEventListener("click", decreaseseItem);
addToCartBtn.addEventListener("click", addToCart);

/*  */
shoppingCart.addEventListener("click", () => {
  const cartPopup = document.getElementById("cartPopup");
  const isVisible = cartPopup.classList.contains("show");

  if (isVisible) {
    cartPopup.classList.remove("show");
  } else {
    cartPopup.classList.add("show");
  }

  console.log("this is the shopping cart");
});

checkoutButton.addEventListener("click", () => {
  console.log("order placed!!!!");
  showPopup();
});

deleteButton.addEventListener("click", resetCounter);
