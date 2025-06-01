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

const getData = function (titles) {
  console.log(titles);
};

fetchData();
