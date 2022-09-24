// show modals buttons and modals display:
const login_btn = document.getElementById("login-btn");
const signup_btn = document.getElementById("signup-btn");
const login_seller_btn = document.getElementById("login-seller-btn");
const signup_modal = document.getElementById("signup-modal");
const login_modal = document.getElementById("login-modal");
const login_seller_modal = document.getElementById("login-seller-modal");

// ---Start of show and hide modals Section---
const showLoginModal = () => {
  login_seller_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_modal.classList.remove("display-none");
};
const showSignUpModal = () => {
  login_seller_modal.classList.add("display-none");
  login_modal.classList.add("display-none");
  signup_modal.classList.remove("display-none");
};
const showSellerLoginModal = () => {
  login_modal.classList.add("display-none");
  signup_modal.classList.add("display-none");
  login_seller_modal.classList.remove("display-none");
};
// ---End of Show and hide modals Section---


// show modals on click and hide other modals:
login_btn.addEventListener("click", showLoginModal);
signup_btn.addEventListener("click", showSignUpModal);
login_seller_btn.addEventListener("click", showSellerLoginModal);