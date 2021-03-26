import { baseUrl } from "./api.js";
import displayMessage from "./components/message.js";
import createMenu from "./components/menu.js";
import { renderProducts } from "./components/products.js";
import { searchProducts } from "./components/search.js";
import { getToken } from "./components/storage.js";


createMenu();

// -----------  HEADER  --------------

const heroBanner = baseUrl + "home";
const host = "http://localhost:1337";

async function apiHeroCall() {
	const containerHero = document.querySelector(".header-img");

	try {
		const response = await fetch(heroBanner);
		const hero = await response.json();

		containerHero.innerHTML += `<img class="header-image" src="${host}${hero.hero_banner.url}"></img>`;

	} catch (error) {
		displayMessage("error", error, ".header-img");
	}
}

apiHeroCall();

// ---------- FEATURED -----------------

async function featured() {
	const container = document.querySelector(".featured-container");
	const productsUrl = baseUrl + "products";
  
	try {
	  const response = await fetch(productsUrl);
	  const json = await response.json();
  
	  container.innerHTML = "";
  
	  json.forEach(function (product) {
		if (product.featured === true) {
		  container.innerHTML += 
								`<div class="product">
									<img class="product-img" src="${product.image_url}">
									<a href="detail.html?id=${product.id}"><h4 class="product__cardtext--h4">${product.title}</h4></a>
									<div class="price-cart">
										<p class="product__cardtext--p">Price: ${product.price}kr</p>
									</div>
									<div class="edit-container">
										<a class="editBtn" href="edit&delete.html?id=${product.id}">Edit</a>
									</div>
								</div>`;
		}
	  });

	  const token = getToken();
	  const adminOnly = document.querySelectorAll(".edit-container");
  
	  if (!token) {
		  adminOnly.forEach((admin) => {
			  admin.style.display = "none";
		  })
	  }

	} catch (error) {
	  console.log(error);
	  displayMessage("error", error, ".featured-container");
	}
  }
  featured();


// -----------  PRODUCTS  --------------

const productsUrl = baseUrl + "products";

(async function() {

	try {
		const response = await fetch(productsUrl);
		const json = await response.json();

		console.log(json)

		const products = json;

		renderProducts(products);
		searchProducts(products);
		
	} catch (error) {
		displayMessage("error", error, ".product-container");
	}
})();


