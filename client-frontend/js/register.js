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

const checkUser = () => {
  const user = localStorage.getItem("user");
  if (user) window.location.href = "./products.html";
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

// reset inputs:
const reset_all_inputs = () => {
  login_client_email.value = "";
  login_client_password.value = "";
  login_seller_email.value = "";
  login_seller_password.value = "";
  signup_name.value = "";
  signup_email.value = "";
  signup_password.value = "";
  signup_phone.value = "";
  signup_img_show.src = "./assets/icons8-customer-96.png";
};

// ---Start of show and hide modals Section---
const showLoginModal = () => {
  reset_all_inputs();
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_seller_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_modal.classList.remove("display-none");
};
const showSignUpModal = () => {
  reset_all_inputs();
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_seller_modal.classList.add("display-none");
  login_modal.classList.add("display-none");
  signup_modal.classList.remove("display-none");
};
const showSellerLoginModal = () => {
  reset_all_inputs();
  reset_password_modal.classList.add("display-none");
  new_password_modal.classList.add("display-none");
  login_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_seller_modal.classList.remove("display-none");
};
const showResetPasswordModal = () => {
  reset_all_inputs();
  login_modal.classList.add("display-none");
  reset_password_modal.classList.remove("display-none");
};
const sendNewPasswordByEmail = async () => {
  reset_all_inputs();
  const email = reset_email.value;
  // console.log(email);

  // check if email is found
  let repeated = false;
  const check_email = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/check_email.php";
    await axios
      .get(`${url}?email=${email}`)
      .then((data) => {
        const found = JSON.stringify(data.data[0]);
        if (found.length > 0) {
          repeated = true;
        }
      })
      .catch((err) => console.log(err.response));
  };

  await check_email();
  // if(!repeated){
  // }else{ //where the work begins:
  // }
  // reset password php - send email
  // is_repeated_email(email);
  // reset_password_modal.classList.add("display-none");
  // new_password_modal.classList.remove("display-none");
};
// ---End of Show and hide modals Section---

// create empty cart for new registered user so we can add to it directly:
const createEmptyCart = async () => {
  const new_user = JSON.parse(localStorage.getItem("user"));
  const client_id = new_user.id;
  let params = new URLSearchParams();
  params.append("client_id", client_id);
  const url =
    "http://localhost/e-commerce_fullstack/ecommerce-server/create_emptycart.php";
  await axios
    .post(url, params)
    .then((data) => {})
    .catch((err) => console.log(err));
};

//login after signup
const postSignUp_loginUser = () => {
  const email = signup_email.value;
  const password = signup_password.value;
  const user_type = "client";

  const user_login = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/login.php";
    await axios
      .get(`${url}?email=${email}&password=${password}&user_type=${user_type}`)
      .then((data) => {
        user = data.data[0];
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        reset_all_inputs();
        createEmptyCart();
      })
      .catch((err) => console.log(err.response));
  };
  user_login();
};

const loginUser = (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  login_client_password.classList.remove("danger");
  let email = login_client_email.value;
  let password = login_client_password.value;
  let user_type = "client";

  // if seller login
  if (login_seller_email.value && login_seller_password.value) {
    email = login_seller_email.value;
    password = login_seller_password.value;
    user_type = "seller";
  }

  if (!password || password.length < 6) {
    login_client_password.classList.add("danger");
  }

  const user_login = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/login.php";
    await axios
      .get(`${url}?email=${email}&password=${password}&user_type=${user_type}`)
      .then((data) => {
        localStorage.setItem("user", JSON.stringify(data.data[0]));
        reset_all_inputs();
      })
      .catch((err) => console.log(err.response));
  };
  user_login();
};
// End of login submit(get exisiting user) //

// validate Signup:
const validateSignUp = () => {
  // reset inputs first:
  const name = signup_name.value;
  const email = signup_email.value;
  const password = signup_password.value;
  const phone_nb = signup_phone.value;
  let valid = true;

  const validEmail = () => {
    const regEx = /[a-z0-9_\.-]{3,}@[a-z0-9_\.-]{5,}/;
    return regEx.test(email);
  };
  const validPhonenb = () => {
    if (phone_nb.length < 11) return false;
    const keyNbs = phone_nb.slice(4, 6);
    const countrycode = phone_nb.slice(0, 4);
    let valid = false;
    if (countrycode == "+961") {
      if (phone_nb.slice(4, 5) == "3" && phone_nb.slice(5).length == "6")
        valid = true;
      else if (
        (keyNbs == "71" || keyNbs == "70" || keyNbs == "76") &&
        phone_nb.slice(6).length == "6"
      )
        valid = true;
    }
    return valid;
  };
  const validName = () => {
    // names can only use letters. not less than 6 letters
    const nameRegex = /[a-zA-Z]{6,}/;
    return nameRegex.test(name);
  };
  const validPassword = () => {
    const regEx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
    return regEx.test(password);
  };

  if (!validEmail()) {
    signup_email.classList.add("danger");
    valid = false;
    console.log("email");
  }
  if (!validPhonenb()) {
    signup_phone.classList.add("danger");
    valid = false;
    console.log("phone");
  }
  if (!validName()) {
    signup_name.classList.add("danger");
    valid = false;
    console.log("name");
  }
  if (!validPassword()) {
    signup_password.classList.add("danger");
    valid = false;
    console.log("pass");
  }

  return valid;
};

// Start of Signup submit to API (create new user) //
const createNewUser = async (e) => {
  e.stopImmediatePropagation();
  e.preventDefault();
  signup_name.classList.remove("danger");
  signup_email.classList.remove("danger");
  signup_password.classList.remove("danger");
  signup_phone.classList.remove("danger");

  if (!validateSignUp()) return; //not valid signup

  // check if email is already found
  let repeated = false;
  const check_email = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/check_email.php";
    await axios
      .get(`${url}?email=${signup_email.value}`)
      .then((data) => {
        const found = JSON.stringify(data.data[0].found);
        console.log(found);
        if (found > 0) {
          repeated = true;
        }
      })
      .catch((err) => console.log(err.response));
  };

  await check_email();

  // if email is repeated
  if (repeated) {
    signup_email.classList.add("danger");
    //show message about repeated email
    console.log('repeated');
    return;
  }

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

  const add_user = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/signup.php";
    await axios
      .post(url, params)
      .then((data) => {
        postSignUp_loginUser();
      })
      .catch((err) => console.log(err));
  };
  add_user();
  // createEmptyCart();
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
