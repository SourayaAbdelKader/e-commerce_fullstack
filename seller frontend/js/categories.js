// URLS
const receive_categories = "http://localhost/seller-backend/receive_categories.php"
const add_category = "http://localhost/seller-backend/add-categories.php";

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
// ________ for categories page __________

// retrieving categories from db
window.addEventListener("load", () => {
    displayCategories()
});

const displayCategories = async () => {
        const url = receive_categories;
        let params = new URLSearchParams();
        params.append("id", 1);
        await axios
          .post(url, params)
          .then((data) => {
            
            data.data.forEach(element =>{
                console.log(element.id);
            const container = document.getElementById("categories");
            let div = document.createElement('div');
            div.innerHTML = ` <div id="${element.id}" class="category"> 
            <a href="./products.html">
            <p class="category-text"> ${element.name} </p>
            </a>
            <p id="category_id" class="hide displaynone">${element.id} </p>
            </div>`
            container.appendChild(div); 
        
            
        })
    selectedCategory();   
})};

// adding categories on the site and into the db
const add_category_button = document.getElementById("add_category_button");
const add_category_pop_up = document.getElementById("add_category_pop_up");
const add_submit = document.getElementById("add_sumbit");
const category = document.getElementById("category")

add_category_button.addEventListener("click", () => {
    console.log("hi");
    add_category_pop_up.classList.toggle("hide");
    add_submit.addEventListener("click", () => {
         const new_category = document.getElementById("new_category").value ;
    
        if (new_category != "") {
            
            const container = document.getElementById("categories");
            let div = document.createElement('div');
            div.innerHTML = ` <div id="" class="category"> 
            <a href="./products.html">
            <p class="category-text">  </p>
            </a>
            <p id="category_id" class="hide displaynone"> ${new_category} </p>
            </div>`
            container.appendChild(div);   
            
            const add_categories = async () => {
                const url = add_category;
                let params = new URLSearchParams();
                params.append("name", new_category)
                params.append("seller_id", 1);
                await axios
                .post(url, params)
                .then((data) => {
                    console.log(data);
                })};
            
            add_categories();

            document.getElementById("new_category").value= "";
        } else { console.log("empty input"); alert("empty input");}
})});

// know the selected category, this function catches the category if from the selected div to save it to the local sorage 
const selectedCategory = () => {
    const selected_category = document.querySelectorAll(".category")
    console.log(selected_category.length + "hhhh")
    selected_category.forEach(category => {
        category.addEventListener("click", () =>  {
            localStorage.setItem("selected_category", category.id);
            console.log(category.id)
        })
})};