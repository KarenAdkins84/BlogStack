require('dotenv').config();
const express = require('express');
const globalErrHandler = require('./middlewares/globalHandler');
const userRoutes = require('./routes/users/users');
const postRoutes = require('./routes/posts/posts');
const commentRoutes = require('./routes/comments/comment');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');

require('./config/dbConnect');

const app = express();
//middlewares
//config ejs
app.set('view engine', "ejs");
//serve static files
app.use(express.static(__dirname, +"/public"));
//parse incoming data
app.use(express.json());
//parse form data 
app.use(express.urlencoded({ extended: true }));
//method override
app.use(methodOverride('_method'));
//session config
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: process.env.MONGO_URL,
            ttl: 24 * 60 * 60, //1 day-session storage
        }),
    })
);
//save the logged in user to app.locals
app.use((req, res, next)=>{
    if(req.session.userAuth){
        res.locals.userAuth = req.session.userAuth;
    } else {
        res.locals.userAuth = null;
    }
    next();
});

//render home
app.get('/', (req, res)=>{
    res.render('index')
})

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
app.use(globalErrHandler);
//listen server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is running on PORT ${PORT} `));
