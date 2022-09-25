const showProductsBtn = document.getElementById("showProducts");
const showFavoritesBtn = document.getElementById("showFavorites");
const showWishlistBtn = document.getElementById("showWishlist");
const searchBar = document.getElementById("searchBar");
const productsPageContent = document.getElementById("products");
const favoritesPageContent = document.getElementById("favorites");
const wishlistPageContent = document.getElementById("wishlist");
const searchResultPageContent = document.getElementById("searchResult");
const productsWrapper = document.getElementById("productsWrapper");
const favoritesWrapper = document.getElementById("favoritesWrapper");
const wishlistWrapper = document.getElementById("wishlistWrapper");
const searchResultWrapper = document.getElementById("searchWrapper");
const getProductApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/get_products.php";
const addFavouriteApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/add_favorite.php";
const getFavoritesApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/get_favorites.php";
const getWishlistApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/get_wishlist.php";
const searchApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/search.php";
const getAdsApi =
  "http://localhost/e-commerce_fullstack/ecommerce-server/get_ads.php";
// buttons linking to another pages:
const signout_button = document.getElementById("signout-button");
const go_to_cart_button = document.getElementById("go-to-cart-button");
const go_to_profile_button = document.getElementById("go-to-profile-button");
// all products cards shown:

// Function generating a random integer between the 2 passed integer parameters
function random_int(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// Function getting products as object and appending them to a wrapper
const load_products = (products, wrapper) => {
  console.log(products, wrapper);
  wrapper.innerHTML = "";
  if (products.length != 0) {
    products.forEach((product) => {
      // add seller name
      wrapper.innerHTML += `<div class="productCard grey-bg" data-value=${product.id}>
                                    <div class="productMainImage">
                                      <img src="../../ecommerce-server/${product.main_image}" alt="">
                                    </div>
                                      <div class="productInfo">
                                          <p>${product.title}</p>
                                          <div class="bottom">
                                              <p>${product.price}$</p>
                                              <div class="like" data-value="${product.id}"><img src='./assets/heart-fav.png'></div>
                                          </div>
                                      </div>
                                  </div>`;
    });
  } else {
    //if passed parameter is empty
    wrapper.innerHTML = "<p>No Results</p>";
  }
};

const load_ad = (ad) => {
  adContainer.innerHTML = `<div class="productAdImage">
                            <div class="fade">
                                <img src="../../ecommerce-server/${ad.main_image}" alt="Ad Image">
                            </div>
                          </div>
                          <div class="adInfo flex column antiquewhite-text">
                            <div class="adSeller">
                                <h1>${ad.title}</h1>
                                <p>${ad.ads_description}</p>
                            </div>
                            <div class="AdView">
                                <p>Price: <span>${ad.price}$</span></p>
                                <button id='view-advertisement-button' data-value=${ad.product_id} class="btn antiquewhite-text grey-bg">View</button>
                            </div>
                          </div>`;
  // add event listener to select ads id => in order to show to user on (view button click):
  const view_advertisement_button = document.getElementById(
    "view-advertisement-button"
  );
  view_advertisement_button.addEventListener("click", () => {
    const product_id = view_advertisement_button.getAttribute("data-value");
    localStorage.setItem("product_id", JSON.stringify(product_id));
    window.location.href = "./show.html";
  });
};

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

// function that adds to all like icons an event listner for fetching in a later function
const favorite_products = () => {
  const likes = document.querySelectorAll(".like");
  likes.forEach((like) => {
    let product_id = like.getAttribute("data-value");
    like.addEventListener("click", (e) => {
      e.stopPropagation();
      add_favourite(product_id);
    });
  });
};

// function adding a favorite item to the database
const add_favourite = async (product_id) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("product_id", product_id);
  await axios
    .post(addFavouriteApi, params)
    .then((data) => {
      // ouput whether product is in favorite or not
      console.log(data.data);
    })
    .catch((err) => console.log(err));
};

// function fetching all products from database
const get_product = async () => {
  await axios
    .post(getProductApi)
    .then((data) => {
      allProducts = data.data;
      // passing all products to load_product function as objects
      load_products(allProducts, productsWrapper);

      // adding event listeners to show specific product and favorite icons only after products are loaded
      show_specific_product();
      favorite_products();
    })
    .catch((err) => console.log(err));
};

// function that fetch favorite products of the client
const laod_favorites = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  await axios.post(getFavoritesApi, params).then((data) => {
    favProducts = data.data;
    load_products(favProducts, favoritesWrapper);
  });
};

const laod_wishlist = async () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const client_id = user.id;
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  await axios.post(getWishlistApi, params).then((data) => {
    wishlistProducts = data.data;
    load_products(wishlistProducts, wishlistWrapper);
    show_specific_product();
  });
};

// Function fetching for products according to the passes search key
const get_search_result = async (key) => {
  let params = new URLSearchParams();
  params.append("key", key);
  await axios.post(searchApi, params).then((data) => {
    let searchResult = data.data;
    productsPageContent.classList.add("hide");
    searchResultPageContent.classList.remove("hide");
    load_products(searchResult, searchResultWrapper);

    // Empty result content and go back to products page when back is clicked
    let back = document.getElementById("backSearch");
    back.addEventListener("click", () => {
      searchResultWrapper.innerHTML = "";
      productsPageContent.classList.remove("hide");
      searchResultPageContent.classList.add("hide");
    });
  });
};

const get_ads = async () => {
  await axios
    .post(getAdsApi)
    .then((data) => {
      let ads = data.data;
      let random = random_int(0, ads.length);
      load_ad(ads[random]);
    })
    .catch((err) => console.log(err));
};

// Sending the search key to get_search_result function on change
searchBar.addEventListener("change", () => {
  get_search_result(searchBar.value);
});

// Showing only product section when clicked in navbar
showProductsBtn.addEventListener("click", () => {
  productsPageContent.classList.remove("hide");
  favoritesPageContent.classList.add("hide");
  wishlistPageContent.classList.add("hide");

  //Calling for a new random ad
  get_ads();
});

// Showing only favorites section when clicked in navbar
showFavoritesBtn.addEventListener("click", () => {
  productsPageContent.classList.add("hide");
  favoritesPageContent.classList.remove("hide");
  wishlistPageContent.classList.add("hide");

  // Calling load_favorites function to show favorite products
  laod_favorites();
});

// showing only favorites section when clicked in navbar
showWishlistBtn.addEventListener("click", () => {
  productsPageContent.classList.add("hide");
  favoritesPageContent.classList.add("hide");
  wishlistPageContent.classList.remove("hide");

  // Calling load_wishlist function to show wishlist products
  laod_wishlist();
});

//Start of Event listeners linking to another pages:
//
signout_button.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "./register.html";
});
go_to_cart_button.addEventListener("click", () => {
  window.location.href = "./cart.html";
});
go_to_profile_button.addEventListener("click", () => {
  window.location.href = "./profile.html";
});
//End of Event listeners linking to another pages:

// Calling get_product function to show products
get_product();

// Calling a new random ad
get_ads();
