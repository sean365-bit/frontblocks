"use strict";
console.log("This is project 2, this was developed by sean365-bit");

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".dice");
  const idText = document.querySelector(".advice_number");
  const adviceText = document.querySelector(".advice_text");
  let isFetching = false;

  const displayAdvice = function (id, advice) {
    idText.textContent = `advice #${id}`;
    adviceText.textContent = advice;
  };

  const fetchData = async function () {
    if (isFetching) return;
    isFetching = true;

    try {
      const randomNumber = Math.floor(Math.random() * 200) + 1;
      const response = await fetch(
        `https://api.adviceslip.com/advice/${randomNumber}`
      );

      if (!response.ok) {
        throw new Error("Could not fetch resource! :(");
      }

      const data = await response.json();
      displayAdvice(data.slip.id, data.slip.advice);
    } catch (error) {
      console.error(error);
      displayAdvice("Error", "Something went wrong. Please try again.");
    } finally {
      isFetching = false;
    }
  };

  button.addEventListener("click", fetchData);
  fetchData();
});
