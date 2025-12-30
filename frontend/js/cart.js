// ===============================
// LOAD CART FROM LOCAL STORAGE
// ===============================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===============================
// ADD PRODUCT TO CART
// ===============================
function addToCart(id, name, price, image) {
  const product = { id, name, price, image, qty: 1 };

  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart 🛒");
}

// ===============================
// DISPLAY CART ITEMS
// ===============================
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" width="80">
        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price} × ${item.qty}</p>
          <button onclick="removeItem(${index})">Remove</button>
        </div>
      </div>
    `;
  });

  totalPrice.textContent = total;
}

// ===============================
// REMOVE ITEM
// ===============================
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// ===============================
// PLACE ORDER
// ===============================
function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty ❌");
    return;
  }

  alert("Order placed successfully ✅");
  localStorage.removeItem("cart");
  window.location.href = "products.html";
}

// ===============================
// AUTO LOAD CART
// ===============================
document.addEventListener("DOMContentLoaded", displayCart);
