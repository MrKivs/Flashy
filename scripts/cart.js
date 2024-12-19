import cart from "./data/cart.js";
import products from "./data/product.js";
import formatCurrency from "./utils/formatCurrency.js";

updateCartUI();

function saveToLocalStorage(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}
function deleteFromCart(id) {
  console.log(id);
  let newCart = cart.filter((item) => item.id !== id);
  saveToLocalStorage(newCart);
  updateCartUI();
}
function updateLocalStorage() {}
const buttons = document.querySelectorAll("[data-item]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.item;
    deleteFromCart(productId);
  });
});
function updateCartUI() {
  console.log("called");
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("cart-total");
  const emptyMessage = document.getElementById("empty-message");

  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    emptyMessage.style.display = "block";
    totalContainer.textContent = "0.00";
    return;
  }
  emptyMessage.style.display = "none";

  let total = 0; 
  cart.forEach((item) => {
    const cartItem = document.createElement("li");
    cartItem.className = "cart-item";

    cartItem.innerHTML = `
    <div> 
    <span>${item.name} - ${formatCurrency(item.price)} x ${item.quantity}
    </span>
    </div>
    <div>
      <button class="update">+</button>
      <button class="update">-</button>
      <button class="remove" data-item="${item.id}">Remove</button>
    </div>
      `;
    cartContainer.appendChild(cartItem);
    cartItem.querySelector(".remove").addEventListener("click", () => {
      deleteFromCart(item.id);
    });
    total += item.price * item.quantity;
  });

  totalContainer.textContent = `${formatCurrency(total)}`;
}
