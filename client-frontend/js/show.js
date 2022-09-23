// description buttons switch showing info:
const seller_info_button = document.getElementById("seller-info-button");
const seller_info = document.getElementById("seller-info");
const item_description_button = document.getElementById("description-button");
const item_description = document.getElementById("item-description");

const showItemDescription = () => {
  seller_info.classList.add("display-none");
  seller_info_button.classList.remove("grey-bg");
  item_description_button.classList.add("grey-bg");
  item_description.classList.remove("display-none");
};
const showSellerInfo = () => {
  item_description_button.classList.remove("grey-bg");
  item_description.classList.add("display-none");
  seller_info.classList.remove("display-none");
  seller_info_button.classList.add("grey-bg");
};

seller_info_button.addEventListener("click", showSellerInfo);
item_description_button.addEventListener("click", showItemDescription);
