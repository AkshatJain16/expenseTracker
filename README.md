# Expense Tracker

A full-stack Expense Tracker application that allows users to **add, view, edit, and delete expenses**.

This project was originally built using browser storage. It has now been upgraded to use a **custom Node.js backend, Sequelize, and MySQL database**, removing the dependency on CrudCrud and localStorage.

---

## Features

* Add a new expense
* View all saved expenses
* Expenses remain available after refreshing the page
* Delete expenses
* Edit existing expenses
* Store expenses permanently in MySQL
* REST APIs using Express.js
* Sequelize ORM for database operations
* Separate controllers and routes for clean backend code
* CORS support for frontend-backend communication
* Responsive and modern UI

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* Sequelize
* MySQL
* CORS

---

## Project Structure

```text
Expense-App
│
├── frontend
│   ├── index.html
│   ├── style.css
│   └── index.js
│
└── backend
    ├── app.js
    │
    ├── controllers
    │   └── expenseController.js
    │
    ├── models
    │   └── expenses.js
    │
    ├── routes
    │   └── expenseRoutes.js
    │
    └── utils
        └── db-connection.js
```

---

# How It Works

The frontend contains the expense form and displays all saved expenses.

When a user adds an expense, the frontend sends the data to the backend using the Fetch API.

The backend receives the data through an Express route and passes it to the controller.

The controller uses Sequelize to store the expense in the MySQL database.

When the page is refreshed, the frontend sends a GET request to the backend and retrieves all the expenses from MySQL.

The same backend is used to edit and delete expenses.

### Application Flow

```text
Frontend
   │
   │ Fetch API
   ▼
Express Routes
   │
   ▼
Controllers
   │
   ▼
Sequelize
   │
   ▼
MySQL Database
```

---

# Database Setup

## 1. Create the Database

Open MySQL and run:

```sql
CREATE DATABASE expense_tracker;
```

The `Expenses` table will be created automatically by Sequelize when the backend starts.

---

## 2. Expense Table

The application uses an `Expenses` table with the following fields:

| Field       | Type    | Description                             |
| ----------- | ------- | --------------------------------------- |
| id          | INTEGER | Primary key and automatically generated |
| amount      | INTEGER | Expense amount                          |
| description | STRING  | Description of the expense              |
| category    | STRING  | Expense category                        |

Available categories:

* Fuel
* Food
* Movie
* Electricity
* Others

---

# Backend Setup

## 1. Open the Backend Folder

Open a terminal inside the `backend` folder:

```bash
cd backend
```

---

## 2. Initialize Node.js

If `package.json` does not already exist:

```bash
npm init -y
```

---

## 3. Install Dependencies

Run:

```bash
npm install express sequelize mysql2 cors
```

---

## 4. Configure MySQL

Open:

```text
backend/utils/db-connection.js
```

Update the MySQL password:

```js
const sequelize = new Sequelize(
    'expense_tracker',
    'root',
    'YOUR_PASSWORD',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);
```

Replace:

```text
YOUR_PASSWORD
```

with your MySQL password.

---

# Start the Backend

From the `backend` folder, run:

```bash
node app.js
```

If everything is configured correctly, you should see:

```text
Connection to the database has been created
Database is synced
Server running at http://localhost:3000
```

The backend runs on:

```text
http://localhost:3000
```

---

# Frontend Setup

The frontend files are inside:

```text
frontend
```

The folder contains:

```text
index.html
style.css
index.js
```

Open `index.html` in your browser.

You can also use the **Live Server** extension in VS Code.

The frontend JavaScript connects to the backend using:

```js
const apiUrl = 'http://localhost:3000';
```

Make sure the backend is running before using the application.

---

# API Endpoints

The application provides the following APIs.

## 1. Add Expense

### POST

```text
/user/add-expense
```

Full URL:

```text
http://localhost:3000/expense/add-expense
```

### Request Body

```json
{
    "amount": 500,
    "description": "Dinner",
    "category": "food"
}
```

### Response

```json
{
    "message": "Expense created successfully",
    "id": 1
}
```

---

# 2. Get All Expenses

### GET

```text
http://localhost:3000/expense/get-expenses
```

### Example Response

```json
[
    {
        "id": 1,
        "amount": 500,
        "description": "Dinner",
        "category": "food"
    },
    {
        "id": 2,
        "amount": 1000,
        "description": "Petrol",
        "category": "fuel"
    }
]
```

---

# 3. Get Expense by ID

### GET

```text
http://localhost:3000/expense/get-expense/:id
```

