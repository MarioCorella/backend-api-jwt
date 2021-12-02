const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const { dbConnection } = require('./database/config'); 
require('dotenv').config();

// Routers
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

// DB
dbConnection();

//public directory
app.use(express.static('public'));

//middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Settings
const PORT =  process.env.PORT || 3000;

// Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT} `);
})

//Routes
app.use('/api/users', userRouter);
app.use('/api/login', authRouter);




