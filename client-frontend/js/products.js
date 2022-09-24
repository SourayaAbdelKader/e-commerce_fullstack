const client_id = 1;

const productsWrapper = document.getElementById("productsWrapper");
const getProductApi = "http://localhost/e-commerce_fullstack/backend/get_products.php";
const addFavouriteApi = "http://localhost/e-commerce_fullstack/backend/add_favorite.php";

// Function getting products as object and appending them to container
const load_products = (products) =>{
  products.forEach(product => {
      // add seller name
      productsWrapper.innerHTML+=`<div class="productCard grey-bg">
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
  });
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
    // passing all products to load_product function as objects
    load_products(data.data)

    // adding event listeners to favorite icons only after products are loaded
    favorite_products()
  })
  .catch((err) => console.log(err));
};

get_product();