
const form = document.getElementById("car-form");
const titleElement = document.querySelector("#title");
const priceElement = document.querySelector("#price");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-cars");



// UI objesini başlatma
const ui = new UI();

const storage = new Storage();

// Tüm eventleri yükleme
eventListeners();

function eventListeners() {
    form.addEventListener("submit", addCar);

    document.addEventListener("DOMContentLoaded", function () {
        let cars = storage.getCarsFromStorage();
        ui.loadAllCars(cars);


    });
    cardbody.addEventListener("click", deleteCar);
    clear.addEventListener("click", clearAllCars)

}
function addCar(e) {

    const title = titleElement.value;
    const price = priceElement.value;
    const url = urlElement.value;

    if (title === " " || price === " " || url === " ") {
        ui.displayMessages("Tüm alanları doldurun...", "danger");
    }
    else {
        // yeni araç
        const newCar = new Car(title, price, url);

        ui.addCarToUI(newCar); // arayüze araç ekleme

        storage.addCarToStorage(newCar);

        ui.displayMessages("Araç başarıyla eklendi...", "success")
    }
    ui.clearInputs(titleElement, urlElement, priceElement);

    e.preventDefault();

}

function deleteCar(e) {
    // console.log(e.target);
    if (e.target.id === "delete-car") {
        ui.deleteCarFromUI(e.target);

        storage.deleteCarFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Silme işlemi gerçekleşti...", "success");

        // console.log(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    }
}
function clearAllCars() {


    if (confirm("Tüm araçlar silinecektir. Emin misiniz?")) {
        ui.clearAllCarsFromUI();
        torage.clearAllCarsFromStorage();

    }
}