Example:

```text
http://localhost:3000/expense/get-expense/1
```

This is used by the frontend when editing an expense.

---

# 4. Delete Expense

### DELETE

```text
http://localhost:3000/expense/delete-expense/:id
```

Example:

```text
http://localhost:3000/expense/delete-expense/1
```

### Response

```json
{
    "message": "Expense deleted successfully"
}
```

---

# 5. Edit Expense

### PUT

```text
http://localhost:3000/expense/edit-expense/:id
```

Example:

```text
http://localhost:3000/expense/edit-expense/1
```

### Request Body

```json
{
    "amount": 700,
    "description": "Dinner with friends",
    "category": "food"
}
```

### Response

```json
{
    "message": "Expense updated successfully"
}
```

---

# Postman Testing

You can test all backend APIs using Postman.

## Add Expense

```text
POST http://localhost:3000/expense/add-expense
```

Select:

```text
Body → raw → JSON
```

Then use:

```json
{
    "amount": 500,
    "description": "Dinner",
    "category": "food"
}
```

---

## Get Expenses

```text
GET http://localhost:3000/expense/get-expenses
```

---

## Get Expense

```text
GET http://localhost:3000/expense/get-expense/1
```

---

## Edit Expense

```text
PUT http://localhost:3000/expense/edit-expense/1
```

Body:

```json
{
    "amount": 800,
    "description": "Dinner and drinks",
    "category": "food"
}
```

---

## Delete Expense

```text
DELETE http://localhost:3000/expense/delete-expense/1
```

---

# Frontend Features

### Add Expense

The user enters:

* Expense amount
* Description
* Category

and clicks **Add Expense**.

The data is sent to the backend and stored in MySQL.

---

### View Expenses

When the page loads:

```text
DOMContentLoaded
       ↓
getExpenses()
       ↓
GET /expense/get-expenses
       ↓
MySQL
       ↓
Display expenses
```

Because the expenses are stored in MySQL, they are still available after refreshing the page.

---

### Delete Expense

Each expense has a **Delete** button.

When clicked:

```text
Delete button
      ↓
DELETE API
      ↓
Backend
      ↓
MySQL
      ↓
Expense deleted
      ↓
Expenses displayed again
```

---

### Edit Expense

Each expense also has an **Edit** button.

When clicked:

1. The expense is retrieved from the backend.
2. Its details are placed into the form.
3. The button changes from **Add Expense** to **Edit Expense**.
4. The user changes the details.
5. The updated information is sent using a `PUT` request.
6. The database is updated.
7. The updated expense list is displayed.

---

# Why Backend Instead of localStorage?

The original application stored expenses in:

```text
localStorage
```

This meant the data was stored only in the browser.

The new application uses:

```text
Frontend
    ↓
Backend API
    ↓
MySQL
```

This means the data is stored in a database instead of only in the user's browser.

The application also no longer depends on **CrudCrud**.

---

# Important Notes

### MySQL must be running

Make sure your MySQL server is running before starting the backend.

### Backend must be running

Start the backend using:

```bash
node app.js
```

### Check the database password

If you receive a database connection error, check:

```text
backend/utils/db-connection.js
```

and make sure the MySQL username, password, and database name are correct.

### CORS

The backend uses CORS to allow the frontend to communicate with the backend.

```js
app.use(cors());
```

### JSON

The backend uses:

```js
app.use(express.json());
```

to receive JSON data from the frontend.

---

# Learning Objectives

This project demonstrates:

* Building a REST API
* Creating CRUD operations
* Express.js routing
* Controllers
* Sequelize models
* MySQL database integration
* HTTP methods
* JSON request and responses
* Fetch API
* Frontend-backend communication
* CORS
* Database persistence

---

# CRUD Operations

The project supports all four basic CRUD operations:

| Operation | HTTP Method | API                           |
| --------- | ----------- | ----------------------------- |
| Create    | POST        | `/expense/add-expense`        |
| Read      | GET         | `/expense/get-expenses`       |
| Update    | PUT         | `/expense/edit-expense/:id`   |
| Delete    | DELETE      | `/expense/delete-expense/:id` |

---

# Future Improvements

Possible future features include:

* Expense date
* Total expense calculation
* Monthly expense summary
* Category-wise expense summary
* Search expenses
* Filter by category
* Sort by amount
* User authentication
* Multiple users
* Dashboard with charts
* Deploy the application online

---

## Author

Built as a full-stack learning project using:

**HTML • CSS • JavaScript • Node.js • Express.js • Sequelize • MySQL**
