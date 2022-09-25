// URLS 
const receive_category_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive_categories.php";
const receive_products_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive_products.php";
const add_product_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/add_product.php";
const add_ad_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/add_ad.php";
const add_discount_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/add_discount.php";
const receive_ads_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive_ad.php";
const receive_discounts_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive_discount.php";
const edit_product_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/edit_product.php";
//get today's date:
const getTodayDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
};

// _________ for all pages ________________________________
// hoover pannel choices

const hoover_elements = document.querySelectorAll(".choices");

hoover_elements.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("dark-gray")
    })
    element.addEventListener("mouseout", () => {
        element.classList.remove("dark-gray")
    })
})

// ___________ Products _____________
// get the category name 
const displayCategoryTitle = async () => {
    const url = receive_category_url;
    let params = new URLSearchParams();
    params.append("id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        console.log("hi")
        data.data.forEach(element =>{
            if (element.id == localStorage["selected_category"]) { 
                const title = document.getElementById("category_title");
                title.innerHTML = element.name;
                console.log(element.name)}
})})}
        

displayCategoryTitle();

// retrieving products from db

const displayProducts = async () => {
        const url = receive_products_url;
        let params = new URLSearchParams();
        params.append("categorie_id", localStorage["selected_category"]);
        await axios
          .post(url, params)
          .then((data) => {
            console.log(data)
            console.log(data.data)
            console.log(data.data.length)
            
            for (let element of data.data){
                console.log(element)
            const product_title = document.getElementById("product-title");
            const product_description = document.getElementById("product-description");
            const product_price = document.getElementById("product-price");
            const product_condition = document.getElementById("product-condition");
            const product_mainimage = document.getElementById("product-main-image");
            const product_image1 = document.getElementById("product-image1");
            const product_image2 = document.getElementById("product-image2");
            const product_id = document.getElementById("product_id")

            const container = document.getElementById("products");
            const div = document.getElementById("product");
            const clone = div.cloneNode(true);
            product_id.innerHTML = element.id;
            (console.log(product_id.innerHTML));

            product_title.innerHTML = element.title;
            product_description.innerHTML = element.description;
            product_price.innerHTML = element.price;
            product_condition.innerHTML = element.condition;
            product_mainimage.src = element.main_image;
            product_image1.src = element.image1;
            product_image2.src = element.image2;

            receiving_ad(element.id);
            receiving_discount(element.id);

            // adding the ad to the product 

            container.appendChild(clone);

        };

        adding_ads();
        delete_product(); 
        selectedProduct();
        adding_discount();
        
        
       })
 }

 displayProducts()

// ______ add product _________
const add_product = document.getElementById("add_product")
const add_button = document.getElementById("add_button")

add_button.addEventListener("click", () => {
    add_product.classList.toggle("hide");
    const submit_add = document.getElementById("submit_add")
    submit_add.addEventListener("click", () => {
        const new_name = document.getElementById("new_name").value;
        const new_description = document.getElementById("new_description").value;
        const new_price = document.getElementById("new_price").value;
        const new_conditon = document.getElementById("new_condition").value;
        const main_image = document.getElementById("main_image").value;
        const image1 = document.getElementById("image1").value;
        const image2 = document.getElementById("image2").vallue;
        console.log(new_name)

        // for the cloning
        const product_title = document.getElementById("product-title");
        const product_description = document.getElementById("product-description");
        const product_price = document.getElementById("product-price");
        const product_condition = document.getElementById("product-condition");
        const product_mainimage = document.getElementById("product-main-image");
        const product_image1 = document.getElementById("product-image1");
        const product_image2 = document.getElementById("product-image2");
            
        const container = document.getElementById("products");
        const div = document.getElementById("product");
        const clone = div.cloneNode(true);
        clone.classList.add("product");
        clone.classList.add("show");
        clone.classList.remove("displaynone")
                
        product_title.innerHTML = new_name;
        product_description.innerHTML = new_description;
        product_price.innerHTML = new_price;
        product_condition.innerHTML = new_conditon;
        product_mainimage.src = main_image;
        product_image1.src = image1;
        product_image2.src = image2;

        container.appendChild(clone);

        document.getElementById("new_name").value = "";
        document.getElementById("new_description").value = "";
        document.getElementById("new_price").value = "";
        document.getElementById("new_condition").value = "";


        const addProducts = async () => {
            const url = add_product_url;
            let params = new URLSearchParams();
            params.append("categorie_id", localStorage["selected_category"]);
            params.append("title", new_name);
            params.append("description", new_description);
            params.append("price", new_price);
            params.append("main_image", main_image);
            params.append("image1", image1);
            params.append("image2", image2);
            params.append("condition", new_conditon);
            
            await axios
              .post(url, params)
              .then((data) => {
                console.log(data)})
        }

        addProducts();
        alert("Product added");
    })
})

// to know which product is selected
const selectedProduct = () => {
    const selected_product = document.querySelectorAll(".product")
    selected_product.forEach((product) => {
        console.log(product.id)
        product.addEventListener("click", () =>  {
            localStorage.setItem("selected_product", product.id);
            console.log(product.id)
        })
})};


