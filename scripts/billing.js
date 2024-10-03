let cartItems = [];
let itemId = 1;

function addToCart() {
    const selectedItem = document.getElementById('itemDropdown').value;
    
    if (selectedItem === "none") {
        alert("Please select an item!");
        return;
    }

    const quantity = 1; // You can extend this to let users input quantity
    const price = Math.floor(Math.random() * 100) + 10; // Random price, can replace with actual data

    // Add item to cart
    cartItems.push({
        id: itemId,
        name: selectedItem,
        quantity: quantity,
        price: price,
        total: price * quantity
    });
    itemId++;

    updateCartTable();
}

function updateCartTable() {
    const cartTableBody = document.getElementById('cartTableBody');
    cartTableBody.innerHTML = ''; // Clear the table

    cartItems.forEach((item, index) => {
        let row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.total}</td>
                <td><button class="btn btn-danger" onclick="removeCartItem(${index})">Remove</button></td>
            </tr>
        `;
        cartTableBody.innerHTML += row;
    });
}

function removeCartItem(index) {
    cartItems.splice(index, 1); // Remove item from the cart
    updateCartTable(); // Refresh the cart table
}

function generateBill() {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const billTableBody = document.getElementById('billTableBody');
    billTableBody.innerHTML = ''; // Clear previous bill

    cartItems.forEach((item) => {
        let row = `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price}</td>
                <td>₹${item.total}</td>
            </tr>
        `;
        billTableBody.innerHTML += row;
    });

    const currentDateTime = new Date().toLocaleString(); // Get current date and time
    document.getElementById('currentDateTime').innerText = currentDateTime;

    document.getElementById('billSection').style.display = 'block'; // Show the bill section
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.add-to-cart').addEventListener('click', addToCart);
    document.getElementById('generateBillBtn').addEventListener('click', generateBill);
});
