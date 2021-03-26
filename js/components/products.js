import { getToken } from "./storage.js";


export function renderProducts(productsToRender) {

	const productContainer = document.querySelector(".product-container"); 

	productContainer.innerHTML = "";

	productsToRender.forEach(function (product) {

		productContainer.innerHTML += 
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

	})

	const token = getToken();
	const adminOnly = document.querySelectorAll(".edit-container");

	if (!token) {
		adminOnly.forEach((admin) => {
			admin.style.display = "none";
		})
	}

}


