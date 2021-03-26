import { baseUrl } from "./api.js";
import displayMessage from "./components/message.js";
import createMenu from "./components/menu.js";
import { localStorageCart } from "./components/storageFunction.js";
import { handleClick } from "./components/handleClick.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
	document.location.href = "/";
}

createMenu();

const productUrl = baseUrl + "products/" + id;
const cart = localStorageCart();

(async function() {
	try {
		const response = await fetch(productUrl);
		const details = await response.json();
		const container = document.querySelector(".detail-container");

		document.title = details.name;

		let cssClass = "far";

		const inCartStorage = cart.find(function(fav) {
			return parseInt(fav.id) === details.id;
		});

		if (inCartStorage !== undefined) {
			cssClass = "fas";
		}

		container.innerHTML = `	<div class="productDetail">
									<h1>${details.title}</h1>
									<div class="productDetail__image-description">
											<img class="productDetail-image" src="${details.image_url}">
											<div class="productDetail__price--button">
												<p>${details.description}</p>
												<p class="productDetail__price">Price: ${details.price}kr</p>
												<div id="add-icon-container">
												<i class="${cssClass} fa-check-circle fa-3x" id="add-icon" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${details.image_url}" ></i>
												</div>
											</div>
									</div>
								</div>`;

		console.log(details);
	} catch (error) {
		displayMessage("error", error, ".detail-container");
	}

	const toCartIcon = document.querySelectorAll(".productDetail i");

	toCartIcon.forEach((button) => {
		button.addEventListener("click", handleClick);
		  
	});

	handleClick()

})();


