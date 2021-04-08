require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');
const authRoute = require('./routes/authRoute');
const adminAuthRoute = require('./routes/admin/authRoutes');


const app = express();

const PORT = process.env.PORT || 400;
app.use(express.json());
app.use(cors());

app.use('/api', authRoute);
app.use('/api', adminAuthRoute);


app.listen(PORT, () => {
    console.log('server listening at', PORT);
})