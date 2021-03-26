import createMenu from "./components/menu.js";
import displayMessage from "./components/message.js";
import { getToken } from "./components/storage.js";
import { baseUrl } from "./api.js";
import deleteButton from "./components/deleteBtn.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const productUrl = baseUrl + "products/" + id;
const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const idInput = document.querySelector("#id");
const checkBox = document.querySelector("#checkbox");
const message = document.querySelector(".message-container");

if(checkBox.value === "on") {
    checkBox.checked = true;
}


(async function () {

    try {
        const response = await fetch(productUrl);
        const json = await response.json();

        title.value = json.title
        price.value = json.price
        description.value = json.description
        image.value = json.image_url
        idInput.value = json.id

        deleteButton(json.id);

    } catch (error) {
        console.log(error);
        displayMessage("error", error, ".message-container");
    }
})();


form.addEventListener("submit", editForm);

function editForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image.value;
    const idValue = idInput.value;

    if (checkBox.checked){
        checkBox.value = true;
    } else {
        checkBox.value = false;
    }

    const featuredValue = checkBox.value;

    if (titleValue.length === 2 || priceValue.length === 1 || isNaN(priceValue) || descriptionValue.length === 10) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    updateProduct(titleValue, priceValue, descriptionValue, imageValue, idValue, featuredValue);

}

async function updateProduct(title, price, description, imageValue, id, featured) {

    const url = baseUrl + "products/" + id;
    const data = JSON.stringify({ 
        title: title, 
        price: price, 
        description: description, 
        image_url: imageValue,
        featured: featured        
    });

    const token = getToken();

    const options = {
        method: "PUT",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();
        console.log(json)

        if (json.created_at) {
            displayMessage("success", "Product Successfully Updated", ".message-container");
        }

    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }

}
