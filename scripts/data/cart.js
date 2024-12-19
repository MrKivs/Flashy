let cart = JSON.parse(localStorage.getItem("cart")) || [];

// if cart is non-existent in the local storage it will be assigned to an empty array //

export default cart;
