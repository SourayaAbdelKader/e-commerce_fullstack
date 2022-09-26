//  admin
const add_seller = document.querySelector("#add_seller");
const popup_addseller = document.querySelector("#popup_addseller");
const close_addpopup = document.querySelector("#close-addpopup");
const body = document.querySelector("body");
const logoutBtn = document.querySelector("#logoutBtn");
const registered_user = document.querySelector("#registered_user");
const edit_location = document.querySelector("#edit-location");
const edit_bio = document.querySelector("#edit-bio");
const edit_phone = document.querySelector("#edit-phone");
const edit_name = document.querySelector("#edit-name");
const edit_img = document.querySelector("#edit-img");
const update = document.querySelector("#update");
const add_new_seller = document.querySelector("#add_new_seller");
const add_imgurl = document.querySelector("#add_imgurl");
const add_img = document.querySelector("#add-img");
const error = document.querySelector("#error");
const error2 = document.querySelector("#error2");

//api
const api_getUser = "http://localhost/ecommerce-server/get_users.php";
const api_getUserById = "http://localhost/ecommerce-server/get_userByid.php";
const api_editSeller = " http://localhost/ecommerce-server/edit_seller.php";
const api_delete = "http://localhost/ecommerce-server/delete_user.php";
const api_checkEmail = "http://localhost/ecommerce-server/check_email.php";
const api_siginUp = "http://localhost/ecommerce-server/sigup.php";
// global base64String
var base64string_profile;

//check if login
let userInfo = localStorage.getItem("user");
const checkLogin = () => {
  userInfo = localStorage.getItem("user");
  if (userInfo == null) {
    window.location.href = "admin.html";
  }
};

checkLogin();

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "admin.html";
});

// add new seller info popup
add_seller.addEventListener("click", () => {
  popup_addseller.classList.add("popup_seller");
  body.classList.add("overflow");
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  popup_addseller.classList.remove("d-none");
});
close_addpopup.addEventListener("click", () => {
  popup_addseller.classList.remove("popup_seller");
  body.classList.remove("overflow");
  popup_addseller.classList.add("d-none");
});

// add new seller
add_new_seller.addEventListener("click", () => {
  createNewUser();
});

// show new image whenever image in signup modal changes by user
add_imgurl.addEventListener("change", uploadImage);

function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64string_profile = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      add_img.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
}

// Start of Signup submit to API (create new user) //
const createNewUser = async () => {
  let name = document.querySelector("#addNew-name");
  let email = document.querySelector("#addNew-email");
  let phone = document.querySelector("#addNew-phone");
  let bio = document.querySelector("#addNew-bio");
  let shop_location = document.querySelector("#addNew-shop-location");
  if (
    shop_location.value != "" &&
    bio.value != "" &&
    name.value != "" &&
    phone.value != "" &&
    email.value != ""
  ) {
    email.classList.remove("danger");
    // check if email is already found
    let repeated = false;
    const check_email = async () => {
      await axios
        .get(`${api_checkEmail}?email=${email.value}`)
        .then((data) => {
          const found = JSON.stringify(data.data[0].found);
          if (found > 0) {
            repeated = true;
          }
        })
        .catch((err) => console.log(err.response));
    };

    await check_email();

    // if email is repeated
    if (repeated) {
      email.classList.add("danger");
      //show message about repeated email
      return;
    }

    const profile = base64string_profile ? base64string_profile : "";

    let params = new URLSearchParams();
    params.append("name", name.value);
    params.append("email", email.value);
    params.append("password", "12345");
    params.append("phone_number", phone.value);
    params.append("user_type", "seller");
    params.append("shop_location", shop_location.value);
    params.append("bio", bio.value);
    params.append("image_url", profile);

    const add_user = async () => {
      await axios
        .post(api_siginUp, params)
        .then((data) => {
          console.log(data);
          if (data.data) {
            location.reload();
          }
        })
        .catch((err) => console.log(err));
    };
    if (!repeated) {
      add_user();
    }
  } else {
    error2.classList.remove("d-none");
  }
};

