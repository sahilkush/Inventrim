let inventoryItems = [];

// Load inventory items from local storage
function loadInventory() {
    const storedItems = JSON.parse(localStorage.getItem('inventoryItems'));
    if (storedItems) {
        inventoryItems = storedItems;
    }
}

// Function to add an inventory item
function addInventoryItem() {
    let item = document.querySelector('.input-name').value;
    let quantity = parseInt(document.querySelector('.input-quantity').value, 10);
    let costPrice = parseFloat(document.querySelector('.input-cp').value);
    let sellingPrice = parseFloat(document.querySelector('.input-sp').value);

    if (!item || !quantity || !costPrice || !sellingPrice) {
        alert('Please fill all the fields');
        return;
    }

    let existingItem = inventoryItems.find(inventoryItem => inventoryItem.item === item);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        inventoryItems.push({
            item,
            quantity,
            costPrice,
            sellingPrice
        });
    }

    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));

    document.querySelector('.input-name').value = '';
    document.querySelector('.input-quantity').value = '';
    document.querySelector('.input-cp').value = '';
    document.querySelector('.input-sp').value = '';

    updateInventoryTable();
}
// Function to update the inventory table
function updateInventoryTable() {
    let tableBody = document.getElementById('inventoryTableBody');
    let tableHead = document.querySelector('thead');
    let noItemsText = document.getElementById('noItemsText');

    // If no items, hide the table head and show the "No Items" message
    if (inventoryItems.length === 0) {
        tableBody.innerHTML = ''; // Clear the table
        tableHead.style.display = 'none'; // Hide the table header
        noItemsText.style.display = 'block'; // Show "No Items" text
    } else {
        noItemsText.style.display = 'none'; // Hide "No Items" text
        tableHead.style.display = ''; // Show table header

        tableBody.innerHTML = ''; // Clear the table
        inventoryItems.forEach((item, index) => {
            let row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.item}</td>
                    <td>${item.quantity}</td>
                    <td>₹${parseFloat(item.costPrice).toFixed(2)}</td>
                    <td>₹${parseFloat(item.sellingPrice).toFixed(2)}</td>
                    <td><button class="btn btn-danger delete-btn" style="display: none;" onclick="deleteItem(${index})">Delete</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

function toggleEditMode() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    const editButton = document.querySelector('.edit-btn');
    deleteButtons.forEach(button => {
        if (button.style.display === 'none') {
            button.style.display = 'inline-block'; // Show the delete button
            editButton.addEventListener('click',() => {
                editButton.style.backgroundColor = 
                    "green";
                });
        } else {
            button.style.display = 'none'; // Hide the delete button
        }
    });
    
    const deleteAllButton = document.querySelector('.dlt-all-btn');
    if (deleteAllButton.style.display === 'none') {
        deleteAllButton.style.display = 'inline-block'; // Show the delete all button
    } else {
        deleteAllButton.style.display = 'none'; // Hide the delete all button
    }
        
}
function deleteItem(index) {
    inventoryItems.splice(index, 1);
    localStorage.setItem('inventoryItems', JSON.stringify(inventoryItems));
    updateInventoryTable();
}
function deleteAllItems() {
    if (confirm("Are you sure you want to delete all items?")) {  // Optional confirmation
        inventoryItems = []; // Clear the array
        localStorage.removeItem('inventoryItems'); // Remove from localStorage
        updateInventoryTable(); // Clear the table
    }
}
// Event listeners for "Add Item" button and Enter key
document.addEventListener('DOMContentLoaded', () => {
    loadInventory(); // Load existing items on page load
    updateInventoryTable(); // Populate the table on load

    document.querySelector('.add-item').addEventListener('click', addInventoryItem);

    // Handle Enter key in the selling price field
    document.querySelector('.inventory-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            addInventoryItem();
        }
    });

    // Add event listener for "Delete All" button
    document.querySelector('.dlt-all-btn').addEventListener('click', deleteAllItems);
    
});