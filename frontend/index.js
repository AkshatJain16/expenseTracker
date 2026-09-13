const apiUrl = 'http://localhost:3000';

document.addEventListener("DOMContentLoaded", initialize);

// When the page get load display all expenses
function initialize() {
    getExpenses();
}

// Add new expense
const expenseForm = document.getElementById('expenseForm');

expenseForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseDetails = {
        amount: amount,
        description: description,
        category: category
    };
    const editId = sessionStorage.getItem('editId');
    if (editId) {
        editExpense(editId, expenseDetails);
    } else {
        addExpense(expenseDetails);
    }
}

// Add expense to backend
function addExpense(expenseDetails) {

    fetch(`${apiUrl}/expense/add-expense`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseDetails)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const message = document.getElementById('message');
        if (data.id) {
            message.innerText =
                `Expense added successfully!`;
            message.style.color = '#28a879';
            expenseForm.reset();
            getExpenses();
        } else {
            message.innerText = data.message;
            message.style.color = '#e74c3c';
        }
    })
    .catch(function(error) {
        console.log(error);
        document.getElementById('message').innerText =
            'Unable to connect to server';
        document.getElementById('message').style.color =
            '#e74c3c';
    });
}

// Get all expenses
function getExpenses() {
    fetch(`${apiUrl}/expense/get-expenses`)
    .then(function(response) {
        return response.json();
    })
    .then(function(expenses) {
        displayExpenses(expenses);
    })
    .catch(function(error) {
        console.log(error);
        document.getElementById('expenseList').innerHTML = `
            <div class="no-expenses">
                Unable to load expenses.
            </div>
        `;
    });
}

// Display expenses on screen
function displayExpenses(expenses) {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';
    if (expenses.length === 0) {
        expenseList.innerHTML = `
            <div class="no-expenses">
                No expenses found.
            </div>
        `;
        return;
    }
    for (let i = 0; i < expenses.length; i++) {
        display(expenses[i]);
    }
}

// Use this function to display expense on screen
function display(data) {
    const expenseList = document.getElementById('expenseList');
    const expenseCard = document.createElement('div');
    expenseCard.className = 'expense-card';
    expenseCard.innerHTML = `
        <h3>₹${data.amount}</h3>
        <span class="expense-category">
            ${data.category}
        </span>
        <p>
            <strong>Description:</strong>
            ${data.description}
        </p>
        <div class="expense-buttons">
            <button
                class="delete-button"
                onclick="deleteData(${data.id})">
                Delete
            </button>
            <button
                class="edit-button"
                onclick="editData(${data.id})">
                Edit
            </button>
        </div>
    `;
    expenseList.appendChild(expenseCard);
}

// Delete expense
function deleteData(id) {
    const confirmDelete = confirm(
        'Are you sure you want to delete this expense?'
    );
    if (!confirmDelete) {
        return;
    }
    fetch(`${apiUrl}/expense/delete-expense/${id}`, {
        method: 'DELETE'
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        getExpenses();
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Edit expense
function editData(id) {
    fetch(`${apiUrl}/expense/get-expense/${id}`)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        document.getElementById('amount').value = data.amount;
        document.getElementById('description').value =
            data.description;
        document.getElementById('category').value =
            data.category;
        sessionStorage.setItem('editId', data.id);
        document.getElementById('addExpensebtn').textContent =
            'Edit Expense';
        window.scrollTo({
            top: 400,
            behavior: 'smooth'
        });
    })
    .catch(function(error) {
        console.log(error);
    });
}

// Update expense
function editExpense(id, expenseDetails) {
    fetch(`${apiUrl}/expense/edit-expense/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(expenseDetails)
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const message = document.getElementById('message');
        message.innerText =
            'Expense updated successfully';
        message.style.color = '#28a879';
        sessionStorage.removeItem('editId');
        document.getElementById('addExpensebtn').textContent =
            'Add Expense';
        expenseForm.reset();
        getExpenses();
    })
    .catch(function(error) {
        console.log(error);
    });
}