// when update btn click to update seller
update.addEventListener("click", async () => {
  let shoplocation = edit_location.value;
  let bio = edit_bio.value;
  let phone = edit_phone.value;
  let name = edit_name.value;
  let id = update.getAttribute("data-value");
  if (shoplocation != "" && bio != "" && name != "" && phone != "") {
    let params = new URLSearchParams();
    params.append("id", id);
    params.append("name", name);
    params.append("phone_number", phone);
    params.append("bio", bio);
    params.append("shop_location", shoplocation);

    await axios
      .post(api_editSeller, params)
      .then((data) => {
        if (data.data) {
          location.reload();
        }
      })
      .catch((err) => console.log(err.response));
  } else {
    error.classList.remove("d-none");
  }
});

// add event to all edit btn when all seller card loaded
const editSellerPopUp = () => {
  const edit_btn = document.querySelectorAll(".edit");
  const close_popup = document.querySelector("#close-popup");
  const popup_seller = document.querySelector("#popup_seller");

  // edit seller pop up
  edit_btn.forEach((btn) => {
    btn.addEventListener("click", () => {
      popup_seller.classList.add("popup_seller");
      body.classList.add("overflow");
      document.body.scrollTop = 0; // For Safari
      document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
      popup_seller.classList.remove("d-none");
      fill_old_info(btn.getAttribute("data-value"));
    });
  });

  close_popup.addEventListener("click", () => {
    popup_seller.classList.remove("popup_seller");
    body.classList.remove("overflow");
    popup_seller.classList.add("d-none");
  });
};

//fill the edit form data
const fill_old_info = async (id) => {
  let params = new URLSearchParams();
  params.append("id", id);
  await axios
    .post(api_getUserById, params)
    .then((data) => {
      user = data.data;
      if (data.data.length != 0) {
        edit_location.value = user.shop_location;
        edit_bio.value = user.bio;
        edit_phone.value = user.phone_number;
        edit_name.value = user.name;
        edit_img.src = `../../../ecommerce-server/${
          user.image_url == "" ? "user_images/client.png" : user.image_url
        }`;
        update.setAttribute("data-value", user.id);
      }
    })
    .catch((err) => console.log(err.response));
};

// add event to delete btn
const deleteSeller = () => {
  const delete_btns = document.querySelectorAll(".delete");
  delete_btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      let params = new URLSearchParams();
      params.append("id", btn.getAttribute("data-value"));
      await axios
        .post(api_delete, params)
        .then((data) => {
          if (data.data) {
            location.reload();
          }
        })
        .catch((err) => console.log(err.response));
    });
  });
};

// load data seller
const loadData = (data) => {
  // the img will not work without the full path  of url local host just in electron !!!
  data.forEach((element) => {
    registered_user.innerHTML += `
                <div class="seller_card">
                  <div class="user_img">
                      <img src="../../../ecommerce-server/${
                        element.image_url == ""
                          ? "user_images/client.png"
                          : element.image_url
                      }" alt="user image">
                  </div>
                  <h3 class="user_name">${element.name}</h3>
                  <div class="user_info">
                      <p><b>Email: </b>${element.email}</p>
                      <p><b>Phone: </b>${element.phone_number}</p>
                      <p><b>Bio: </b>${element.bio}</p>
                      <p><b>location: </b>${element.shop_location}</p>
                      <p><b>Access: </b>${element.access}</p>
                  </div>
                  <button data-value="${element.id}" class="edit">Edit </button>
                  <button data-value="${
                    element.id
                  }" class="delete">Delete </button>
                 </div>

           `;
  });
};

// get all seller
const getSeller = async () => {
  let params = new URLSearchParams();
  params.append("user_type", "seller");
  await axios
    .post(api_getUser, params)
    .then((data) => {
      if (data.data.length != 0) {
        loadData(data.data);
        // edit btn event
        editSellerPopUp();
        //delete seller btn
        deleteSeller();
      }
    })
    .catch((err) => console.log(err.response));
};

getSeller();
