const express = require('express');
const cors = require('cors');
const sequelize = require('./utils/db-connection');

require('./models/expense');
const expenseRoutes = require('./routes/expenseRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use(expenseRoutes);

app.get('/', (req, res) => {
    res.json({
        message: "Expense Tracker API is running"
    });
});

sequelize.sync()
    .then(() => {
        console.log("Database is synced");
    })
    .catch((error) => {
        console.log(error.message);
    });

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});