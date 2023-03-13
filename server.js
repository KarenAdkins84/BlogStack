require('dotenv').config();
const express = require('express');
// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const globalErrHandler = require('./middlewares/globalHandler');

require('./config/dbConnect');



const app = express();
//middlewares

//routes

//error handler middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT} `));
