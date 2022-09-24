const remove_buttons = document.getElementsByClassName("item-remove");
const decrement_buttons = document.getElementsByClassName("decrement");
const increment_buttons = document.getElementsByClassName("increment");
const checkout_submit = document.getElementById("checkout-submit");
const apply_voucher = document.getElementById("voucher-submit");
const voucher_code = document.getElementById("voucher-input");
const cart_total_price = document.getElementById('cart-total'); 

// START OF EVENT LISTENERS FUNCTIONS
// apply the voucher code added to the total and recalculate the new total
const applyVoucher = () => {
  console.log(voucher_code.value);
};
// submit the cart to checkout -> turn isCheckout bool to true and create new empty car for user:
const checkoutOrder = () => {
  console.log(cart_total_price.textContent);
};
//  remove the whole item/product from the cart/ when X button is clicked:
const removeItem = (e) => {
  const item_id = e.target.parentNode.children[0].value;
  const quantity = -1; //when API receive -1 => it is handled to remove the whole item
};
// decrement quantity of single item and update DB
const decrementItemQuantity = (e) => {
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.nextSibling.textContent;
  const price_per_item = e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price =
    e.target.parentNode.parentNode.parentNode.children[6].textContent;
};
// increment quantity of single item
const incrementItemQuantity = (e) => {
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.previousSibling.textContent;
  const price_per_item = e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price =
    e.target.parentNode.parentNode.parentNode.children[6].textContent;
};
// END OF EVENT LISTENERS FUNCTIONS

// START OF EVENT LISTENERS
// event listeners for clicked (remove, increment, decrement, checkout, apply voucher)
apply_voucher.addEventListener("click", applyVoucher);
checkout_submit.addEventListener("click", checkoutOrder);
for (let remove_button of remove_buttons)
  remove_button.addEventListener("click", removeItem);
for (let decrement_button of decrement_buttons)
  decrement_button.addEventListener("click", decrementItemQuantity);
for (let increment_button of increment_buttons)
  increment_button.addEventListener("click", incrementItemQuantity);
// END OF EVENT LISTENERS
