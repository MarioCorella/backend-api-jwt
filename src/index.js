const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const { dbConnection } = require('./database/config'); 

// DB
dbConnection();

//middleware
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//Settings
app.set('port', process.env.PORT || 3000);
// Server
app.listen(3000, () => {
    console.log(`Server on port ${process.env.PORT || 3000} `);
})

//Routes
app.use(require('./routes/index'));

app.post('/create', (req, res) => {
    console.log('body', req.body)
    console.log('params', req.params)
    res.json({"id": "123"})
})

