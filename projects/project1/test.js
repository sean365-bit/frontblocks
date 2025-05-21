function renderDesserts(desserts) {
  container.innerHTML = "";
  const fragment = document.createDocumentFragment();

  desserts.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = createDessertCard(item);

    const addButton = card.querySelector(".add_button");
    const quantityControls = card.querySelector(".quantity_controls");
    const quantityDisplay = card.querySelector(".quantity_display");
    const increaseBtn = card.querySelector(".increase_btn");
    const decreaseBtn = card.querySelector(".decrease_btn");

    addButton.addEventListener("click", () => {
      console.log(`Added ${item.name} to cart`);

      const existingItem = cart.find((cartItem) => cartItem.name === item.name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      // Update UI
      addButton.style.display = "none";
      quantityControls.style.display = "flex";
      quantityDisplay.textContent = existingItem ? existingItem.quantity : 1;

      updateCartUI();
    });

    increaseBtn.addEventListener("click", () => {
      const cartItem = cart.find((cartItem) => cartItem.name === item.name);
      if (cartItem) {
        cartItem.quantity += 1;
        quantityDisplay.textContent = cartItem.quantity;
        updateCartUI();
      }
    });

    decreaseBtn.addEventListener("click", () => {
      const cartItem = cart.find((cartItem) => cartItem.name === item.name);
      if (cartItem) {
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
          // Remove from cart
          cart = cart.filter((ci) => ci.name !== item.name);
          quantityControls.style.display = "none";
          addButton.style.display = "flex";
        } else {
          quantityDisplay.textContent = cartItem.quantity;
        }
        updateCartUI();
      }
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

        <!-- Add to Cart Button -->
        <div class="add_button" role="button" tabindex="0">
          <img
            src="./assets/images/icon-add-to-cart.svg"
            alt="add to cart"
            class="cart_icon"
          />
          <div class="button_text">Add to Cart</div>
        </div>

        <!-- Quantity Controller (initially hidden) -->
        <div class="quantity_controls" style="display: none;">
          <button class="decrease_btn">-</button>
          <span class="quantity_display">1</span>
          <button class="increase_btn">+</button>
        </div>
    </div>`;
}
