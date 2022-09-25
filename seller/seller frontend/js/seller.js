//URL 
const get_seller_info = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive-seller-info.php";
const top5 = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/top5products.php"


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

// ___________ for the seller page ___________________________
//adding the information on load to the seller page
const getShopInfo = async () => {
    const url = get_seller_info;
      let params = new URLSearchParams();
        params.append("id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        const shop_name = document.getElementById("shop-name");
        const shop_location = document.getElementById("shop-location");
        const shop_phone = document.getElementById("seller_phone_number");
        const shop_mail = document.getElementById("seller_email");
        const shop_description = document.getElementById("description");
        const shop_image = document.getElementById("shop-picture");
        shop_name.innerHTML = data.data[0].name;
        shop_location.innerHTML = data.data[0].shop_location;
        shop_phone.innerHTML = data.data[0].phone_number;
        shop_mail.innerHTML = data.data[0].email;
        shop_description.innerHTML = data.data[0].shop_description;
        shop_image.src = data.data[0].image_url;
        console.log(data.data[0].id);
      })    
    }

// _______________ get top 5 _________
const getTop5 = async () => {
    const url = top5;
      let params = new URLSearchParams();
        params.append("id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        const top1 = document.getElementById("top1");
        const top2 = document.getElementById("top2");
        const top3 = document.getElementById("top3");
        const top4 = document.getElementById("top4");
        const top5 = document.getElementById("top5");

        top1.innerHTML = data.data[0].name;
        top2.innerHTML = data.data[1].name;
        top3.innerHTML = data.data[2].name;
        top4.innerHTML = data.data[3].name;
        top5.innerHTML= data.data[4].name;
      })    
    }


window.addEventListener("load", () => {
    getShopInfo ();
    getTop5 ();
}
);






