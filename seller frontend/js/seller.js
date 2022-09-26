//URL 
const get_seller_info = "http://localhost/seller-backend/receive-seller-info.php";
const top5 = "http://localhost/seller-backend/top5products.php"


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
        shop_description.innerHTML = data.data[0].bio;
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

function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64profile = reader.result.replace("data:", "").replace(/^.+,/, "");
      profile_new_image_show.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
};

var table = document.querySelector('table'), 
    table_meta_container = table.querySelector('thead'), 
    table_data_container = table.querySelector('tbody'),
    data = [
  { 'firstName': 'Scooby', 'lastName': 'Doo', 'birth': 1969 }, 
  { 'firstName': 'Yogi', 'lastName': 'Bear', 'birth': 1958 }, 
  { 'firstName': 'Tom', 'lastName': 'Cat', 'birth': 1940 }, 
  { 'firstName': 'Jerry', 'lastName': 'Mouse', 'birth': 1940 }, 
  { 'firstName': 'Fred', 'lastName': 'Flintstone', 'birth': 1960 }
], n = data.length;
 
var createTable = function(src) {
  var frag = document.createDocumentFragment(), 
      curr_item, curr_p;

      for(var i = 0; i < n; i++) {
        curr_item = document.createElement('tr');
        curr_item.classList.add(((i%2 === 0)?'odd':'even'));
        data[i].el = curr_item;
         
        for(var p in data[i]) {
          if(p !== 'el') {
            curr_p = document.createElement('td');
            curr_p.classList.add('prop__value');
            curr_p.dataset.propName = p;
            curr_p.textContent = data[i][p];
            curr_item.appendChild(curr_p)
          }
        }
         
        frag.appendChild(curr_item);
      }
       
      table_data_container.appendChild(frag);
};

var sortTable = function(entries, type, dir) {  
  entries.sort(function(a, b) { 
    if(a[type] < b[type]) return -dir;
    if(a[type] > b[type]) return dir;
    return 0;
  });
   
  table.dataset.sortBy = type;
   
  for(var i = 0; i < n; i++) {
    entries[i].el.style.order = i + 1;
     
    if((i%2 === 0 && entries[i].el.classList.contains('even')) || 
       (i%2 !== 0 && entries[i].el.classList.contains('odd'))) {
      entries[i].el.classList.toggle('odd');
      entries[i].el.classList.toggle('even');
    }
  }
};

var sortTable = function(entries, type, dir) {  
  entries.sort(function(a, b) { 
    if(a[type] < b[type]) return -dir;
    if(a[type] > b[type]) return dir;
    return 0;
  });
   
  table.dataset.sortBy = type;
   
  for(var i = 0; i < n; i++) {
    entries[i].el.style.order = i + 1;
     
    if((i%2 === 0 && entries[i].el.classList.contains('even')) || 
       (i%2 !== 0 && entries[i].el.classList.contains('odd'))) {
      entries[i].el.classList.toggle('odd');
      entries[i].el.classList.toggle('even');
    }
  }
};




