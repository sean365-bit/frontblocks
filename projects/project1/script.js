console.log("This is project 1");

fetchData();

const container = document.getElementById("dessertContainer");
const cart = [];

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error("Could not fetch resource! :(");
    }
    const data = await response.json();
    renderDesserts(data); /* */
  } catch (error) {
    console.error(error);
    container.innerHTML = `<p class="error-message">Failed to load desserts. Please try again later.</p>`;
  }
}

function renderDesserts(desserts) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  desserts.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = createDessertCard(item);

    card.querySelector(".add_button").addEventListener("click", () => {
      console.log(`Added ${item.name} to cart`);

      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      updateCartUI();
    });

    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}

function updateCartUI() {
  const cartCount = document.querySelector(".cart_count");
  const cartDetails = document.querySelector(".cart_details");
  const emptyCartText = document.querySelector(".empty_cart_p");

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // Update cart count
  cartCount.textContent = `Your Cart (${totalItems})`;

  // Clear current cart details
  cartDetails.innerHTML = "";

  if (cart.length === 0) {
    emptyCartText.style.display = "block";
    return;
  }

  emptyCartText.style.display = "none";

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart_item"); // in js
    div.innerHTML = `
    
    <div class="open">
      <div class="item_name">${item.name}</div>
      <div class="prices">
        <div class="quantity">${item.quantity}x</div>
        <div class="price">@ ${item.price.toFixed(2)}</div>
        <div class="sum_of_prices">
          $${(item.price * item.quantity).toFixed(2)}
        </div>
      </div>
    </div>
    <div class="exit">
      <img
        class="remove_icon"
        src="./assets/images/icon-remove-item.svg"
        alt="remove item"
      />
    </div>   
 
     
    `;
    cartDetails.appendChild(div);
  });

  // Add total price
  const total = document.createElement("div");
  total.classList.add("cart_total");
  total.innerHTML = `
  <div class="order">
      <div class="order_total">Order Total</div>
      <div>$${totalPrice.toFixed(2)}</div>
    </div>
    <div class="delivery_type">
      <img
        class="carbon_neutral_img"
        src="./assets/images/icon-carbon-neutral.svg"
        alt="carbon neutral image"
      />
      <div>This is a <span class="remark">carbon-neutral</span> delivery</div>
    </div>
    <button class="button">Confirm Order</button>
  `;

  cartDetails.appendChild(total);
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
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt="add to cart"
            class="cart_icon"
          />

          <div class="button_text">Add to Cart</div>
        </div>
      </div>`;
}
