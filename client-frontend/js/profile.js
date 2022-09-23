const reply_buttons = document.getElementsByClassName("reply-button");
const close_reply_popup = document.getElementById("close-reply-popup");
const reply_popup = document.getElementById("reply-popup");
const reply_message = document.getElementById("reply-message");
const reply_message_submit = document.getElementById("reply-submit");
const main_body = document.getElementById("profile-html");
// edit profile:
const edit_profile_button_show = document.getElementById("edit-profile-button");
const edit_profile_modal = document.getElementById("edit-profile-popup");
const close_profile_popup = document.getElementById("close-profile-popup");
const edit_profile_img_input = document.getElementById("edit-profile-imgurl");
const edit_profile_new_name = document.getElementById("edit-profile-new-name");
const edit_profile_new_bio = document.getElementById("edit-profile-new-bio");
const edit_profile_submit = document.getElementById("edit-profile-submit");
//profile user content:
const profile_user_image = document.getElementById("profile-img");
const profile_user_name = document.getElementById("profile-name");
const profile_user_bio = document.getElementById("profile-bio");
// edit profile inputs:
const profile_new_image_show = document.getElementById("edit-profile-new-img");
const profile_new_name = document.getElementById("profile-new-name");
const profile_new_bio = document.getElementById("profile-new-bio");
// base64profile
var base64profile;

// show image and save url (signup)
function uploadImage() {
  if (this.files && this.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      base64profile = reader.result.replace("data:", "").replace(/^.+,/, "");
      profile_new_image_show.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
  }
}

//START OF ON WINDOW.LOAD
const checkCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (!user) window.location.href = "./register.html";
  return JSON.parse(user);
};
const showUserData = () => {
  const user = checkCurrentUser();
  if (user.profile) profile_user_image.src = user.profile;
  else profile_user_image.src = "./assets/dummy-profile.png";
  profile_user_name.textContent = user.name;
  if (user.bio) profile_user_bio.textContent = user.bio;
  else profile_user_bio.innerHTML = `<i class="grey-text">NO BIO YET</i>`;
};
const getAllReceivedMessages = () => {
  const user = checkCurrentUser();

  const get_messages = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/get_messages.php";
    let params = new URLSearchParams();
    params.append("receiver_id", user.id);
    await axios
      .post(url, params)
      .then((data) => {
        const messages = JSON.stringify(data.data);
        addMessageToHTML(messages);
      })
      .catch((err) => console.log(err));
  };
  get_messages();
};
//END OF ON WINDOW.LOAD

// START OF REPLY POPUP
// show reply modal whenever any reply button is clicked:
const showReplyModal = () => {
  reply_popup.classList.remove("display-none");
  main_body.classList.add("disable-pointer");
};
// close reply modal:
const closeReplyModal = () => {
  reply_popup.classList.add("display-none");
  main_body.classList.remove("disable-pointer");
};
// submit reply (popup):
const submitReply = () => {
  console.log("SUBMITTTT");
  console.log(`REPLY MSG: ${reply_message.value}`);
  closeReplyModal();
};
// END OF REPLY POPUP

// START OF PROFILE POPUP
// update user in db:
const updateUserInDB = () => {
  const profile = base64profile ? base64profile : "";

  const user = checkCurrentUser();
  console.log(user.name);
  console.log(user.bio);
  let params = new URLSearchParams();
  params.append("client_id", user.id);
  params.append("new_name", user.name);
  params.append("email", user.email);
  params.append("new_bio", user.bio);
  params.append("profile", profile);
  // validation before sending to API
  const update_user = async () => {
    const url =
      "http://localhost/e-commerce_fullstack/ecommerce-server/update_profile.php";
    await axios
      .post(url, params)
      .then((data) => {
        console.log(JSON.stringify(data));
      })
      .catch((err) => console.log(err));
  };
  update_user();
};
// update user profile - data in local host and db:
const updateLocalUser = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // update the user name and bio locally directly, but if there is a new image don't affect found one but return the new base64
  if (profile_new_name.value) user.name = profile_new_name.value;
  if (profile_new_bio.value) user.bio = profile_new_bio.value;
  localStorage.setItem("user", JSON.stringify(user));
};
const updateUserData = () => {
  updateLocalUser();
  updateUserInDB();
  const user = JSON.parse(localStorage.getItem("user"));
  // update shown data directly
  if (user.profile) profile_user_image.src = user.profile;
  profile_user_name.textContent = user.name;
  profile_user_bio.textContent = user.bio;
  closeProfileModal();
};
const loadUserData = () => {
  //load user data to edit-profile inputs
  const user = checkCurrentUser();
  if (user.profile) profile_new_image_show.src = user.profile;
  profile_new_name.value = user.name;
  if (user.bio) profile_new_bio.value = user.bio;
};
const showEditProfileModal = () => {
  //make sure reply modal is closed
  closeReplyModal();
  loadUserData();
  edit_profile_modal.classList.remove("display-none");
  main_body.classList.add("disable-pointer");
};
const closeProfileModal = () => {
  edit_profile_modal.classList.add("display-none");
  main_body.classList.remove("disable-pointer");
};
// END OF PROFILE POPUP

// ----------START OF EVENT LISTENERS-----------
// add event listener for each 'REPLY-button' of messages
for (let btn of reply_buttons) {
  btn.addEventListener("click", showReplyModal);
}
// add event listener to close modal:
close_reply_popup.addEventListener("click", closeReplyModal);
reply_message_submit.addEventListener("click", submitReply);
// END OF REPLY MODAL EVENT LISTENERS

// START OF EDIT PROFILE MODAL EVENT LISTENERS
edit_profile_button_show.addEventListener("click", showEditProfileModal);
close_profile_popup.addEventListener("click", closeProfileModal);
edit_profile_submit.addEventListener("click", updateUserData);
// END OF EDIT PROFILE MODAL EVENT LISTENERS

// Adding currentUser Data to profile:
window.addEventListener("load", showUserData);
// whenever image link is change - refind it's base64
edit_profile_img_input.addEventListener("change", uploadImage);
// load all messages received to this user_id when window loads:
window.addEventListener("load", getAllReceivedMessages);
// --------END OF EVENT LISTENERS-------------

{
  /* <div class="single-chat">
  <div class="chat">
    <img
      class="shop-profile"
      src="./assets/dummy-profile.png"
      alt="shop profile"
    />
    <span class="shop-name" id="shop-name">
      Ali Rida
    </span>
    <span class="date" id="last-message-date">
      10m
    </span>
  </div>
  <p id="message-text">Lorem ipsum dolor sit amet.</p>
  <div class="reply-button">
    <button class="btn btn-sm grey-bg">Reply</button>
  </div>
</div>; */
}
