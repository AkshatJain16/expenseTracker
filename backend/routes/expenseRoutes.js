const express = require('express');

const router = express.Router();

const expenseController = require('../controller/expenseController');

// Add expense
router.post('/expense/add-expense', expenseController.addExpense);

// Get all expenses
router.get('/expense/get-expenses', expenseController.getExpenses);

// Get expense by id
router.get('/expense/get-expense/:id', expenseController.getExpense);

// Delete expense
router.delete('/expense/delete-expense/:id', expenseController.deleteExpense);

// Edit expense
router.put('/expense/edit-expense/:id', expenseController.editExpense);

module.exports = router;