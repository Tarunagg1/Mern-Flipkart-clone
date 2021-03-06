require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./config/db');
const authRoute = require('./routes/authRoute');
const initialDataRoute = require('./routes/admin/initialData');
const adminAuthRoute = require('./routes/admin/authRoutes');
const caregoryRoute = require('./routes/categoryRoute');
const productRoute = require('./routes/productRouute');
const cartRoute = require('./routes/cartRoute');
const pageRoute = require('./routes/admin/pageRoute');
const addressRoute = require('./routes/addressRoute');


const app = express();

const PORT = process.env.PORT || 400;
app.use(express.static('public'));  

app.use(express.json());

app.use(cors());

app.use('/images', express.static('products')); 

app.use('/api', authRoute);
app.use('/api', initialDataRoute);
app.use('/api', adminAuthRoute);
app.use('/api', caregoryRoute);
app.use('/api', productRoute);
app.use('/api', cartRoute);
app.use('/api', addressRoute);



app.listen(PORT, () => {
    console.log('server listening at', PORT);
})