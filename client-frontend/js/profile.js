const reply_buttons = document.getElementsByClassName('reply-button');
const close_reply_popup = document.getElementById('close-reply-popup');
const reply_popup = document.getElementById('reply-popup');
const reply_message = document.getElementById('reply-message');
const reply_message_submit = document.getElementById('reply-submit');
const body = document.getElementById('profile-html');

// show reply modal whenever any reply button is clicked:
const showReplyModal = ()=>{
    reply_popup.classList.remove('display-none');
    body.classList.add('disable-pointer');
}

// add event listener for each 'REPLY-button' of messages
for(let btn of reply_buttons){
    btn.addEventListener('click',showReplyModal);
}