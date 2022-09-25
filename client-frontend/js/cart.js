const checkout_submit = document.getElementById("checkout-submit");
const apply_voucher = document.getElementById("voucher-submit");
const voucher_code = document.getElementById("voucher-input");
const cart_total_show = document.getElementById("cart-total");
const cart_container = document.getElementById("cart-items");
const discount_codes = document.getElementsByClassName("discount-code");
const remove_buttons = document.getElementsByClassName("item-remove");
const decrement_buttons = document.getElementsByClassName("decrement");
const increment_buttons = document.getElementsByClassName("increment");
var cart_total = 0; //to calculate and affect after each change in quantity(used in many different event listeners)
// navbar links:
const signout_button = document.getElementById('signout-button');
const back_to_products_button = document.getElementById('back-to-products');

// ------START OF EVENT LISTENERS FOR EACH ITEM IN CART------
//  remove the whole item/product from the cart/ when X button is clicked:
const removeItem = (e) => {
  const cart_item = e.target.parentNode;
  const item_id = e.target.parentNode.children[0].value;
  const quantity_value = -1; //when API receive -1 => it is handled to remove the whole item
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  cart_item.remove();

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
// decrement quantity of single item and update DB
const decrementItemQuantity = (e) => {
  //load client_id from localStorage:
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
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
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
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
// apply discount to item's total if found: //it wouldn't be saved, so when the user wanna checkout he would add it
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
  //if perc > 0 : update current_item_total and the whole cart total
  let old_item_total = parseInt(e.target.nextSibling.textContent);
  const current_item_total = e.target.nextSibling;

  if (discount_percentage > 0) {
    let current_item_total_value = parseInt(current_item_total.textContent);
    const discount = current_item_total_value * (discount_percentage / 100);
    current_item_total_value -= discount;
    current_item_total.textContent = current_item_total_value;
    cart_total_show.textContent =
      parseInt(cart_total_show.textContent) - discount;
  }
  // if user removed the discount code, or change it to unvalid one:
  else {
    //recalculate: find new_time_total(price*quantity), then cart_total+= (new_item_total-old_item_total);
    const quantity_show =
      e.target.parentNode.children[3].children[0].children[1];
    const price_per_item_show = e.target.parentNode.children[4];
    const new_item_total =
      parseInt(quantity_show.textContent) *
      parseInt(price_per_item_show.textContent);
    //update item total and cart total, to make sure discount is removed:
    current_item_total.textContent = new_item_total;
    cart_total_show.textContent =
      parseInt(cart_total_show.textContent) + (new_item_total - old_item_total);
  }
};
//add event listener to each html added item:
const addItemEventListeners = () => {
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
  const itemHTML = `<div class="cart-item"><input type="hidden" value="${item.id}" /><div class="item-remove">&times;</div><div class="item-info"><img class="item-image" src="../ecommerce-server/product_images/${item.main_image}" alt="product-main-image" /><h3 class="item-name">${item.title}</h3></div><div class="item-quantity"><div class="quantity-box blue-bg"><span class="decrement">-</span><span class="quantity antiquewhite-bg">${item.quantity}</span><span class="increment">+</span></div></div><div class="price-item">${item.price}</div><input class="discount-code" maxlength="10" placeholder='Discount Code'></input><div class="item-total">${total_price}</div></div>`;
  cart_container.innerHTML += itemHTML;
};
// when loading the page get all the items in user cart:
const getCartItems = async () => {
  // get client_id from localStorage first
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
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
// submit the cart to checkout
const checkoutOrder = async () => {
  //get client_id from localStorage: 1 - for testing:
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const total = parseInt(cart_total_show.textContent);
  const checkout_date = Date.now();
  // first get all Discount codes from my cart local page inputs
  let discount_codes_added = [];
  for (let code of discount_codes) {
    if (code.value) {
      discount_codes_added.push(code.value);
    }
  }
  // then update orders table where this order_id to isCheckout=1(true) and create new empty cart for this user
  const finalize_order = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/checkout_order.php";
    await axios({
      method: "post",
      url,
      data: {
        client_id,
        total,
        checkout_date,
      },
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  await finalize_order(); //wait till checkout finishes totally then delete discount codes

  // delete all Discount codes that match valid cart local inputs.
  // remove specific discount_code
  const remove_discount_code = async (code) => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/remove_discount_code.php";
    await axios({
      method: "post",
      url,
      data: {
        code,
      },
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  //remove all local codes added, if found in db(valid)
  for (let code of discount_codes_added) {
    console.log(code);
    await remove_discount_code(code);
  }

  // remove all carts items instantly:
  cart_container.remove();
  cart_total_show.textContent = 0;
};

// loguser out:
const logUserOut = ()=>{
  localStorage.clear();
  window.location.href = './register.html';
}
// return back to products page:
const getBackToProducts = ()=>{
  window.location.href = './products.html';
}
// ------END OF EVENT LISTENER FUNCTIONS------

// ------START OF MAIN EVENT LISTENERS ADDITION------
// on window load, get all cart items:
window.addEventListener("load", getCartItems);
// event listeners for clicked (remove, increment, decrement, checkout, apply voucher)
apply_voucher.addEventListener("click", applyVoucher);
checkout_submit.addEventListener("click", checkoutOrder);
//navlinks:
signout_button.addEventListener('click',logUserOut);
back_to_products_button.addEventListener('click',getBackToProducts);
// ------END OF MAIN EVENT LISTENERS ADDITION------
