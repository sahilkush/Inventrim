// Module to manage local storage
export function loadInventoryItems() {
    return JSON.parse(localStorage.getItem('inventoryItems')) || [];
}

export function saveInventoryItems(items) {
    localStorage.setItem('inventoryItems', JSON.stringify(items));
}
