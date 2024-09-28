export let cartItems = [];

// Function to add an item to the cart
export function addToCart(selectedItem, quantity) {
    let cartItemIndex = cartItems.findIndex(item => item.item === selectedItem.item);
    if (cartItemIndex > -1) {
        cartItems[cartItemIndex].quantity += quantity; // Update quantity if already in cart
    } else {
        cartItems.push({
            item: selectedItem.item,
            quantity: quantity,
            price: selectedItem.sellingPrice,
            total: quantity * selectedItem.sellingPrice
        });
    }
}

// Function to remove an item from the cart
export function removeFromCart(index) {
    cartItems.splice(index, 1);
}

// Function to calculate the total cart value
export function calculateTotal() {
    return cartItems.reduce((total, item) => total + item.total, 0);
}
