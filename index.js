// System vars
require('dotenv').config();
// DB initialization
require('./models/models');

const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const sequelize = require('./db');
const router = require('./routes/index');
const errorHandler = require('./middlewares/ErrorHandlingMiddleware');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static'))); // devices images
app.use(fileUpload());
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