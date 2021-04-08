require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');
const authRoute = require('./routes/authRoute');

const app = express();

const PORT = process.env.PORT || 400;
app.use(express.json());
app.use(cors());

app.use('/api', authRoute);


app.listen(PORT, () => {
    console.log('server listening at', PORT);
})