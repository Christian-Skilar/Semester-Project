import displayMessage from "./components/message.js";
import { saveToken, saveUser } from "./components/storage.js";
import { baseUrl } from "./api.js";

const form = document.querySelector("#contactForm");
const username = document.querySelector("#username");
const usernameError = document.querySelector("#usernameError");
const password = document.querySelector("#password");
const passwordError = document.querySelector("#passwordError");

form.addEventListener("submit", submitForm);

function submitForm(event) {
	event.preventDefault();

	const usernameValue = username.value.trim();
	const passwordValue = password.value.trim();

	if (usernameValue.length === 0 || passwordValue.length === 0) {
		return displayMessage(
			"warning",
			"Invalid values",
			".message-container"
		);
	}

	if (checkLength(username.value, 1) === true) {
		usernameError.style.display = "none";
	} else {
		usernameError.style.display = "block";
	}

	if (checkLength(password.value, 3) === true) {
		passwordError.style.display = "none";
	} else {
		passwordError.style.display = "block";
	}

	doLogin(usernameValue, passwordValue);
}

function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

async function doLogin(username, password) {
	const url = baseUrl + "auth/local";

	const data = JSON.stringify({ identifier: username, password: password });

	const options = {
		method: "POST",
		body: data,
		headers: {
			"Content-Type": "application/json"
		}
	};

	try {
		const response = await fetch(url, options);
		const json = await response.json();

		console.log(json);

		if (json.user) {
			saveToken(json.jwt);
			saveUser(json.user);

			location.href = "/";
		}

		if (json.error) {
			displayMessage(
				"warning",
				"Invalid login details",
				".message-container"
			);
		}
	} catch (error) {
		console.log(error);
	}
}

