// URL
const receiving_messages_url = "http://localhost/seller-fullstack/e-commerce_fullstack/seller/seller-backend/receive_messsages.php";
const sending_messages_url = "";
// hoover pannel choices

const hoover_elements = document.querySelectorAll(".choices");

hoover_elements.forEach(element => {
    element.addEventListener("mouseover", () => {
        element.classList.add("dark-gray")
    })
    element.addEventListener("mouseout", () => {
        element.classList.remove("dark-gray")
    })
})

const displayMessages = async () => {
    const url = receiving_messages_url;
    let params = new URLSearchParams();
    params.append("id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        
        for (let element of data.data){
            console.log(element.id)
        
        const container = document.getElementById("container");
        let div = document.createElement('div');
        div.innerHTML = 
        `
        <div class="message">
            <div id=${element.id}> <p> ${element.name} </p> </div>
            <div> <p> ${message} </p> </div> 
            <div> <button class="reply_botton" type = "submit"> Reply </button>
        </div>`;
    container.appendChild(div);

    };
 
})};

displayMessages();

const sendMessages = async () => {
    const buttons = document.querySelectorAll("reply_botton");
    buttons.forEach(button => {
        button.addEventListener("click", function(){
            
        } 
    })

    const url = receiving_messages_url;
    let params = new URLSearchParams();
    params.append("id", 1);
    await axios
      .post(url, params)
      .then((data) => {
        
        for (let element of data.data){
            console.log(element.id)
        
        const container = document.getElementById("container");
        let div = document.createElement('div');
        div.innerHTML = 
        `
        <div class="message">
            <div id=${element.id}> <p> ${element.name} </p> </div>
            <div> <p> ${message} </p> </div> 
            <div> <button type = "submit"> Reply </button>
        </div>`;
    container.appendChild(div);

    };
 
})};
