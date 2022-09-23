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
const edit_profile_img_input = document.getElementById("edit-profile-img-url");
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

//on window load
const checkCurrentUser = () => {
  const user = localStorage.getItem("user");
  if (!user) window.location.href = "./register.html";
  return JSON.parse(user);
};
const showUserData = () => {
  const user = checkCurrentUser();
  profile_user_image.src = user.profile;
  profile_user_name.textContent = user.name;
  if (user.bio) profile_user_bio.textContent = user.bio;
  else profile_user_bio.innerHTML = `<i class="grey-text">NO BIO YET</i>`;
};

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
const loadUserData = () => {
  //load user data to edit-profile inputs
  const user = checkCurrentUser();
  profile_new_image_show.src = user.profile;
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

// START OF REPLY MODAL EVENT LISTENERS
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
// START OF EDIT PROFILE MODAL EVENT LISTENERS
// Adding currentUser Data to profile:
window.addEventListener("load", showUserData);
