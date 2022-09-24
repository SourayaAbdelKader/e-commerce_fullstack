const checkout_submit = document.getElementById("checkout-submit");
const apply_voucher = document.getElementById("voucher-submit");
const voucher_code = document.getElementById("voucher-input");
const cart_total_price = document.getElementById("cart-total");
const cart_container = document.getElementById("cart-items");

// START OF EVENT LISTENERS FOR EACH ITEM IN CART
//  remove the whole item/product from the cart/ when X button is clicked:
const removeItem = (e) => {
  const item_id = e.target.parentNode.children[0].value;
  const quantity = -1; //when API receive -1 => it is handled to remove the whole item
  console.log(item_id, quantity);
};
// decrement quantity of single item and update DB
const decrementItemQuantity = (e) => {
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.nextSibling.textContent;
  const price_per_item = e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price =
    e.target.parentNode.parentNode.parentNode.children[6].textContent;
  console.log(item_id, quantity, price_per_item, total_price);
};
// increment quantity of single item
const incrementItemQuantity = (e) => {
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.previousSibling.textContent;
  const price_per_item = e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price =
    e.target.parentNode.parentNode.parentNode.children[6].textContent;
  console.log(item_id, quantity, price_per_item, total_price);
};
//add event listener to each html added item:
const addItemEventListeners = () => {
  const remove_buttons = document.getElementsByClassName("item-remove");
  const decrement_buttons = document.getElementsByClassName("decrement");
  const increment_buttons = document.getElementsByClassName("increment");
  for (let remove_button of remove_buttons)
    remove_button.addEventListener("click", removeItem);
  for (let decrement_button of decrement_buttons)
    decrement_button.addEventListener("click", decrementItemQuantity);
  for (let increment_button of increment_buttons)
    increment_button.addEventListener("click", incrementItemQuantity);
};
// END OF EVENT LISTENERS FOR EACH ITEM IN CART

// EVENT LISTENERS FUNCTIONS:
// add item to html content:
const showItem = (item) => {
  const total_price = parseInt(item.price) * parseInt(item.quantity);
  const itemHTML = `<div class="cart-item">
      <input type="hidden" value="${
        item.id
      }" /><div class="item-remove">&times;</div><div class="item-info">
        <img class="item-image" src="${
          item.main_image
        }" alt="product-main-image" /><h2 class="item-name">${
    item.title
  }</h2><h3 class="item-category">${item.description.substring(0, 50)}...</h3>
      </div><div class="item-quantity"><div class="quantity-box blue-bg">
          <span class="decrement">-</span><span class="quantity antiquewhite-bg">${
            item.quantity
          }</span><span class="increment">+</span></div></div><div class="price-item">${
    item.price
  }</div><input class="discount-code"></input><div class="item-total">${total_price}</div></div>`;
  cart_container.innerHTML += itemHTML;
};
// when loading the page get all the items in user cart:
const getCartItems = () => {
  // get client_id from localStorage first
  const client_id = 1; //for testing
  const get_items = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/get_cart.php";
    await axios
      .post(url, params)
      .then((data) => {
        for (let item of data.data) {
          showItem(item);
        }
        // Add event listeners for cart items after appending them to HTML
        addItemEventListeners();
      })
      .catch((err) => console.log(err));
  };

  get_items();
};

// apply the voucher code added to the total and recalculate the new total
const applyVoucher = () => {
  console.log(voucher_code.value);
};
// submit the cart to checkout -> turn isCheckout bool to true and create new empty car for user:
const checkoutOrder = () => {
  console.log(cart_total_price.textContent);
};

// START OF MAIN EVENT LISTENERS ADDITION
// on window load, get all cart items:
window.addEventListener("load", getCartItems);
// event listeners for clicked (remove, increment, decrement, checkout, apply voucher)
apply_voucher.addEventListener("click", applyVoucher);
checkout_submit.addEventListener("click", checkoutOrder);
// END OF MAIN EVENT LISTENERS ADDITION
