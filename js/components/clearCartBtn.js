import { createCart } from "../cart.js";

export function clearButton() {
	const clearBtn = document.querySelector(".clearBtn");

	clearBtn.addEventListener("click", clearList);

	function clearList() {
		if (
			confirm(
				"Are you sure you want to remove all items from your Shoppingcart?"
			)
		) {
			
			localStorage.removeItem("cart");

			createCart([]);
			location.href = "/products.html";
		}
	}
}

