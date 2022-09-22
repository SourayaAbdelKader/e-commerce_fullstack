const reply_buttons = document.getElementsByClassName('reply-button');
const close_reply_popup = document.getElementById('close-reply-popup');
const reply_popup = document.getElementById('reply-popup');
const reply_message = document.getElementById('reply-message');
const reply_message_submit = document.getElementById('reply-submit');
const main_body = document.getElementById('profile-html');

// show reply modal whenever any reply button is clicked:
const showReplyModal = ()=>{
    reply_popup.classList.remove('display-none');
    main_body.classList.add('disable-pointer');
}
// close reply modal:
const closeReplyModal = ()=>{
    reply_popup.classList.add('display-none');
    main_body.classList.remove("disable-pointer");
}
// submit reply (popup):
const submitReply = ()=>{
    console.log('SUBMITTTT');
    console.log(`REPLY MSG: ${reply_message.value}`);
    closeReplyModal();
}

// add event listener for each 'REPLY-button' of messages
for(let btn of reply_buttons){
    btn.addEventListener('click',showReplyModal);
}
// add event listener to close modal:
close_reply_popup.addEventListener('click',closeReplyModal)
// handling/ testing submit reply button:
reply_message_submit.addEventListener('click',submitReply);