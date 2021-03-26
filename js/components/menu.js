import { getUsername } from "./storage.js";
import logoutButton from "./logoutButton.js";

export default function createMenu() {
	const { pathname } = document.location;
	console.log(pathname);

	const container = document.querySelector(".menu-container");

	const username = getUsername();

	let authLink = 
					`<div class="loginMessage">
						<a href="login.html" class="${pathname === "/login.html"
						? "active": ""}">Login <i class="fas fa-sign-in-alt"></i></a>
					</div>`;

	if (username) {
		authLink = `
						<a href="add.html" class="${pathname === "/add.html"? "active": ""}">Add+</a>
						<div class="loginMessage">
						<p>Welcome ${username} |</p>
						<button id="logout">Logout <i class="fas fa-sign-out-alt"></i></button>
					</div>`;
	}

	console.log(username);

	container.innerHTML = `<div class="menu">
								<img class="logo" src="../img/logo.png" alt="Logo">
								<a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
								<a href="products.html" class="${pathname === "/products.html"? "active": ""}">Products</a>
								<a href="cart.html" class="${pathname === "/cart.html"? "active": ""}">Cart</a>
								${authLink}
						</div>`;

	logoutButton();
}