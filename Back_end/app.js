const express = require('express');
const app = express();
const logger = require('./config/logger')
require('dotenv').config();
const userRoutes = require('./routes/routes.js');

app.use(express.json());


app.use('/roles', userRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});