// show modals btns and modals display:
const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");
const login_seller_btn = document.getElementById("login-seller-btn");
const signup_modal = document.getElementById("signup-modal");
const login_modal = document.getElementById("login-modal");
const login_seller_modal = document.getElementById("login-seller-modal");
const reset_password_btn = document.getElementById("reset-password-show");
const reset_password_modal = document.getElementById("reset-password-modal");
const reset_email = document.getElementById("reset-email");
const reset_submit_btn = document.getElementById("reset-submit");
const new_password_modal = document.getElementById("new-password-modal");
const new_password = document.getElementById("new-password-data");
const new_password_submit = document.getElementById("new-password-submit");
// signup - new user
const signup_submit_btn = document.getElementById("signup-submit");
const signup_name = document.getElementById("signup-name");
const signup_email = document.getElementById("signup-email");
const signup_password = document.getElementById("signup-password");
const signup_phone = document.getElementById("signup-phone");
const signup_profile = document.getElementById("signup-imgurl");
const signup_img_show = document.getElementById("signup-img");
// login - previous user:
const login_client_submit_btn = document.getElementById("login-submit");
const login_client_email = document.getElementById("login-client-email");
const login_client_password = document.getElementById("login-client-password");
// login - previous seller:
const login_seller_submit_btn = document.getElementById("login-seller-submit");
const login_seller_email = document.getElementById("login-seller-email");
const login_seller_password = document.getElementById("login-seller-password");
// global base64String
var base64string_profile;

// localStorage:
const addCurrentUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};
const checkUser = () => {
  const user = localStorage.getItem("user");
  if (user) window.location.href = "./profile.html";
};
// show image and save url (signup)
function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64string_profile = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      signup_img_show.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
}

// ---Start of show and hide modals Section---
const showLoginModal = () => {
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_seller_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_modal.classList.remove("display-none");
};
const showSignUpModal = () => {
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_seller_modal.classList.add("display-none");
  login_modal.classList.add("display-none");
  signup_modal.classList.remove("display-none");
};
const showSellerLoginModal = () => {
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_seller_modal.classList.remove("display-none");
};
const showResetPasswordModal = () => {
  login_modal.classList.add("display-none");
  reset_password_modal.classList.remove("display-none");
};
const sendNewPasswordByEmail = () => {
  const email = reset_email.value;
  console.log(email);
  const check_email = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/check_email.php";
    await axios
      .get(`${url}?email=${email}`)
      .then((data) => {
        if (JSON.stringify(data.data[0].found) === "1") {
          //email found
          console.log("found");
          reset_password_modal.classList.add("display-none");
          new_password_modal.classList.remove("display-none");
          // reset password php - send email
        }
      })
      .catch((err) => console.log(err.response));
  };
  check_email();
};
// ---End of Show and hide modals Section---

// Start of login submit(get exisiting user) //
// create empty cart for new registered user:
const createEmptyCart = async (client_id) => {
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  const url =
    "http://localhost/e-commerce_fullstack/ecommerce-server/create_emptycart.php";
  await axios
    .post(url, params)
    .then((data) => {})
    .catch((err) => console.log(err));
};

const loginUser = (e = "") => {
  e.stopImmediatePropagation();
  e.preventDefault();

  let email = login_client_email.value;
  let password = login_client_password.value;
  let user_type;
  // email and password inputs are filled for client => search for client user_type
  if (email && password) user_type = "client";
  else if (login_seller_email.value && login_seller_password.value) {
    email = login_seller_email.value;
    password = login_seller_password.value;
    user_type = "seller";
  } else if (signup_email.value && signup_password.value) {
    email = signup_email.value;
    password = signup_password.value;
    user_type = "client";
  }
  const user_login = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/login.php";
    await axios
      .get(`${url}?email=${email}&password=${password}&user_type=${user_type}`)
      .then((data) => {
        addCurrentUser(data.data[0]);
        checkUser();
      })
      .catch((err) => console.log(err.response));
  };
  user_login();
};
// End of login submit(get exisiting user) //

// Start of Signup submit to API (create new user) //
const createNewUser = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  const profile = base64string_profile ? base64string_profile : "";

  let params = new URLSearchParams();
  params.append("name", signup_name.value);
  params.append("email", signup_email.value);
  params.append("password", signup_password.value);
  params.append("phone_number", signup_phone.value);
  params.append("user_type", "client");
  params.append("shop_location", "");
  params.append("bio", "");
  params.append("profile", profile);
  // validation before sending to API
  const add_user = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/signup.php";
    await axios
      .post(url, params)
      .then((data) => {
        loginUser(e);
        const user = JSON.parse(localStorage.getItem("user"));
        createEmptyCart(user.id);
      })
      .catch((err) => console.log(err));
  };
  add_user();
};
// End of Signup submit to API (create new user) //

// show modals on click and hide other modals:
login_btn.addEventListener("click", showLoginModal);
signup_btn.addEventListener("click", showSignUpModal);
login_seller_btn.addEventListener("click", showSellerLoginModal);
reset_password_btn.addEventListener("click", showResetPasswordModal);
reset_submit_btn.addEventListener("click", sendNewPasswordByEmail);
// signup and login for users - only login for sellers:
signup_submit_btn.addEventListener("click", createNewUser);
login_client_submit_btn.addEventListener("click", loginUser);
login_seller_submit_btn.addEventListener("click", loginUser);
// show new image whenever image in signup modal changes by user
signup_profile.addEventListener("change", uploadImage);
// on window load if there is a user redirect:
window.addEventListener("load", checkUser);