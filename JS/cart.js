/*///////////////////////////////////////////////////////////
  FETCHING PRODUCTS
///////////////////////////////////////////////////////////*/

const fetchingProducts = "../JS/data/products.json"

/*///////////////////////////////////////////////////////////
  ARRAYS TO STORE PRODUCTS AND CART ITEMS
///////////////////////////////////////////////////////////*/
let listProducts = [];
let carts = [];

/*///////////////////////////////////////////////////////////
  EVENT LISTENERS FOR THE CART MODAL
///////////////////////////////////////////////////////////*/

// Opens the cart modal
openCartModal.addEventListener("click", () => {
  cartModal.classList.add("active");
  cartModalContentContainer.classList.add("active");
});

// Closes the cart modal
closeCartModal.addEventListener("click", () => {
  cartModal.classList.remove("active");
  cartModalContentContainer.classList.remove("active");
});

// Continues shopping
continueShopping.addEventListener("click", () => {
  cartModal.classList.remove("active");
  cartModalContentContainer.classList.remove("active");
});

// Resets when user presses on buy right after checkout
// Uncomment purchase button is implemented
// purchase.addEventListener("click", () => {
//   localStorage.removeItem("cart");
//   carts = [];
//   addCartToHTML();
// });

/*///////////////////////////////////////////////////////////
  INITIALIZATION FUNCTION
///////////////////////////////////////////////////////////*/
/*
  This function initializes the app
  Steps:
  - Fetch the products from the JSON file
  - Add the products to the listProducts array
  - Call the addDataToHTML function to display the products
  - Check if there are any saved cart items in localStorage
  - If there are, parse them and add them to the carts array
  - Call the addCartToHTML function to display the cart items
*/

const initApp = async () => {
  try {
    const response = await fetch(fetchingProducts);
    const data = await response.json();
    listProducts = data;

    addDataToHTML();

    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      carts = JSON.parse(savedCart);
      addCartToHTML();
    }
  } catch (err) {
    console.log(err);
  }
};
initApp();

/*///////////////////////////////////////////////////////////
  FUNCTIONS TO ADD DATA TO THE HTML DOCUMENT
///////////////////////////////////////////////////////////*/

/*
  This event listener adds a product to the cart when the user clicks the "Add to Cart" button
  Steps:
  - Get the position of the click
  - Check if the clicked element has the "addToCart" class
  - Get the product ID from the parent element's dataset
  - Call the addToCart function with the product ID
*/
listProductsContainer.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("addToCart")) {
    let productId = positionClick.parentElement.dataset.id;
    addToCart(productId);
  }
});

