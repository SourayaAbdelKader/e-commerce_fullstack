// URLS 
const receive_category_url = "http://localhost/seller-backend/receive_categories.php";
const receive_products_url = "http://localhost/seller-backend/receive_products.php";
const add_product_url = "http://localhost/seller-backend/add_product.php";
const add_ad_url = "http://localhost/seller-backend/add_ad.php";
const add_discount_url = "http://localhost/seller-backend/add_discount.php";
const receive_ads_url = "http://localhost/seller-backend/receive_ad.php";
const receive_discounts_url = "http://localhost/seller-backend/receive_discount.php";
const edit_product_url = "http://localhost/seller-backend/edit_product.php";
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
        element.classList.add("light-gray")
    })
    element.addEventListener("mouseout", () => {
        element.classList.remove("light-gray")
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
        data.data.forEach(element =>{
            if (element.id == localStorage["selected_category"]) { 
                const title = document.getElementById("category_title");
                title.innerHTML = element.name;}
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
            
            for (let element of data.data){
                console.log(element.id)
            
            const container = document.getElementById("products");
            let div = document.createElement('div');
            div.innerHTML = `<div id="" class="product"> 
            <div class="title section-seperator"> 
                <p id="${element.id}"> ${element.title} </p> 
                <p id="product_id" class="hide displaynone"> ${element.id} </p>
            </div>
            <div class="details"> 
                <div class="description section-seperator"> 
                    <p class="product-subtitle"> Description </p>
                    <div> <p id="product-description"> ${element.description} </p></div>
                </div>
                <div class="price section-seperator">  
                    <p class="product-subtitle"> Price </p>
                    <div> <p id="product-price"> ${element.price} </p></div>
                </div>
                <div class="condition section-seperator">  
                    <p class="product-subtitle"> Condition </p>
                    <div> <p id="product-condition"> ${element.conditon}  </p></div>
                </div>
                <div class="image section-seperator"> 
                    <p class="product-subtitle"> Images </p>
                    <div class="main_image"> <img id="product-main-image" class="product_img" src= ${element.main_image}> </div>
                    <div class="image1"> <img id="product-image1" class="product_img" src=${element.image1}> </div>
                    <div class="image2"> <img id="product-image2" class="product_img" src=${element.image2}> </div>
                </div>
                <div class="discount section-seperator">
                    <p class="product-subtitle"> Discount </p>
                    <div class="discount-code flex"> 
                        <p class="underline"> Discount code: </p>
                        <p id="discount-code"> </p>
                    </div>
                    <div class="discount-percentage flex"> 
                        <p class="underline"> Discount percentage: </p>
                        <p id="discount-percentage">  </p>
                    </div>
                    <div class="edit-delete flex">
                        <div> <button id="add-discount" class="add-discount"> Add </button></div>
                        <div> <button id="delete-discount"> Delete </button></div>
                    </div>
                </div>
                <div class="ads section-seperator">
                    <p class="product-subtitle"> Ad </p>
                    <div>  
                        <p class="underline"> Description </p>
                        <p id="ad-description"> </p>
                    </div>
                    <div class="edit-delete flex">
                        <div> <button  class="add-ad" id="add-ad"> Add </button></div>
                        <div> <button id="delete-ad"> Delete </button></div>
                    </div>
                </div>
            </div>
            <div class="edit-delete flex">
                <div> <a href="./edit.html"> <button id="edit-product" class="selected text-white" type="submit"> Edit </button> </a> </div>
                <div> <button id="delete-product" class="delete-product selected text-white" type="submit"> Delete </button> </div>
            </div>
        </div>`;
        container.appendChild(div);
        receiving_ad(element.id);
        receiving_discount(element.id);

        };
        adding_ads();
        delete_product(); 
        selectedProduct();
        adding_discount();
        editSelectedProduct();    
})};

 displayProducts()

// ______ add product _________
const add_product = document.getElementById("add_product");
const add_button = document.getElementById("add_product_button");

add_button.addEventListener("click", function() {
    add_product.classList.toggle("hide");
    const submit_add = document.getElementById("submit_add")
    submit_add.addEventListener("click", () => {
        const new_name = document.getElementById("new_name").value;
        const new_description = document.getElementById("new_description").value;
        const new_price = document.getElementById("new_price").value;
        const new_conditon = document.getElementById("new_condition").value;
        const main_image = document.getElementById("main_image");
        const image1 = document.getElementById("image1");
        const image2 = document.getElementById("image2");


        const container = document.getElementById("products");
        let div = document.createElement('div');
        div.innerHTML = `<div id="" class="product"> 
        <div class="title section-seperator"> 
            <p id="product-title"> ${new_name} </p> 
            <p id="product_id" class="hide displaynone"> </p>
        </div>
        <div class="details"> 
            <div class="description section-seperator"> 
                <p class="product-subtitle"> Description </p>
                <div> <p id="product-description"> ${new_description} </p></div>
            </div>
            <div class="price section-seperator">  
                <p class="product-subtitle"> Price </p>
                <div> <p id="product-price"> ${new_price} </p></div>
            </div>
            <div class="condition section-seperator">  
                <p class="product-subtitle"> Condition </p>
                <div> <p id="product-condition"> ${new_conditon}  </p></div>
            </div>
            <div class="image section-seperator"> 
                <p class="product-subtitle"> Images </p>
                <div class="main_image"> <img id="product-main-image" class="product_img" src= ${main_image}> </div>
                <div class="image1"> <img id="product-image1" class="product_img" src=${image1}> </div>
                <div class="image2"> <img id="product-image2" class="product_img" src=${image2}> </div>
            </div>
            <div class="discount section-seperator">
                <p class="product-subtitle"> Discount </p>
                <div class="discount-code flex"> 
                    <p class="underline"> Discount code: </p>
                    <p id="discount-code"> </p>
                </div>
                <div class="discount-percentage flex"> 
                    <p class="underline"> Discount percentage: </p>
                    <p id="discount-percentage">  </p>
                </div>
                <div class="edit-delete flex">
                    <div> <button id="add-discount" class="add-discount"> Add </button></div>
                    <div> <button id="delete-discount"> Delete </button></div>
                </div>
            </div>
            <div class="ads section-seperator">
                <p class="product-subtitle"> Ad </p>
                <div>  
                    <p class="underline"> Description </p>
                    <p id="ad-description" class="ad_decsription" > </p>
                </div>
                <div class="edit-delete flex">
                    <div> <button  class="add-ad" id="add-ad"> Add </button></div>
                    <div> <button id="delete-ad"> Delete </button></div>
                </div>
            </div>
        </div>
        <div class="edit-delete flex">
            <div> <a href="./edit.html"> <button id="edit-product" class="selected text-white" type="submit"> Edit </button> </a> </div>
            <div> <button id="delete-product" class="delete-product selected text-white" type="submit"> Delete </button> </div>
        </div>
    </div>`;
    container.appendChild(div);

        document.getElementById("new_name").value = "";
        document.getElementById("new_description").value = "";
        document.getElementById("new_price").value = "";
        document.getElementById("new_condition").value = "";



        const addProducts = async () => {
            const url = add_product_url;
            let params = new URLSearchParams();
            params.append("categorie_id", localStorage.getItem("selected_category"));
            params.append("title", new_name);
            params.append("description", new_description);
            params.append("price", new_price);
            params.append("main_image", localStorage.getItem("main_image"));
            params.append("image1", localStorage.getItem("image1"));
            params.append("image2", localStorage.getItem("image2"));
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
    const selected_products = document.querySelectorAll(".product")
    console.log(selected_products.length)
    selected_products.forEach(product => {
        product.addEventListener("click", function () {
            childDiv = product.getElementsByTagName('p')[0],
            console.log(childDiv.id);
            localStorage.setItem("selected_product", childDiv.id);
            console.log(localStorage.getItem("selected_product"))
        });
})};


// a function to retrieve an ad of a certain product
const receiving_ad = async (id) => {
    const url = receive_ads_url;
    let params = new URLSearchParams();
    params.append("product_id", id);
    await axios
      .post(url, params)
      .then((data) => {
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
                    params.append("product_id",localStorage.getItem("selected_product"));
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
                    params.append("product_id", localStorage.getItem("selected_product"));
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
    button.addEventListener("click", function() {
        console.log("delete");
        const product_selected = document.getElementById(localStorage.getItem("selected_product"));
        product_selected.classList.add("hide");
        product_selected.classList.add("displaynone");

        const delete_product_db = async () => {
            const url = add_discount_url;
            let params = new URLSearchParams();
            params.append("product_id", localStorage.getItem("selected_product"));
            await axios
              .post(url, params)
              .then((data) => {
                console.log(data)})};

        delete_product_db();
    })
})};



// edit a product 
const editSelectedProduct = () => {
    const submit_editing = document.getElementById("submit_edit_button");
    submit_editing.addEventListener("click", function () {
        // Variables
        const edited_name = document.getElementById("edited_name").value;
        const edited_description = document.getElementById("edited_description").value;
        const edited_price = document.getElementById("edited_price").value;
        const edited_condition = document.getElementById("edited_condition").value;
        const edited_main_image = document.getElementById("upload_main_image");
        const edited_image1 = document.getElementById("upload_image1");
        const edited_image2 = document.getElementById("upload_image2");
        
        const editProducts = async () => {
            const url = edit_product_url;
            let params = new URLSearchParams();
            params.append("product_id", localStorage.getItem("selected_product"));
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
})};

const main_image_button = document.getElementById("main_image");

main_image_button.addEventListener("change", e => {
        const reader = new FileReader();
        let file = main_image_button.files[0];
        console.log(file);
        reader.addEventListener("load", () => {
            let image = reader.result;
            localStorage.setItem("main_image", image)
        });
        
        reader.readAsDataURL(file);
    });

const image1_buttons = document.getElementById("image1");

image1_buttons.addEventListener("change", e => {
    const reader = new FileReader();
    let file = image1_buttons.files[0];
    console.log(file);
    reader.addEventListener("load", () => {
        let image = reader.result;
        localStorage.setItem("image1", image)
    });
    
    reader.readAsDataURL(file);
});

const image2_buttons = document.getElementById("image2");

image2_buttons.addEventListener("change", e => {
    const reader = new FileReader();
    let file = image2_buttons.files[0];
    console.log(file);
    reader.addEventListener("load", () => {
        let image = reader.result;
        localStorage.setItem("image2", image)
    });
    
    reader.readAsDataURL(file);
});