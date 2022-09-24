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

// retrieving products from db
let j = 0;
const displayProducts = async () => {
        const url = "http://localhost/seller-backend/receive_products.php";
        let params = new URLSearchParams();
        params.append("categorie_id", 1);

        await axios
          .post(url, params)
          .then((data) => {
            console.log(data)
            console.log(data.data)
            console.log(data.data.length)
            
            data.data.forEach(element =>{
                console.log(element)
            const product_title = document.getElementById("product-title");
            const product_description = document.getElementById("product-description");
            const product_price = document.getElementById("product-price");
            const product_condition = document.getElementById("product-condition");
            const product_mainimage = document.getElementById("product-main-image");
            const product_image1 = document.getElementById("product-image1");
            const product_image2 = document.getElementById("product-image2");
            
            const container = document.getElementById("products");
            const div = document.getElementById("product");
            const number = document.getElementById("product_id")
            const clone = div.cloneNode(true);
            clone.classList.add("product");
            clone.classList.add("show");
            clone.classList.remove("displaynone")
            number.innerHTML = number;
            clone.id = j;
            number.innerHTML = element.id;
            
                
            product_title.innerHTML = element.title;
            product_description.innerHTML = element.description;
            product_price.innerHTML = element.price;
            product_condition.innerHTML = element.condition;

            container.appendChild(clone);
            j ++;
        })

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
        const image1 = document.getElementById("image1");
        const image2 = document.getElementById("image2");
        console.log(new_name)
        console.log("hi")

        
            const product_title = document.getElementById("product-title");
            const product_description = document.getElementById("product-description");
            const product_price = document.getElementById("product-price");
            const product_condition = document.getElementById("product-condition");
            const product_mainimage = document.getElementById("product-main-image");
            const product_image1 = document.getElementById("product-image1");
            const product_image2 = document.getElementById("product-image2");
            
            const container = document.getElementById("products");
            const div = document.getElementById("product");
            const number = document.getElementById("product_id")
            const clone = div.cloneNode(true);
            clone.classList.add("product");
            clone.classList.add("show");
            clone.classList.remove("displaynone")
            clone.id = j;
                
            product_title.innerHTML = new_name;
            product_description.innerHTML = new_description;
            product_price.innerHTML = new_price;
            product_condition.innerHTML = new_conditon;

            container.appendChild(clone);
            j ++;  

        
    })
})