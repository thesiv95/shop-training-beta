const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 5000;

// Error handler - should be LAST middleware
app.use(errorHandler);

// Health check
app.get('/', (req, res) => res.status(200).json({ 'works': true }));

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
}

start();