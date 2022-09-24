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
// ________ for categories page __________

// retrieving categories from db
window.addEventListener("load", () => {
    displayCategories()
});

let i = 0;
const displayCategories = async () => {
        const url = "http://localhost/seller-backend/receive_categories.php";
        let params = new URLSearchParams();
        params.append("id", 1);
        await axios
          .post(url, params)
          .then((data) => {
            console.log(data)
            console.log(data.data)
            console.log(data.data.length)
            
            data.data.forEach(element =>{
            
            const container = document.getElementById("categories")
            const div = document.getElementById("category")
            const clone = div.cloneNode(true);
            clone.classList.add("category");
            clone.classList.add("show");
            clone.classList.remove("displaynone")
            clone.id = i;
            clone.innerHTML= '<a href="products.html">' + element.name + '</a>';
            container.appendChild(clone);
            i ++;
        })
          .catch((err) => console.log(err));
})};

// adding categories on the site and into the db
const add_category_button = document.getElementById("add_category_button");
const add_category_pop_up = document.getElementById("add_category_pop_up");
const add_submit = document.getElementById("add_sumbit");
const category = document.getElementById("category")

const add_categories = async (name) => {
    const url = "http://localhost/seller-backend/add_categories.php";
    let params = new URLSearchParams();
    params.append("name", name)
    params.append("seller_id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        console.log(data);
    })
     
};

add_category_button.addEventListener("click", () => {
    console.log("hi");
    add_category_pop_up.classList.toggle("hide");
    add_submit.addEventListener("click", () => {
         const new_category = document.getElementById("new_category").value ;
    
        if (new_category != "") {
            console.log(new_category);
            const container = document.getElementById("categories")
            const div = document.getElementById("category")
            const clone = div.cloneNode(true);
            clone.classList.add("show");
            clone.classList.add("category")
            clone.classList.remove("displaynone");
            clone.innerHTML='<a href="products.html">' + new_category + '</a>';
            clone.id = i
            container.appendChild(clone); 
            i++;   
            add_categories(new_category)   
        } else { console.log("empty input"); alert("empty input");}
})});