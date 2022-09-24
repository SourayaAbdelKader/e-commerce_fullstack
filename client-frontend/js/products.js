const client_id = 1;

const productsWrapper = document.getElementById("productsWrapper")
const getProductApi = "http://localhost/e-commerce_fullstack/backend/get_products.php"
const addFavouriteApi = "http://localhost/e-commerce_fullstack/backend/add_favorite.php"


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