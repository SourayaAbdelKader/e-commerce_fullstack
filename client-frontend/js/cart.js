const checkout_submit = document.getElementById("checkout-submit");
const apply_voucher = document.getElementById("voucher-submit");
const voucher_code = document.getElementById("voucher-input");
const cart_total_show = document.getElementById("cart-total");
const cart_container = document.getElementById("cart-items");
var cart_total = 0; //to calculate and affect after each change in quantity(used in many different event listeners)

// ------START OF EVENT LISTENERS FOR EACH ITEM IN CART------
//  remove the whole item/product from the cart/ when X button is clicked:
const removeItem = (e) => {
  const item_id = e.target.parentNode.children[0].value;
  const quantity = -1; //when API receive -1 => it is handled to remove the whole item
  console.log(item_id, quantity);
};
// decrement quantity of single item and update DB
const decrementItemQuantity = (e) => {
  //load client_id from localStorage:
  const client_id = 1;
  const cart_item = e.target.parentNode.parentNode.parentNode;
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.nextSibling;
  const price_per_item_value =
    e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price = e.target.parentNode.parentNode.parentNode.children[6];

  let quantity_value = parseInt(quantity.textContent);
  let total_price_value = parseInt(total_price.textContent);
  // update cart value as int
  quantity_value -= 1;
  // update quantity shown to user, product total shown to user, and whole cart total
  quantity.textContent = quantity_value;
  total_price.textContent = total_price_value - parseInt(price_per_item_value);
  cart_total_show.textContent =
    parseInt(cart_total_show.textContent) - parseInt(price_per_item_value);
  if (quantity_value <= 0) {
    cart_item.remove(); //remove the div totally(product removed when quantity becomes <= 0)
    quantity_value = -1; //set it to -1 (since in API update_cart if (== -1) to remove product totally from cart)
  }

  // update cart in db both cases ( 0 or positive product quantity)
  const update_cart = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("product_id", item_id);
    params.append("new_quantity", quantity_value);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/update_cart.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  update_cart();
};
// increment quantity of single item
const incrementItemQuantity = (e) => {
  //load client_id from localStorage:
  const client_id = 1;
  const item_id = e.target.parentNode.parentNode.parentNode.children[0].value;
  const quantity = e.target.previousSibling;
  const price_per_item_value =
    e.target.parentNode.parentNode.nextSibling.textContent;
  const total_price = e.target.parentNode.parentNode.parentNode.children[6];

  let quantity_value = parseInt(quantity.textContent);
  let total_price_value = parseInt(total_price.textContent);
  // update cart value as int
  quantity_value += 1;
  // update quantity shown to user, product total shown to user, and whole cart total
  quantity.textContent = quantity_value;
  total_price.textContent = total_price_value + parseInt(price_per_item_value);
  cart_total_show.textContent =
    parseInt(cart_total_show.textContent) + parseInt(price_per_item_value);

  // update cart in db both cases ( 0 or positive product quantity)
  const update_cart = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("product_id", item_id);
    params.append("new_quantity", quantity_value);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/update_cart.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  update_cart();
};
// apply discount to item's total if found:
const applyDiscount = async (e) => {
  //get the id of the item where the input belongs, and input(self) value inside
  const item_id = e.target.parentNode.children[0].value;
  const code = e.target.value;
  let discount_percentage;

  const get_percentage = async () => {
    let params = new URLSearchParams();
    params.append("product_id", item_id);
    params.append("code", code);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/check_discount_code.php";
    await axios
      .post(url, params)
      .then((data) => {
        if (data.data[0]) {
          discount_percentage = data.data[0].percentage;
        } else {
          discount_percentage = 0;
        }
      })
      .catch((err) => console.log(err));
  };

  await get_percentage(); //get the percentage of discount if found
  console.log(discount_percentage);
};
//add event listener to each html added item:
const addItemEventListeners = () => {
  const remove_buttons = document.getElementsByClassName("item-remove");
  const decrement_buttons = document.getElementsByClassName("decrement");
  const increment_buttons = document.getElementsByClassName("increment");
  const discount_codes = document.getElementsByClassName("discount-code");
  for (let remove_button of remove_buttons)
    remove_button.addEventListener("click", removeItem);
  for (let decrement_button of decrement_buttons)
    decrement_button.addEventListener("click", decrementItemQuantity);
  for (let increment_button of increment_buttons)
    increment_button.addEventListener("click", incrementItemQuantity);
  for (let discount_input of discount_codes) {
    discount_input.addEventListener("focusout", applyDiscount); //whenever we leave the input (instead of 'change' to don't reach the database after each key click)
  }
};
// ------END OF EVENT LISTENERS FOR EACH ITEM IN CART------

// ------START OFEVENT LISTENERS FUNCTIONS:------
// add item to html content:
const showItem = (item) => {
  const total_price = parseInt(item.price) * parseInt(item.quantity);
  cart_total += total_price; //calculate the whole cart total while adding each item
  const itemHTML = `<div class="cart-item"><input type="hidden" value="${item.id}" /><div class="item-remove">&times;</div><div class="item-info"><img class="item-image" src="${item.main_image}" alt="product-main-image" /><h3 class="item-name">${item.title}</h3></div><div class="item-quantity"><div class="quantity-box blue-bg"><span class="decrement">-</span><span class="quantity antiquewhite-bg">${item.quantity}</span><span class="increment">+</span></div></div><div class="price-item">${item.price}</div><input class="discount-code" maxlength="10" placeholder='Discount Code'></input><div class="item-total">${total_price}</div></div>`;
  cart_container.innerHTML += itemHTML;
};
// when loading the page get all the items in user cart:
const getCartItems = async () => {
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

  await get_items();
  // after adding all items show the total of the cart:
  cart_total_show.textContent = cart_total;
};

// apply the voucher code added to the total and recalculate the new total ('VOUCHER' FEATURE NOT ADDED YET)
const applyVoucher = () => {
  console.log(voucher_code.value);
};
// submit the cart to checkout -> turn isCheckout bool to true and create new empty car for user:
const checkoutOrder = () => {
  console.log(cart_total_show.textContent);
};
// ------END OF EVENT LISTENER FUNCTIONS------

// ------START OF MAIN EVENT LISTENERS ADDITION------
// on window load, get all cart items:
window.addEventListener("load", getCartItems);
// event listeners for clicked (remove, increment, decrement, checkout, apply voucher)
apply_voucher.addEventListener("click", applyVoucher);
checkout_submit.addEventListener("click", checkoutOrder);
// ------END OF MAIN EVENT LISTENERS ADDITION------
