const logoutBtn = document.querySelector("#logoutBtn");
const registered_user = document.querySelector("#registered_user");
// api
const api_getUser = "http://localhost/ecommerce-server/get_users.php";
const api_ban = "http://localhost/ecommerce-server/ban_client.php";
const api_unban = "http://localhost/ecommerce-server/un_ban.php";

let userInfo = localStorage.getItem("user");

// check if login
const checkLogin = () => {
  userInfo = localStorage.getItem("user");
  if (userInfo == null) {
    window.location.href = "admin.html";
  }
};
checkLogin();

//logout btn
logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "admin.html";
});

//btn to ban/unban a user
const ban_user = () => {
  // unban
  const un_btns = document.querySelectorAll(".unbanclient");
  un_btns.forEach((un_btn) => {
    un_btn.addEventListener("click", async () => {
      //id to ban
      let id = un_btn.getAttribute("data-value");
      let params = new URLSearchParams();
      params.append("id", id);
      await axios
        .post(api_unban, params)
        .then((data) => {
          if (data.data) {
            location.reload();
          }
        })
        .catch((err) => console.log(err.response));
    });
  });

  //ban
  const btns = document.querySelectorAll(".ban");
  btns.forEach((btn) => {
    btn.addEventListener("click", async () => {
      //id to ban
      let id = btn.getAttribute("data-value");
      let params = new URLSearchParams();
      params.append("id", id);
      await axios
        .post(api_ban, params)
        .then((data) => {
          if (data.data) {
            location.reload();
          }
        })
        .catch((err) => console.log(err.response));
    });
  });
};

// load client
const loadData = (data) => {
  data.forEach((element) => {
    // the img will not work without the full path  of url local host just in electron !!!

    registered_user.innerHTML += `
    <div class="user_card">
    <div class="user_img"> 
        <img src="../../../ecommerce-server/${
          element.image_url == "" ? "user_images/client.png" : element.image_url
        }" alt="user image">
    </div>
    <h3 class="user_name">${element.name}</h3>
    <div class="user_info">
        <p><b>Email: </b>${element.email}</p>
        <p><b>Phone: </b>${element.phone_number}</p>
        <p><b>Bio: </b>${element.bio}</p>
        <p><b>Access: </b>${element.access}</p>
    </div>
    <button data-value="${element.id}" class="ban_user ${
      element.access == 0 ? "unbanclient" : "ban"
    } ">${element.access == 0 ? "UN Ban Client" : "Ban Client"}</button>
    </div>
    `;
  });
  //add event to ban or un ban
  ban_user();
};

// get all client
const registered_client = async () => {
  let params = new URLSearchParams();
  params.append("user_type", "client");
  await axios
    .post(api_getUser, params)
    .then((data) => {
      if (data.data.length != 0) {
        console.log(data.data);
        loadData(data.data);
      }
    })
    .catch((err) => console.log(err.response));
};

// get all client
registered_client();