// a function to retrieve an ad of a certain product
const receiving_ad = async (id) => {
    const url = receive_ads_url;
    let params = new URLSearchParams();
    params.append("product_id", id);
    await axios
      .post(url, params)
      .then((data) => {
        console.log("ad");
        console.log(data.data[0]);
        const display_description = document.getElementById("ad-description");
        display_description.innerHTML = data.data[0].description;     
})};

// a function to retrieve a discount of a certain product
const receiving_discount = async (id) => {
    const url = receive_discounts_url;
    let params = new URLSearchParams();
    params.append("product_id", id);
    await axios
      .post(url, params)
      .then((data) => {
        console.log("discount");
        console.log(data.data[0]);
        const display_code = document.getElementById("discount-code");
        const display_percentage = document.getElementById("discount-percentage");
        display_code.innerHTML = data.data[0].code; 
        display_percentage.innerHTML = data.data[0].percentage;   
})};



// to the ad pop up to show and catch description
const adding_ads = () => {
    const add_ad = document.querySelectorAll(".add-ad");
    const pop_up_ad = document.getElementById("pop-up-ad");

    add_ad.forEach(button => {
        button.addEventListener("click", () => {
            pop_up_ad.classList.toggle("hide");
            const add_ad_description = document.getElementById("submit-ad");
            add_ad_description.addEventListener("click", () => {
                const ad_description = document.getElementById("new_ad").value;
                const ad_main_descriptin = document.getElementById("ad-description");
                ad_main_descriptin.innerHTML = ad_description;
                pop_up_ad.classList.toggle("hide");
                document.getElementById("new_ad").value = "";
                
                // sending the data into the database
                const add_ads = async () => {
                    const url = add_ad_url;
                    let params = new URLSearchParams();
                    params.append("product_id", 3);
                    params.append("description", ad_description);
                    await axios
                      .post(url, params)
                      .then((data) => {
                        console.log(data)});}
        add_ads();
})})})};

// to add the discount pop up 
const adding_discount = () => {
    const add_discount = document.querySelectorAll(".add-discount");
    const pop_up_discount = document.getElementById("pop_up_discount");
    console.log(add_discount.length)
    add_discount.forEach(button => {
        button.addEventListener("click", () => {
            console.log("discount")
            pop_up_discount.classList.toggle("hide");
            const add_discount_button = document.getElementById("submit_discount_button");

            add_discount_button.addEventListener("click", () => {
                const input_code = document.getElementById("input_code").value;
                const input_percentage = document.getElementById("input_percentage").value;

                const code_place = document.getElementById("discount-code");
                const percentage_place = document.getElementById("discount-percentage");

                code_place.innerHTML = input_code;
                percentage_place.innerHTML = input_percentage;
                pop_up_discount.classList.toggle("hide");
                document.getElementById("input_percentage").value = "";
                document.getElementById("input_code").value = "";

                // sending the data into the database
                const add_discount = async () => {
                    const url = add_discount_url;
                    let params = new URLSearchParams();
                    params.append("product_id", 3);
                    params.append("code", input_code);
                    params.append("percentage", input_percentage);
                    await axios
                    .post(url, params)
                    .then((data) => {
                        console.log(data)})};
            add_discount();
        })
})})}

// delete a product 
const delete_product = () => {
    const delete_button = document.querySelectorAll(".delete-product");
    console.log(delete_button.length)
    delete_button.forEach(button => {
    button.addEventListener("click", () => {
        console.log("delete");
        const product_selected = document.getElementById("product");
        product_selected.classList.add("hide");
        product_selected.classList.add("displaynone");

        const delete_product_db = async () => {
            const url = add_discount_url;
            let params = new URLSearchParams();
            params.append("product_id", );
            params.append("code", input_code);
            params.append("percentage", input_percentage);
            await axios
              .post(url, params)
              .then((data) => {
                console.log(data)})};

        delete_product_db();
    })
})};



// edit a product 
const submit_editing = document.getElementById("submit_edit");
submit_editing.addEventListener("click", () => {
    // Variables
    const edited_name = document.getElementById("edited_name").value;
    const edited_description = document.getElementById("edited_description").value;
    const edited_price = document.getElementById("edited_price").value;
    const edited_condition = document.getElementById("edited_condition").value;
    const edited_main_image = document.getElementById("upload_main_image").value;
    const edited_image1 = document.getElementById("upload_image1").value;
    const edited_image2 = document.getElementById("upload_image2").value;
    
    const editProducts = async () => {
        const url = edit_product_url;
        let params = new URLSearchParams();
        params.append("product_id", iproduct_id);
        params.append("title", edited_name);
        params.append("description", edited_description);
        params.append("price", edited_price);
        params.append("condition", edited_condition);
        params.append("main_image", edited_main_image);
        params.append("image1", edited_image1);
        params.append("image2", edited_image2);
        
        await axios
          .post(url, params)
          .then((data) => {
            console.log(data)})
    }
    editProducts();
})

const main_image_buttons = document.querySelectorAll(".main_image");

main_image_buttons.forEach(element =>{ 
    element.addEventListener("click", () => {

    })
})

const image1_buttons = document.querySelectorAll(".image1");

image1_buttons.forEach(element =>{ 
    element.addEventListener("click", () => {
        
    })
})

const image2_buttons = document.querySelectorAll(".image2");

image2_buttons.forEach(element =>{ 
    element.addEventListener("click", () => {
        
    })
})