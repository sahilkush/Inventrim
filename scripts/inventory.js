let inventoryItems = [];

document.querySelector('.add-item').addEventListener('click', () => {
    addInventoryItem();
});

document.querySelector('.input-sp').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addInventoryItem();
    }
});

function addInventoryItem() {
    let item = document.querySelector('.input-name').value;
    let quantity = document.querySelector('.input-quantity').value;
    let costPrice = document.querySelector('.input-cp').value;
    let sellingPrice = document.querySelector('.input-sp').value;
    if (!item || !quantity || !costPrice || !sellingPrice) {
        return;
    }else{
      inventoryItems.push({
        item,
        quantity,
        costPrice,
        sellingPrice
      });
      
      updateInventoryTable();
  
      item = document.querySelector('.input-name').value = '';
      quantity = document.querySelector('.input-quantity').value = '';
      costPrice = document.querySelector('.input-cp').value = '';
      sellingPrice = document.querySelector('.input-sp').value = '';
    }
    
}

function updateInventoryTable() {
  let tableBody = document.getElementById('inventoryTableBody');
  tableBody.innerHTML = ''; // Clear existing rows

  inventoryItems.forEach((item, index) => {
      let row = `
          <tr>
              <td>${index + 1}</td>
              <td>${item.item}</td>
              <td>${item.quantity}</td>
              <td>₹${parseFloat(item.costPrice).toFixed(2)}</td>
              <td>₹${parseFloat(item.sellingPrice).toFixed(2)}</td>
              <button class="btn btn-danger" onclick="deleteInventoryItem(${index})">Delete</button>
          </tr>
      `;
      tableBody.innerHTML += row;
  });
}

function deleteInventoryItem(index) {
  // Remove the item from the array
  inventoryItems.splice(index, 1);
  // Update the table after deletion
  updateInventoryTable();
}