import { getToken } from "./storage.js";
import { baseUrl } from "../api.js";

export default function deleteButton(id) {
    const container = document.querySelector(".delete-container");

    container.innerHTML = `<button type="button" class="btn-delete">Delete</button>`;

    const button = document.querySelector("button.btn-delete");

    button.onclick = async function () {
        console.log(id);

        const doDelete = confirm("Are you sure you want to delete this product?");
        console.log(doDelete);

        if (doDelete) {
            const url = baseUrl + "products/" + id;

            const token = getToken();

            const options = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            try {
                const response = await fetch(url, options);
                const json = await response.json();

                location.href = "/products.html";

                console.log(json);
            } catch (error) {
                console.log(error);
            }
        }
    };
}