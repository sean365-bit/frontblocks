console.log("This is project 2, this was developed by sean365-bit");

const fetchData = async function () {
  try {
    let randomNumber = Math.floor(Math.random() * 200) + 1;
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
  }
};

const displayAdvice = function (id, advice) {
  const idText = document.querySelector(".advice_number");
  const adviceText = document.querySelector(".advice_text");

  idText.innerHTML = `advice #${id}`;
  adviceText.innerHTML = advice;
};

const button = document.querySelector(".dice");
button.addEventListener("click", () => {
  fetchData();
});

fetchData();
