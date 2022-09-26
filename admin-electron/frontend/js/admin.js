//chart
const chart = document.querySelector("#chart").getContext("2d");
const chart1 = document.querySelector("#chart1").getContext("2d");
const chart2 = document.querySelector("#chart2").getContext("2d");
const chart3 = document.querySelector("#chart3").getContext("2d");
const chart4 = document.querySelector("#chart4").getContext("2d");
const login_popup = document.querySelector("#login");
const body = document.querySelector("body");
const login_btn = document.querySelector("#login_btn");
const logoutBtn = document.querySelector("#logoutBtn");
const error = document.querySelector("#error");

const mail = document.querySelector("#mail");
const phone = document.querySelector("#phone");
const admin_name = document.querySelector("#name");

// api
const api_loign = "http://localhost/ecommerce-server/login.php";
const api_stat = "http://localhost/ecommerce-server/stat.php";

let userInfo;

const checkLogin = () => {
  userInfo = localStorage.getItem("user");
  if (userInfo != null) {
    userInfo = JSON.parse(userInfo);
    login_popup.classList.remove("login");
    login_popup.classList.add("d-none");
    body.classList.remove("overflow");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    //fill user info
    admin_name.textContent = userInfo.name;
    phone.textContent = userInfo.phone_number;
    mail.textContent = userInfo.email;
  } else {
    login_popup.classList.add("login");
    login_popup.classList.remove("d-none");
    body.classList.add("overflow");
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
};

checkLogin();

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "admin.html";
});

//login
login_btn.addEventListener("click", async (e) => {
  let email = document.getElementById("login-email").value;
  let password = document.getElementById("login-password").value;

  await axios
    .get(`${api_loign}?email=${email}&password=${password}&user_type=admin`)
    .then((data) => {
      user = data.data;
      if (user != null) {
        localStorage.setItem("user", JSON.stringify(user));
        checkLogin();
      } else {
        error.classList.remove("d-none");
      }
    })
    .catch((err) => console.log(err.response));
  e.preventDefault();
});

// goble ops
Chart.defaults.font.family = "Laoto";
Chart.defaults.font.size = 15;
Chart.defaults.font.color = "#777";

const getStat = async () => {
  await axios
    .get(api_stat)
    .then((data) => {
      data = data.data;
      if (data != null) {
        fillChart(data);
      }
    })
    .catch((err) => console.log(err.response));
};
getStat();

const fillChart = (data) => {
  const getNames = (data) => data.map(({ name }) => name);
  const getTotal = (data) => data.map(({ total }) => total);
  const getColors = () => {
    return ["#355c7b", "#36a2eb", "#096698"];
  };

  //nb of Seller Clients Products
  new Chart(chart1, {
    type: "pie",
    data: {
      labels: ["Sellers", "Clients ", "Products"],
      datasets: [
        {
          label: "Population",
          data: [data.sellers, data.clients, data.products],
          backgroundColor: getColors(),
          borderWidth: 1,
          boderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#355c7b",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: " Seller Clients Products",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "rgb(15, 99, 132)",
          },
        },
      },

      layout: {
        padding: 0,
        margin: 0,
      },
    },
  });

  //Top Client IN Week
  let weekClient = data.week;
  new Chart(chart, {
    type: "bar",
    data: {
      labels: getNames(weekClient),
      datasets: [
        {
          label: "Week",
          data: getTotal(weekClient),
          backgroundColor: getColors(),
          borderWidth: 1,
          boderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#355c7b",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Top Client in Week",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "rgb(15, 99, 132)",
          },
        },
      },

      layout: {
        padding: 0,
        margin: 0,
      },
    },
  });

  //Top Client IN month
  let monthClient = data.month;
  new Chart(chart2, {
    type: "bar",
    data: {
      labels: getNames(monthClient),
      datasets: [
        {
          label: "Month",
          data: getTotal(monthClient),
          backgroundColor: getColors(),
          borderWidth: 1,
          boderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#355c7b",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Top Client in Month",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "rgb(15, 99, 132)",
          },
        },
      },

      layout: {
        padding: 0,
        margin: 0,
      },
    },
  });

  //Top Client IN month
  let yearClient = data.year;
  new Chart(chart3, {
    type: "bar",
    data: {
      labels: getNames(yearClient),
      datasets: [
        {
          label: "Year",
          data: getTotal(yearClient),
          backgroundColor: getColors(),
          borderWidth: 1,
          boderColor: "#777",
          hoverBorderWidth: 3,
          hoverBorderColor: "#355c7b",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Top Client in Year",
          font: {
            size: 20,
          },
        },
        legend: {
          display: true,
          position: "right",
          labels: {
            color: "rgb(15, 99, 132)",
          },
        },
      },

      layout: {
        padding: 0,
        margin: 0,
      },
    },
  });
};
