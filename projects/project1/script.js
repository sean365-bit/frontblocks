console.log("This is project 1");

fetchData();

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Could not fetch resource! :(");
    }
    const data = await response.json();
    renderDesserts(data);
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="error-message">Failed to load desserts. Please try again later.</p>`;
  }
}

const container = document.getElementById("dessertContainer");

function renderDesserts(desserts) {
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();

  desserts.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = createDessertCard(item);

    card.querySelector(".add_button").addEventListener("click", () => {
      console.log(`Added ${item.name} to cart`);
      // addToCart(item); // your cart logic
    });

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function createDessertCard(item) {
  return `
    <picture>
      <source media="(min-width: 1200px)" srcset="${item.image.desktop}" />
      <source media="(min-width: 768px)" srcset="${item.image.tablet}" />
      <img
        src="${item.image.mobile}"
        alt="Image of ${item.name}"
        class="thumbnail"
        loading="lazy"
      />
    </picture>
    <div class="dessert_info">
      <h2 class="dessert_name">${item.name}</h2>
      <p class="dessert_description">${item.category}</p>
      <p class="dessert_price">$${item.price.toFixed(2)}</p>
      <div class="add_button" role="button" tabindex="0">
        
        <img src="./assets/images/icon-add-to-cart.svg" alt="" class="cart_icon" />
      
        <div class="button_text">Add to Cart</div>
      </div>
    </div>`;
}
