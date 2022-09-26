// description buttons switch showing info:
const seller_info_button = document.getElementById("seller-info-button");
const seller_info = document.getElementById("seller-info");
const item_description_button = document.getElementById("description-button");
const item_description = document.getElementById("item-description");
item_description_button.style.backgroundColor = "#F79106"; //by default
// navlinks:
const signout_button = document.getElementById("signout-button");
const go_to_cart_button = document.getElementById("go-to-cart-button");
const back_to_products_button = document.getElementById("back-to-products");
// buttons:
const add_to_cart_button = document.getElementById("cart-button");
const add_to_favorite_button = document.getElementById("fav-button");
const add_to_wishlist_button = document.getElementById("wish-button");
// show item information tags:
const product_show_info = document.getElementById("show-item");
const product_price = document.getElementById("price");
const product_condition = document.getElementById("item-condition");
const product_name = document.getElementById("item-name");
const product_category = document.getElementById("item-category");
const product_description = document.getElementById("item-description");
const product_main_image = document.getElementById("item-main-img");
const product_image1 = document.getElementById("item-img1");
const product_image2 = document.getElementById("item-img2");
const product_image3 = document.getElementById("item-img3");
const seller_shop_name = document.getElementById("shop-name");
const seller_shop_location = document.getElementById("shop-location");
const seller_shop_info = document.getElementById("shop-info");
//related products section:
const related_products_section = document.getElementById("related-products");

// START OF WINDOW LOAD
//show current product and seller values:
const showProduct = (product) => {
  // always we should have images, but for testing and styling, we wanna keep html fixed image (we use same main image, for main image and the middle one)
  if (product.product_image) {
    product_main_image.src = `../ecommerce-server/product_images/${product.product_image}`;
    product_image2.src = `../ecommerce-server/product_images/${product.product_image}`;
  }
  if (product.product_image1)
    product_image1.src = `../ecommerce-server/product_images/${product.product_image1}`;
  if (product.product_image2)
    product_image3.src = `../ecommerce-server/product_images/${product.product_image2}`;
  product_show_info.setAttribute("data-value", product.categorie_id);
  [
    product_price.textContent,
    product_condition.textContent,
    product_name.textContent,
    product_description.textContent,
    product_category.textContent,
    seller_shop_name.textContent,
    seller_shop_location.textContent,
    seller_shop_info.textContent,
  ] = [
    product.product_price,
    product.product_condition,
    product.product_title,
    product.product_description,
    product.categorie_name,
    product.seller_name,
    product.seller_location,
    product.seller_description,
  ];
};
4;
//ad event to show specific related product"
// showing item:
const show_specific_product = () => {
  const all_products_cards = document.querySelectorAll(".productCard");
  all_products_cards.forEach((card) => {
    const product_id = card.getAttribute("data-value");
    card.addEventListener("click", () => {
      localStorage.setItem("product_id", JSON.stringify(product_id));
      window.location.href = "./show.html";
    });
  });
};
//load related products to html
const load_related_product = (product) => {
  related_products_section.innerHTML += `<div class="productCard grey-bg" data-value=${product.id}>
                                    <div class="productMainImage">
                                      <img src="../ecommerce-server/product_images/${product.image}" alt="">
                                    </div>
                                      <div class="productInfo">
                                          <p>${product.title}</p>
                                          <div class="bottom">
                                              <p>${product.price}$</p>
                                              <div class="like" data-value="${product.id}"><img src='./assets/heart-fav.png'></div>
                                          </div>
                                      </div>
                                  </div>`;
};
//get product and seller info to show
const getProductAndSeller = async () => {
  const product_id = JSON.parse(localStorage.getItem("product_id"));

  const get_data = async () => {
    let params = new URLSearchParams();
    params.append("product_id", product_id);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/get_product_with_seller.php";
    await axios
      .post(url, params)
      .then((data) => {
        showProduct(data.data[0]);
      })
      .catch((err) => console.log(err));
  };
  await get_data();
  getRelatedProducts();
};
//get related products:
const getRelatedProducts = async () => {
  const catgid = product_show_info.getAttribute("data-value");
  // function fetching all products from database
  const get_related = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/get_related_products.php";
    let params = new URLSearchParams();
    params.append("categorie_id", catgid);
    await axios
      .post(url, params)
      .then((data) => {
        if (data.data) {
          for (let item of data.data) {
            load_related_product(item);
          }
        } else {
          related_products_section.innerHTML = ``;
        }
      })
      .catch((err) => console.log(err));
  };
  await get_related();
  show_specific_product();
};
// END OF WINDOW LOAD

// START OF DESCRIPTION BUTTONS FUNCTIONS
// on item description button click:
const showItemDescription = () => {
  seller_info.classList.add("display-none");
  seller_info_button.style.backgroundColor = "transparent";
  item_description_button.style.backgroundColor = "#F79106";
  item_description.classList.remove("display-none");
};
// on seller info button click:
const showSellerInfo = () => {
  item_description_button.style.backgroundColor = "transparent";
  item_description.classList.add("display-none");
  seller_info.classList.remove("display-none");
  seller_info_button.style.backgroundColor = "#F79106";
};
// END OF DESCRIPTION BUTTONS FUNCTIONS

// START OF POST APIs (add_to_cart && add_favorite && add_wishlist)
const addToFavorites = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem("product_id"));

  const update_favorites = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("product_id", product_id);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/add_favorite.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  update_favorites();
};
const addToWishlist = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem("product_id"));

  const update_wishlist = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("product_id", product_id);
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/add_wishlist.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  update_wishlist();
};
const addToCart = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  const product_id = JSON.parse(localStorage.getItem("product_id"));
  const quantity = 1;

  const update_cart = async () => {
    let params = new URLSearchParams();
    params.append("client_id", client_id);
    params.append("product_id", product_id);
    params.append("quantity", quantity);

    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/add_to_cart.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  update_cart();
};
// END OF POST APIs

// START OF EVENT LISTENERS
// Event listeners for APIs (add_to_cart && add_favorite && add_wishlist):
add_to_favorite_button.addEventListener("click", addToFavorites);
add_to_wishlist_button.addEventListener("click", addToWishlist);
add_to_cart_button.addEventListener("click", addToCart);
// on page load - load the product and the seller from the database:
window.addEventListener("load", getProductAndSeller);
// buttons toggle description section:
seller_info_button.addEventListener("click", showSellerInfo);
item_description_button.addEventListener("click", showItemDescription);
//linking to another pages:
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
// END OF EVENT LISTENERS
