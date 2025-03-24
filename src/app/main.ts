import "../styles/style.css"
import { MyMap } from "./myMap";

const map = new MyMap("map");

const form = document.querySelector(".input-form")! as HTMLFormElement;
form.addEventListener("submit", (event) =>
{
    event.preventDefault();

    const location = (form.querySelector("#user-input")! as HTMLInputElement).value;
    map.showLocation(location);
});

const myGeoposBtn = document.querySelector("#my-geopos-btn")! as HTMLButtonElement;
myGeoposBtn.addEventListener("click", () => map.showMyLocation());