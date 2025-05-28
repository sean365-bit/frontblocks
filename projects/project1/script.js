console.log("This is project 1, this was developed by sean365-bit");

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

const createDessertCard = function (item) {
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

        <div>Add to Cart</div>
      </div>
    </div>    
  `;
};

const createCartItem = function (item) {
  return `
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
};

const createCartTotal = function (totalPrice) {
  return `
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
};

const createCartConfirmation = function (item) {
  return `     
      <div class="confirmation_item">
      <img
        src="${item.image.thumbnail}"
        alt="Image of ${item.name}"
        class="thumbnail_confirm"
        loading="lazy"
      />

      <div class="confirm_details">
        <div class="item_name">${item.name}</div>

        <div class="confirm_quantity">
          <div class="quantity">${item.quantity}x</div>
          <div class="price">@ $${item.price.toFixed(2)}</div>
        </div>
      </div>
    </div>

    <div class="confirm_price">
      <div class="sum_of_prices">
        $${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>     
    `;
};

// updateCartUI Start
const updateCartUI = function () {
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

    cartDetails.innerHTML = `
    <img
      class="empty_cart_img"
      src="./assets/images/illustration-empty-cart.svg"
      alt="items in the cart"
    />
  `;
    return;
  }

  emptyCartText.style.display = "none";

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart_item");
    div.innerHTML = createCartItem(item);

    // Add click handler to remove icon
    const removeIcon = div.querySelector(".remove_icon");
    removeIcon.addEventListener("click", () => {
      // Remove this item from cart
      cart.splice(index, 1);

      // remove border
      removeBorder(item.name);
      // Refresh the cart display
      updateCartUI();
    });

    cartDetails.appendChild(div);
  });

  // Add total price
  const total = document.createElement("div");
  total.classList.add("cart_total");
  total.innerHTML = createCartTotal(totalPrice);
  cartDetails.appendChild(total);
  /* */
  const confirmButton = total.querySelector(".button");

  confirmButton.addEventListener("click", () => {
    const modalCartSummary = document.getElementById("modalCartSummary");
    modalCartSummary.innerHTML = ""; // clear previous content

    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart_item");
      itemDiv.innerHTML = createCartConfirmation(item);
      modalCartSummary.appendChild(itemDiv);
      removeBorder(item.name);
    });

    // Optionally include total
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart_total");
    totalDiv.innerHTML = `
     <div class="order">
      <div class="order_total">Order Total</div>
      <div>$${totalPrice.toFixed(2)}</div>
    </div>
  `;
    modalCartSummary.appendChild(totalDiv);

    // Show the modal
    document.getElementById("confirmationModal").style.display = "block";
  });
};
// updateCartUI end

const addToCartButton = function (button, thumbnail, item) {
  button.addEventListener("click", () => {
    console.log(`Added ${item.name} to cart`);

    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }

    // Add selected border to image
    if (thumbnail) {
      thumbnail.classList.add("thumbnail_selected");
    }

    updateCartUI();
  });
};

// start
function renderDesserts(desserts) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  desserts.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = createDessertCard(item);
    const button = card.querySelector(".add_button");
    const thumbnail = card.querySelector(".thumbnail");

    addToCartButton(button, thumbnail, item);
    fragment.appendChild(card);
  });

  container.appendChild(fragment);
}
// end

function removeBorder(tobeDeleted) {
  const allDessertCards = document.querySelectorAll(".box");

  allDessertCards.forEach((card) => {
    const nameEl = card.querySelector(".dessert_name");
    const thumbnail = card.querySelector(".thumbnail");

    if (nameEl && nameEl.textContent === tobeDeleted && thumbnail) {
      thumbnail.classList.remove("thumbnail_selected");
    }
  });
}

document.getElementById("newOrderButton").addEventListener("click", () => {
  cart.length = 0;
  updateCartUI();
  document.getElementById("confirmationModal").style.display = "none";
  window.scrollTo({ top: 0, behavior: "smooth" });
});