/*
  This function adds product cards to the HTML document
  Steps:
  - Clear the container's current content
  - Loop through each product in the array
  - Create a new div element for each product
  - Add 'product' class to the div
  - Insert HTML template with product details
  - Add the completed product card to the container
*/
const addDataToHTML = () => {
  // Clear the container's current content
  listProductsContainer.innerHTML = "";

  // Only proceed if there are products in the array
  if (listProducts.length > 0) {
    // Loop through each product in the array
    listProducts.forEach((product) => {
      // Create a new div element for each product
      const productCard = document.createElement("div");
      // Add 'product' class to the div
      productCard.classList.add("product");
      // Insert HTML template with product details
      productCard.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <div class="product-info" data-id="${product.id}">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
              <p class="product-price">$${product.price}</p>
              <button class="addToCart">Add to Cart</button>
            </div>
      `;
      // Add the completed product card to the container
      listProductsContainer.appendChild(productCard);
    });
  }
};

/*///////////////////////////////////////////////////////////
  FUNCTIONS TO ADD ITEMS TO THE CART
///////////////////////////////////////////////////////////*/

/*
  This function adds a product to the cart
  Steps:
  - Find the position of the product in the carts array
  - If the product is not in the cart, add it with a quantity of 1
  - If the product is already in the cart, increment its quantity
  - Update localStorage with the new cart state
  - Call the addCartToHTML function to update the cart display
*/
const addToCart = (productId) => {
  let positionProduct = carts.findIndex(
    (value) => value.productId == productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        productId: productId,
        quantity: 1,
      },
    ];
  } else if (positionProduct < 0) {
    carts.push({
      productId: productId,
      quantity: 1,
    });
  } else {
    carts[positionProduct].quantity += 1;
  }
  localStorage.setItem("cart", JSON.stringify(carts));

  addCartToHTML();
};

/*
  This function adds the cart items to the HTML document
  Steps:
  - Clear the container's current content
  - Initialize total quantity and price variables
  - Check if there are any cart items
  - If there are, update the cart modal footer and display the cart items
  - Loop through each cart item
  - Create a new div element for each cart item
  - Add 'cart-item' class to the div
  - Insert HTML template with cart item details
  - Add the completed cart item to the container
*/
const addCartToHTML = () => {
  cartItemsContainer.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;
  if (carts.length > 0) {
    cartModalFooter.classList.add("active");
    nothingInCart.classList.add("removed");
    userCartMain.classList.remove("no-items");
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;

      // Create a new cart item
      let newCartItem = document.createElement("div");
      newCartItem.classList.add("cart-item");
      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );
      let info = listProducts[positionProduct];
      totalPrice += cart.quantity * info.price;

      // Insert HTML template with cart item details
      newCartItem.innerHTML = `
            <div class="cart-item-info">
              <figure>
                <img src="${info.img}" alt="${info.name}">
              </figure>
              <div class="cart-item-info-text">
                <h3>${info.name}</h3>
                <div class="cart-item-quantity-price">
                <p class="cart-item-price">$${(info.price * cart.quantity).toFixed(2)}</p>
                  <p class="cart-item-quantity-count remove-cart-view">Quantity: ${cart.quantity}</p>
                </div>
                <button class="remove-cart-item" data-id="${info.id}">Remove</button>
              </div>
            </div>
            <div class="cart-item-quantity">
              <button class="increase-cart-item-quantity">+</button>
              <p class="cart-item-quantity-count">${cart.quantity}</p>
              <button class="decrease-cart-item-quantity">-</button>
            </div>
      `;
      cartItemsContainer.appendChild(newCartItem);
    });
  } else {
    cartModalFooter.classList.remove("active");
    nothingInCart.classList.remove("removed");
    userCartMain.classList.add("no-items");
  }
  cartCount.textContent = totalQuantity;
  cartTotalItems.textContent = `${totalQuantity} items`;
  cartTotalPrice.innerHTML = `Total: <span>$${totalPrice.toFixed(2)}</span>`;
};

/*///////////////////////////////////////////////////////////
  FUNCTIONS TO REMOVE ITEMS FROM THE CART
///////////////////////////////////////////////////////////*/

/*
  This event listener removes an item from the cart
*/
cartItemsContainer.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (positionClick.classList.contains("remove-cart-item")) {
    let productId = positionClick.dataset.id;
    removeFromCart(productId);
  }
  
  // Handle decrease quantity button
  if (positionClick.classList.contains("decrease-cart-item-quantity")) {
    let productId = positionClick.closest(".cart-item").querySelector(".remove-cart-item").dataset.id;
    changeQuantity(productId, "decrease");
  }
  
  // Handle increase quantity button
  if (positionClick.classList.contains("increase-cart-item-quantity")) {
    let productId = positionClick.closest(".cart-item").querySelector(".remove-cart-item").dataset.id;
    changeQuantity(productId, "increase");
  }
});

/*
  This function removes an item from the cart
  Steps:
  - Find the position of the product in the carts array
  - If the product is found, remove it from the cart array
  - Update localStorage with the new cart state
  - Call the addCartToHTML function to update the cart display
*/
const removeFromCart = (productId) => {
  let positionProduct = carts.findIndex(
    (value) => value.productId == productId
  );
  if (positionProduct >= 0) {
    carts.splice(positionProduct, 1); // Remove the product from the cart array
    localStorage.setItem("cart", JSON.stringify(carts)); // Update localStorage
    addCartToHTML(); // Re-render the cart items
  }
};

/*///////////////////////////////////////////////////////////
  FUNCTIONS TO UPDATE CART ITEM QUANTITIES
///////////////////////////////////////////////////////////*/

// Add this new function to handle quantity changes
const changeQuantity = (productId, action) => {
  let positionProduct = carts.findIndex(
    (value) => value.productId == productId
  );
  
  if (positionProduct >= 0) {
    switch(action) {
      case "decrease":
        if (carts[positionProduct].quantity > 1) {
          carts[positionProduct].quantity -= 1;
        } else {
          carts.splice(positionProduct, 1); // Remove item if quantity would be 0
        }
        break;
      case "increase":
        carts[positionProduct].quantity += 1;
        break;
    }
    
    localStorage.setItem("cart", JSON.stringify(carts));
    addCartToHTML();
  }
};

/*///////////////////////////////////////////////////////////
 ADD EVENT LISTENER FOR COUNTRY AND STATE DROPDOWNS
///////////////////////////////////////////////////////////*/
// Define the country-to-states mapping
const countryStates = {
  US: [
      "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
      "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
      "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
      "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
      "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
      "New Hampshire", "New Jersey", "New Mexico", "New York", 
      "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
      "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
      "Tennessee", "Texas", "Utah", "Vermont", "Virginia", 
      "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  CA: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick", 
      "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", 
      "Quebec", "Saskatchewan", "Northwest Territories", "Nunavut", "Yukon"
  ]
};


// Add an event listener to the country dropdown
document.getElementById('country').addEventListener('change', function () {
  const selectedCountry = this.value; // Get the selected country
  const stateSelect = document.getElementById('state'); // Get the state dropdown
  
  // Clear the existing state options
  stateSelect.innerHTML = '<option value="">Select State</option>';
  
  // Get the states for the selected country
  const states = countryStates[selectedCountry];
  
  if (states) {
      // Populate the state dropdown with new options
      states.forEach(state => {
          const option = document.createElement('option');
          option.value = state;
          option.textContent = state;
          stateSelect.appendChild(option);
      });
      stateSelect.disabled = false; // Enable the dropdown if there are states
  } else {
      // Disable the dropdown if no states are available for the country
      stateSelect.disabled = true;
  }
});

/*///////////////////////////////////////////////////////////
 FORM VALIDATION FOR CUSTOMER INFO AND PAYMENT INFO
///////////////////////////////////////////////////////////*/

document.getElementById('checkoutForm').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission until validation is done

  let isValid = true;

  // Get form fields
  const email = document.getElementById('email');
  const phone = document.getElementById('phone');
  const fullName = document.getElementById('fullName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const country = document.getElementById('country');
  const state = document.getElementById('state');
  const zipCode = document.getElementById('zipCode');
  const cardName = document.getElementById('cardName');
  const cardNumber = document.getElementById('cardNumber');
  const expiry = document.getElementById('expiry');
  const cvv = document.getElementById('cvv');

  /*///////////////////////////////////////////////////////////
    FUNCTIONS TO VALIDATE FIELDS
  ///////////////////////////////////////////////////////////*/

  /* Utility function to validate fields
  
  */
  const validateField = (field, condition, errorMessage) => {
    // Look for an existing error span within the parent element
    let error = field.nextElementSibling && field.nextElementSibling.classList.contains('error-message')
        ? field.nextElementSibling
        : null;

    if (condition) {
        // If the field is valid, remove error styles and clear the error message
        field.classList.remove('error');
        if (error) error.remove(); // Remove the error span if it exists
    } else {
        // If the field is invalid, apply error styles
        field.classList.add('error');

        // If no error span exists, create one
        if (!error) {
            error = document.createElement('span'); // Create new span
            error.className = 'error-message';      // Add class for styling
            error.textContent = errorMessage;      // Set the error message
            field.insertAdjacentElement('afterend', error); // Insert after the field
        } else {
            // Update the error message if span exists
            error.textContent = errorMessage;
        }
        isValid = false; // Mark the form as invalid
    }
};


  // Email validation
  validateField(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value), 'Please enter a valid email address.');

  // Phone number validation (basic US format)
  validateField(phone, /^\d{10}$/.test(phone.value.replace(/[^\d]/g, '')), 'Please enter a valid 10-digit phone number.');

  // Full name validation
  validateField(fullName, fullName.value.trim() !== '', 'Full name is required.');

  // Address validation
  validateField(address, address.value.trim() !== '', 'Street address is required.');

  // City validation
  validateField(city, city.value.trim() !== '', 'City is required.');

  // Country validation
  validateField(country, country.value !== '', 'Please select a country.');

  // Province/State validation
  validateField(state, state.value !== '', 'Please select a province/state.');

  // Postal code validation
  validateField(zipCode, /^((\d{5}-\d{4})|(\d{5})|([A-Z|a-z]\d[A-Z|a-z]\d[A-Z|a-z]\d))$/.test(zipCode.value), 'Please enter a valid Canadian or US postal code.');

  // Card name validation
  validateField(cardName, cardName.value.trim() !== '', 'Name on card is required.');

  // Card number validation (basic Luhn algorithm check)
  const luhnCheck = (num) => {
      let sum = 0, alternate = false;
      for (let i = num.length - 1; i >= 0; i--) {
          let n = parseInt(num[i], 10);
          if (alternate) {
              n *= 2;
              if (n > 9) n -= 9;
          }
          sum += n;
          alternate = !alternate;
      }
      return sum % 10 === 0;
  };
  validateField(cardNumber, luhnCheck(cardNumber.value.replace(/\s+/g, '')), 'Please enter a valid card number.');

  // Expiry date validation (MM/YY format)
  const expiryMatch = expiry.value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/);
  validateField(expiry, expiryMatch, 'Please enter a valid expiry date (MM/YY).');
  if (expiryMatch) {
      const [_, month, year] = expiryMatch;
      const expiryDate = new Date(`20${year}`, month - 1);
      const currentDate = new Date();
      validateField(expiry, expiryDate > currentDate, 'Card expiry date must be in the future.');
  }

  // CVV validation (3 or 4 digits)
  validateField(cvv, /^\d{3,4}$/.test(cvv.value), 'Please enter a valid CVV.');

  // If all fields are valid, allow form submission
  if (isValid) {
      alert('Form submitted successfully!');
      this.submit();
  }
});
