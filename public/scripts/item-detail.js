function incrementQuantity() {
    let quantity = document.getElementById('quantity');
    quantity.value = parseInt(quantity.value) + 1;
}

function decrementQuantity() {
    let quantity = document.getElementById('quantity');
    if (parseInt(quantity.value) > 1) {
        quantity.value = parseInt(quantity.value) - 1;
    }
}