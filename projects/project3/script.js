"use strict";
console.log("This is project 3, this was developed by sean365-bit");

const fetchData = async function () {
  try {
    const response = await fetch("./data.json");

    if (!response.ok) {
      throw new Error("Could not fetch resource! :(");
    }

    const data = await response.json();
    getData(data);
  } catch (error) {
    console.error(error);
  }
};

// onWeek
const renderData = (data, period, label) => {
  const cards = document.querySelectorAll(".card");

  data.forEach((item, index) => {
    if (cards[index]) {
      cards[index].innerHTML = `
      <div class="current">
        <div class="title">${item.title}</div>
        <div class="current_period">${item.timeframes[period].current} hrs</div>
      </div>

      <div class="previous">
        <img
          src="./assets/icon-ellipsis.svg"
          alt="ellipsis icon"
          class="ellipsis"
        />
        <div class="previous_period">${label} - ${item.timeframes[period].previous} hrs</div>
      </div>      
      `;
    }
  });
};

const onDay = (data) => renderData(data, "daily", "Yesterday");
const onWeek = (data) => renderData(data, "weekly", "Last Week");
const onMonth = (data) => renderData(data, "monthly", "Last Month");

const getData = (data) => {
  const daily = document.getElementById("daily");
  const weekly = document.getElementById("weekly");
  const monthly = document.getElementById("monthly");

  const addClickListener = (element, callback) => {
    if (element) {
      element.addEventListener("click", callback);
    }
  };

  addClickListener(daily, () => onDay(data));
  addClickListener(weekly, () => onWeek(data));
  addClickListener(monthly, () => onMonth(data));

  // Default view: Weekly
  onWeek(data);
};

// Select all the period selection elements
const periodSelections = document.querySelectorAll(".period_selection");

periodSelections.forEach((selection) => {
  selection.addEventListener("click", () => {
    // Remove 'active' class from all selections
    periodSelections.forEach((item) => item.classList.remove("active"));

    // Add 'active' class to the clicked element
    selection.classList.add("active");
  });
});

fetchData();
