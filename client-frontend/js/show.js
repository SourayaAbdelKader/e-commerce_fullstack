// description buttons switch showing info:
const seller_info_button = document.getElementById("seller-info-button");
const seller_info = document.getElementById("seller-info");
const item_description_button = document.getElementById("description-button");
const item_description = document.getElementById("item-description");
item_description_button.style.backgroundColor = "#94a9b4"; //by default
// navlinks:
const signout_button = document.getElementById("signout-button");
const go_to_cart_button = document.getElementById("go-to-cart-button");
const back_to_products_button = document.getElementById("back-to-products");
// buttons:
const add_to_cart_button = document.getElementById("cart-button");
const add_to_favorite_button = document.getElementById("fav-button");
const add_to_wishlist_button = document.getElementById("wish-button");

const showItemDescription = () => {
  seller_info.classList.add("display-none");
  seller_info_button.style.backgroundColor = "transparent";
  item_description_button.style.backgroundColor = "#94a9b4";
  item_description.classList.remove("display-none");
};
const showSellerInfo = () => {
  item_description_button.style.backgroundColor = "transparent";
  item_description.classList.add("display-none");
  seller_info.classList.remove("display-none");
  seller_info_button.style.backgroundColor = "#94a9b4";
};

seller_info_button.addEventListener("click", showSellerInfo);
item_description_button.addEventListener("click", showItemDescription);

//Start of Event listeners linking to another pages:
//
signout_button.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./register.html";
});
go_to_cart_button.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
back_to_products_button.addEventListener("click", () => {
  window.location.href = "./products.html";
});
//End of Event listeners linking to another pages:

// START OF POST APIs (add_to_cart && add_favorite && add_wishlist)
const addToFavorites = ()=>{
  console.log('fav');
  const user = JSON.parse(localStorage.getItem('user'));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem('product_id'));
  console.log(client_id, product_id);
}
const addToWishlist = () => {
  console.log("wishlist");
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem("product_id"));
  console.log(client_id, product_id);
};
const addToCart = () => {
  console.log("cart");
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem("product_id"));
  const quantity = 1; 
  console.log(client_id, product_id, quantity);
};
// END OF POST APIs

// Event listeners for APIs (add_to_cart && add_favorite && add_wishlist):
add_to_favorite_button.addEventListener('click',addToFavorites);
add_to_wishlist_button.addEventListener("click", addToWishlist);
add_to_cart_button.addEventListener('click',addToCart);