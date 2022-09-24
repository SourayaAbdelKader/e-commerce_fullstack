const productsWrapper = document.getElementById("productsWrapper")
const getProductApi = "http://localhost/e-commerce_fullstack/backend/get_products.php"

// let params = new URLSearchParams();
//   params.append("name", signup_name.value);
//   params.append("email", signup_email.value);
//   params.append("password", signup_password.value);
//   params.append("phone_number", signup_phone.value);
//   params.append("user_type", "client");
//   params.append("shop_location", "");
//   params.append("bio", "");
//   params.append("profile", profile);
  // validation before sending to API
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
                                                    <div class="like"></div>
                                                </div>
                                            </div>
                                        </div>`
        });
    }



  const get_product = async () => {
    await axios
    .post(getProductApi)
      .then((data) => {
        load_products(data.data)
      })
      .catch((err) => console.log(err));
  };

  get_product();