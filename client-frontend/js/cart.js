const remove_buttons = document.getElementsByClassName('item-remove');
const decrement_buttons = document.getElementsByClassName('decrement');
const increment_buttons = document.getElementsByClassName("increment");
const checkout_submit = document.getElementById('checkout-submit');
const apply_voucher = document.getElementById('voucher-submit');

// apply the voucher code added to the total and recalculate the new total
const applyVoucher = ()=>{
    console.log('voucher!!');
}
// submit the cart to checkout -> turn isCheckout bool to true and create new empty car for user:
const checkoutOrder = ()=>{
    console.log('checkout!!');
}
//  remove the whole item/product from the cart/ when X button is clicked:
const removeItem = ()=>{
    console.log('Removed!!');
}
// decrement quantity of single item and update DB
const decrementItemQuantity = ()=>{
    console.log('Decrement!!')
}
// increment quantity of single item
const incrementItemQuantity = ()=>{
    console.log('Increment!!')
}

// event listeners for clicked (remove, increment, decrement, checkout, apply voucher)
apply_voucher.addEventListener('click',applyVoucher);
checkout_submit.addEventListener("click", checkoutOrder);
for (let remove_button of remove_buttons)
  remove_button.addEventListener("click", removeItem);
for (let decrement_button of decrement_buttons)
  decrement_button.addEventListener("click", decrementItemQuantity);
for(let increment_button of increment_buttons) increment_button.addEventListener('click',incrementItemQuantity);