    document.addEventListener("DOMContentLoaded", initialize);

    // Don't remove anything just complete the functions

    // When the page get load display all users
function initialize() {
    const expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];

    for (let i = 0; i < expensesList.length; i++){
        display(expensesList[i]);
    }

    }

    // add new users in expensesList array
function handleFormSubmit(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const expenseList = {
        amount,
        description,
        category
    };
    const expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];

    const editId = sessionStorage.getItem('editId');
    if (editId) {
        for (let i = 0; i < expensesList.length; i++){
            if (expensesList[i].id == editId) {
                expensesList[i].amount = expenseList.amount;
                expensesList[i].description = expenseList.description;
                expensesList[i].category = expenseList.category;
            }
        }
        const li = document.getElementById(editId);
        li.firstChild.textContent = expenseList.amount + ' - ' + expenseList.description + ' - ' + expenseList.category;

        sessionStorage.removeItem('editId');
        const addExpensebtn = document.querySelector("button[type='submit']");
        addExpensebtn.textContent = "Add Expense";
    } else {
        addData(expensesList, expenseList);
    }
   
    localStorage.setItem('expensesList', JSON.stringify(expensesList));

    event.target.reset();

    }

    // use this function to display user on screen
function display(data) {
    const ul = document.querySelector('ul');

    const li = document.createElement('li');
    li.textContent = data.amount + " - " + data.description + " - " + data.category;

    li.id = data.id;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete Expense';
    delBtn.addEventListener('click', () => deleteData(data.id, li));

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit Expense';
    editBtn.addEventListener('click', () => editData(data));

    li.appendChild(delBtn);
    li.appendChild(editBtn);
    ul.appendChild(li);
    }

    // use this function to add user details into local storage
function addData(expensesList, expenseList) {
    expenseList.id = Date.now();
    expensesList.push(expenseList);
    localStorage.setItem('expensesList', JSON.stringify(expensesList));
    display(expenseList);
    }


    // use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    const expensesList = JSON.parse(localStorage.getItem('expensesList')) || [];
    const updatedUsersList = [];

    for (let i = 0; i < expensesList.length; i++){
        if (expensesList[i].id !== id) {
            updatedUsersList.push(expensesList[i]);
        }
    }
    localStorage.setItem('expensesList', JSON.stringify(updatedUsersList));

    li.remove();
    }

    // use this function to update user details from local storage
function editData(data) {
    const amountInput = document.querySelector('#amount');
    const descriptionInput = document.querySelector('#description');
    const categoryInput = document.querySelector('#category');

    amountInput.value = data.amount;
    descriptionInput.value = data.description;
    categoryInput.value = data.category;

    sessionStorage.setItem('editId', data.id);
    const addExpensebtn = document.querySelector("button[type='submit']");
    addExpensebtn.textContent = "Edit Expense";
}
