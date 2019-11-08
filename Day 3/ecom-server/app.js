const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRouter = require('./routes/user');
const productRouter = require('./routes/products');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');

const log = (req, res, next) => {
    console.log("request recevied URL " + req.url + " Method " + req.method);
    next();
};

app.use(log);
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'pug');
// app.set('views',`${__dirname}\views`);


app.use('/api/auth',authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/', homeRouter);


mongoose.connect('mongodb://localhost:27017/product-db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connection successfull");

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("started on port " + port);
        })

    })
    .catch((error) => {
        console.log("Error while connect to DB ");
        console.log('error', error);
    })




