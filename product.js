const pizzaimage = document.querySelectorAll("pizza-image img");
const mainimage = document.querySelector("main-image img");

pizzaimage.forEach(pizza => {
    pizza.addEventListener("click", () => {
        mainimage.src = pizza.src;
    });
});

const minusBtn = document.querySelector('.minus')
const plusBtn = document.querySelector('plus')
const quantityInput = document.querySelector('quantity input')

minusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    if (value > 1) quantityInput.value = value - 1;

});

plusBtn.addEventListener('click', () => {
    let value = parseInt(quantityInput.value);
    quantityInput.value = value + 1

});



