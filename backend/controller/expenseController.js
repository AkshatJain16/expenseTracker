const Expense = require('../models/expense');

// Add expense
const addExpense = async (req, res) => {
    try {
        const {amount, description, category} = req.body;
        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category
        });
        res.status(201).json({
            message: "Expense created successfully",
            id: expense.id
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to create expense"
        });
    }
};

// Get all expenses
const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json(expenses);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to get expenses"
        });
    }
};

// Get expense by id
const getExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            res.status(404).json({
                message: "Expense not found"
            });
            return;
        }
        res.status(200).json(expense);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to get expense"
        });
    }
};

// Delete expense
const deleteExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const expense = await Expense.findByPk(id);
        if (!expense) {
            res.status(404).json({
                message: "Expense not found"
            });
            return;
        }
        await expense.destroy();
        res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to delete expense"
        });
    }
};

// Edit expense
const editExpense = async (req, res) => {
    try {
        const {id} = req.params;
        const {amount, description, category} = req.body;
        const expense = await Expense.findByPk(id);

        if (!expense) {
            res.status(404).json({
                message: "Expense not found"
            });
            return;
        }
        await expense.update({
            amount: amount,
            description: description,
            category: category
        });
        res.status(200).json({
            message: "Expense updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({
            message: "Unable to update expense"
        });
    }
};

module.exports = {
    addExpense,
    getExpenses,
    getExpense,
    deleteExpense,
    editExpense
};