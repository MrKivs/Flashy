import products from "./data/product.js";
import cart from "./data/cart.js";

hydrateProducts(products);

function addToCart(productId, quantity = 1) {
  const product = products.find((product) => product.id === productId);
  if (product) {
    const existingProduct = cart.find((item) => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

const buttons = document.querySelectorAll("[data-id]");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.id;
    addToCart(productId);
  });
});
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <img src=${product.image} alt="${product.name} Image" />
    <h3>${product.name}</h3>
    <p>${product.price}</p>
    <p style="
  font-size: 18px;
  color: #ffcc00;
  margin: 5px 0;
">${generateStars(product.rating)}</p>
    <button class="btn-buy" data-id="${product.id}">Add to cart</button>`;

  return card;
}

function hydrateProducts(products) {
  const container = document.getElementById("product-container");
  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

function generateStars(rating, maxStars = 5) {
  let starsHTML = "";
  for (let i = 1; i <= maxStars; i++) {
    if (i <= rating) {
      starsHTML += "&#9733;";
    } else {
      starsHTML += "&#9734;";
    }
  }
  return starsHTML;
}
