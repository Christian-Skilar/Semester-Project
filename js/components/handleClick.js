
import { localStorageCart } from "./storageFunction.js";

export function handleClick() {
    this.classList.toggle("fas");
    this.classList.toggle("far");

    const id = this.dataset.id;
    const title = this.dataset.title;
    const price = this.dataset.price;
    const image = this.dataset.image;

    const currentStorage = localStorageCart();

    const crewMemberExist = currentStorage.find(function(fav) {
        return fav.id === id;
    });

    if (crewMemberExist === undefined) {
        const crewMember = {
            id: id,
            title: title,
            price: price,
            image: image,
        };
        currentStorage.push(crewMember);
        saveLike(currentStorage);
    } else {
        const newFavs = currentStorage.filter((fav) => fav.id !== id);
        saveLike(newFavs);
    }
}

function saveLike(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
