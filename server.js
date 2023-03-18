require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/users/users');
const postRoutes = require('./routes/posts/posts');
const commentRoutes = require('./routes/comments/comment');

// const session = require('express-session');
// const MongoStore = require('connect-mongo');
// const globalErrHandler = require('./middlewares/globalHandler');

require('./config/dbConnect');



const app = express();
//middlewares
//-------

//users route base url
///api/v1/users
app.use('/api/v1/users', userRoutes);

//posts routes base url
///api/v1/posts
app.use('/api/v1/posts', postRoutes);

//comments route base url
///api/v1/comments
app.use('/api/v1/comments', commentRoutes);

//error handler middlewares

//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT} `));
