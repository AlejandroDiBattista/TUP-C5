let currentEditItemId = null;

function incrementNumber(itemId) {
    const item = document.getElementById(itemId);
    const numberElement = item.querySelector('.number');
    numberElement.textContent = parseInt(numberElement.textContent) + 1;
}

function deleteItem(itemId) {
    const item = document.getElementById(itemId);
    item.remove();
}

function openEditForm(itemId) {
    currentEditItemId = itemId;
    const item = document.getElementById(itemId);
    const name = item.querySelector('.details h2').textContent;
    const code = item.querySelector('.details p').textContent;
    const number = item.querySelector('.number').textContent;

    document.getElementById('editName').value = name;
    document.getElementById('editCode').value = code;
    document.getElementById('editNumber').value = number;
    document.getElementById('editForm').style.display = 'block';
}

function closeEditForm() {
    document.getElementById('editForm').style.display = 'none';
    currentEditItemId = null;
}

function saveEdit() {
    if (currentEditItemId) {
        const item = document.getElementById(currentEditItemId);
        const newName = document.getElementById('editName').value;
        const newCode = document.getElementById('editCode').value;
        const newNumber = document.getElementById('editNumber').value;

        item.querySelector('.details h2').textContent = newName;
        item.querySelector('.details p').textContent = newCode;
        item.querySelector('.number').textContent = newNumber;

        closeEditForm();
    }
}

function addItem() {
    const container = document.querySelector('.container');
    const newItemId = 'item-' + (document.querySelectorAll('.item').length + 1);
    const name = prompt("Nombre del producto:");
    const code = prompt("Código del producto:");
    const number = prompt("cantidad:");

    if (name !== null && code !== null && number !== null) {
        const newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.id = newItemId;
        newItem.innerHTML = `
            <div class="number" onclick="incrementNumber('${newItemId}')">${number}</div>
            <div class="details">
                <h2>${name}</h2>
                <p>${code}</p>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="openEditForm('${newItemId}')"><img src="imgedit.png" alt="editar"></button>
                <button class="delete-btn" onclick="deleteItem('${newItemId}')"><img src="imgeliminar.png" alt="eliminar"></button>
            </div>
        `;
        container.appendChild(newItem);
    }
}
