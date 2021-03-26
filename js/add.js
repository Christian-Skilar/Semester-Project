import displayMessage from "./components/message.js";
import createMenu from "./components/menu.js";
import { getToken } from "./components/storage.js";
import { baseUrl } from "./api.js";

const token = getToken();

if (!token) {
    location.href = "/";
}

createMenu();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const image = document.querySelector("#image");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();

    message.innerHTML = "";

    const titleValue = title.value.trim();
    const priceValue = parseFloat(price.value);
    const descriptionValue = description.value.trim();
    const imageValue = image.value;


    if (titleValue.length === 2 || priceValue.length === 1 || isNaN(priceValue) || descriptionValue.length === 10) {
        return displayMessage("warning", "Please supply proper values", ".message-container");
    }

    addProduct(titleValue, priceValue, descriptionValue, imageValue);
}

async function addProduct(title, price, description, image) {
    const url = baseUrl + "products";

    const data = JSON.stringify({ title: title, price: price, description: description, image_url: image });


    const options = {
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await fetch(url, options);
        const json = await response.json();

        if (json.created_at) {
            displayMessage("success", "Product created", ".message-container");
            form.reset();
        }

        if (json.error) {
            displayMessage("error", json.message, ".message-container");
        }

        console.log(json);
    } catch (error) {
        console.log(error);
        displayMessage("error", "An error occured", ".message-container");
    }
}

