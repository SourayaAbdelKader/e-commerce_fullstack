const client_id = 1;
const showProductsBtn = document.getElementById("showProducts")
const showFavoritesBtn = document.getElementById("showFavorites")
const showWishlistBtn = document.getElementById("showWishlist")
const searchBar = document.getElementById("searchBar");
const productsPageContent = document.getElementById("products");
const favoritesPageContent = document.getElementById("favorites");
const wishlistPageContent = document.getElementById("wishlist");
const searchResultPageContent = document.getElementById("searchResult")
const productsWrapper = document.getElementById("productsWrapper");
const favoritesWrapper = document.getElementById("favoritesWrapper");
const wishlistWrapper = document.getElementById("favoritesWrapper");
const searchResultWrapper = document.getElementById("searchWrapper")
const getProductApi = "http://localhost/e-commerce_fullstack/backend/get_products.php";
const addFavouriteApi = "http://localhost/e-commerce_fullstack/backend/add_favorite.php";
const getFavoritesApi = "http://localhost/e-commerce_fullstack/backend/get_favorites.php";
const getWishlistApi = "http://localhost/e-commerce_fullstack/backend/get_wishlist.php";
const searchApi = "http://localhost/e-commerce_fullstack/backend/search.php";
const getAdsApi = "http://localhost/e-commerce_fullstack/backend/get_ads.php";

// showing only product section when clicked in navbar
showProductsBtn.addEventListener("click",() => {
  productsPageContent.classList.remove("hide")
  favoritesPageContent.classList.add("hide")
  wishlistPageContent.classList.add("hide")
})

// showing only favorites section when clicked in navbar
showFavoritesBtn.addEventListener("click",() => {
  productsPageContent.classList.add("hide")
  favoritesPageContent.classList.remove("hide")
  wishlistPageContent.classList.add("hide")

  // Calling load_favorites function to show favorite products
  laod_favorites();
})

// showing only favorites section when clicked in navbar
showWishlistBtn.addEventListener("click",() => {
  productsPageContent.classList.add("hide")
  favoritesPageContent.classList.add("hide")
  wishlistPageContent.classList.remove("hide")

    // Calling load_wishlist function to show wishlist products
    laod_wishlist();
})

// Function getting products as object and appending them to a wrapper
const load_products = (products,wrapper) =>{
  if(products.length != 0){
  products.forEach(product => {
      // add seller name
      wrapper.innerHTML+=`<div class="productCard grey-bg">
                                    <div class="productMainImage">
                                      <img src="../../backend/${product.main_image}" alt="">
                                    </div>
                                      <div class="productInfo">
                                          <p>${product.title}</p>
                                          <div class="bottom">
                                              <p>${product.price}$</p>
                                              <div class="like" data-value="${product.id}"></div>
                                          </div>
                                      </div>
                                  </div>`
  })
} else{
  //if passed parameter is empty
  wrapper.innerHTML = "<p>No Results</p>"
}
}

// function that adds to all like icons an event listner for fetching in a later function
const favorite_products = () => {
  const likes = document.querySelectorAll(".like");
  likes.forEach(like =>{
    let product_id = like.getAttribute("data-value");
    like.addEventListener("click", () =>{
      add_favourite(product_id);
    })
  })
}

// function adding a favorite item to the database
const add_favourite = async (product_id) => {
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  params.append("product_id", product_id);
  await axios
    .post(addFavouriteApi,params)
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
    allProducts = data.data
    // passing all products to load_product function as objects
    load_products(allProducts,productsWrapper)

    // adding event listeners to favorite icons only after products are loaded
    favorite_products()
  })
  .catch((err) => console.log(err));
};

// function that fetch favorite products of the client
const laod_favorites = async() => {
  let params = new URLSearchParams();
  params.append("client_id",client_id)
  await axios
  .post(getFavoritesApi,params)
  .then((data) => {
    favProducts = data.data
    load_products(favProducts,favoritesWrapper)
  })
}

const laod_wishlist = async() => {
  let params = new URLSearchParams();
  params.append("client_id",client_id)
  await axios
  .post(getWishlistApi,params)
  .then((data) => {
    wishlistProducts = data.data
    load_products(wishlistProducts,wishlistWrapper)
  })
}

// Function fetching for products according to the passes search key
const get_search_result = async (key) => {
  let params = new URLSearchParams();
  params.append("key", key);
  await axios
  .post(searchApi,params)
  .then((data) => {
    let searchResult = data.data;
    productsPageContent.classList.add("hide");
    searchResultPageContent.classList.remove("hide");
    load_products(searchResult,searchResultWrapper)

    // Empty result content and go back to products page when back is clicked
    let back = document.getElementById("backSearch");
    back.addEventListener("click", () => {
      searchResultWrapper.innerHTML = "";
      productsPageContent.classList.remove("hide");
      searchResultPageContent.classList.add("hide");
    })
  })
}

const get_ads = async () => {
  await axios
  .post(getAdsApi)
  .then((data) => {
    let ads = data.data;
    console.log(ads)
  })
  .catch((err) => console.log(err));
}
get_ads()


// Sending the search key to get_search_result function on change
searchBar.addEventListener("change", () => {
  get_search_result(searchBar.value)
})

// Calling get_product function to show products
get_product();