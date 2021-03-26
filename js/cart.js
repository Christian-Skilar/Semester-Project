import createMenu from "./components/menu.js";
import { localStorageCart } from "./components/storageFunction.js";
import { clearButton } from "./components/clearCartBtn.js";

createMenu();
clearButton();

export function createCart() {

	const cart = localStorageCart();

	const cartContainer = document.querySelector(".cart");

	const clearBtn = document.querySelector(".clearBtn");

	if (cart.length === 0) {
		cartContainer.innerHTML = `<div class="fav-message">
                                            <i class="fas fa-exclamation-circle errorIcon fa-lg"></i>
                                            <h3 class="errorH3">Your cart is empty</h3>
                                        </div>`;
		clearBtn.style.display = "none";
	}

	let total = 0;

	cart.forEach((product) => {

		total = total + parseFloat(product.price);
		
		cartContainer.innerHTML += 
                                    `<div class="shoppingcart">
										<h4 class="shoppingcart__title">${product.title}</h4>
										<img class="shoppingcart__image" src="${product.image}">
										<div class="shoppingcart__container">
											<a class="view-btn" href="detail.html?id=${product.id}"><span>View</span></a>
											<p class="shoppingcart__price">Price: ${product.price}kr</p>
										</div>
									</div>`;


	});

const priceElement = document.querySelector(".totalPrice");

priceElement.innerHTML += 
							`<div class="cart-total">
								<h4>Total ${total},-</h4>
							</div>`;

}

createCart();





