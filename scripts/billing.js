import { loadInventoryItems, saveInventoryItems } from './storage.js';
import { cartItems, addToCart, removeFromCart, calculateTotal } from './cart.js';

let inventoryItems = loadInventoryItems();

window.onload = function() {
    populateItemDropdown();
    updateCart();
}

// Populate the dropdown with inventory items
function populateItemDropdown() {
    let itemDropdown = document.getElementById('itemDropdown');
    itemDropdown.innerHTML = ''; // Clear existing items

    inventoryItems.forEach((inventoryItem, index) => {
        let option = document.createElement('option');
        option.value = index;
        option.text = `${inventoryItem.item} (In stock: ${inventoryItem.quantity}) - ₹${inventoryItem.sellingPrice}`;
        itemDropdown.add(option);
    });
}

// Function to filter items in the dropdown
window.filterItems = function() {
    let search = document.getElementById('itemSearch').value.toLowerCase();
    let itemDropdown = document.getElementById('itemDropdown');
    itemDropdown.innerHTML = '';

    inventoryItems.forEach((inventoryItem, index) => {
        if (inventoryItem.item.toLowerCase().includes(search)) {
            let option = document.createElement('option');
            option.value = index;
            option.text = `${inventoryItem.item} (In stock: ${inventoryItem.quantity}) - ₹${inventoryItem.sellingPrice}`;
            itemDropdown.add(option);
        }
    });
}

// Function to add an item to the cart
window.addToCart = function() {
    let selectedItemIndex = document.getElementById('itemDropdown').value;
    let selectedItem = inventoryItems[selectedItemIndex];
    let quantity = parseInt(document.getElementById('cartQuantity').value);

    if (quantity > selectedItem.quantity) {
        alert('Not enough stock available.');
        return;
    }

    // Adjust inventory
    selectedItem.quantity -= quantity;

    // Add item to the cart
    addToCart(selectedItem, quantity);

    // Save the updated inventory back to local storage
    saveInventoryItems(inventoryItems);

    // Update the cart and dropdown
    updateCart();
    populateItemDropdown();
}

// Function to update the cart table
function updateCart() {
    let cartTableBody = document.getElementById('cartTableBody');
    cartTableBody.innerHTML = ''; // Clear existing rows

    cartItems.forEach((cartItem, index) => {
        let row = `
            <tr>
                <td>${cartItem.item}</td>
                <td>${cartItem.quantity}</td>
                <td>₹${cartItem.price.toFixed(2)}</td>
                <td>₹${cartItem.total.toFixed(2)}</td>
                <td><button onclick="removeItemFromCart(${index})">Remove</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });

    // Update total amount
    document.getElementById('totalAmount').innerText = calculateTotal().toFixed(2);
}

// Function to remove an item from the cart
window.removeItemFromCart = function(index) {
    removeFromCart(index);
    updateCart();
}

// Function to generate the bill
window.generateBill = function() {
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    let billDetails = 'Bill Summary:\n';
    cartItems.forEach(item => {
        billDetails += `${item.item} - Quantity: ${item.quantity}, Total: ₹${item.total.toFixed(2)}\n`;
    });

    let totalAmount = calculateTotal().toFixed(2);
    billDetails += `\nTotal Amount: ₹${totalAmount}`;

    alert(billDetails);
}
