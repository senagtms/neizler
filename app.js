const express = require('express');
const port = 5500;
const app = express();
const path = require('path');
const mongo = require('./helpers/mongoDbConnection')();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
if(process.platform === 'win32') process.env.PWD = process.cwd();
const indexRouter = require('./routes/indexRoutes');
const authRouter = require('./routes/authRoutes');
const settingRouter = require('./routes/userSettingRoutes');
const userRouter = require('./routes/userRoutes');
const categoryRouter = require('./routes/categoryRoutes');
const personRouter = require('./routes/personRoutes');
const movieRouter = require('./routes/movieRoutes');

const adminRoutes = require('./routes/admin/movieAdminRoutes');
const {userPermType} = require('./utils/types');
require('dotenv').config();
// middlewares
const appMid = require('./middlewares/siteMid');
const authMid = require('./middlewares/authMiddleware');
const authControlMid= require("./middlewares/authControlMiddleware")
const {flash} = require('express-flash-message');
const session = require('express-session');
app.use(appMid);
app.use(cookieParser());
app.set('view engine', 'pug');
app.use('/static',express.static(path.join(__dirname,'public')));


app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({extended:true}));
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
            // secure: true, // becareful set this option, check here: https://www.npmjs.com/package/express-session#cookiesecure. In local, if you set this to true, you won't receive flash as you are using `http` in local, but http is not secure
        },
    })
);

app.use(logger('dev'));
app.use(flash({ sessionKeyName: 'flashMessage' }));
app.use('/category',categoryRouter);
app.use('/person',personRouter);
app.use('/',indexRouter);
app.use('/auth',authRouter);
app.use('/setting',authMid(),settingRouter);
app.use('/user',authMid(),userRouter);
app.use('/movie',movieRouter);
app.use('/admin',authMid(userPermType.admin),adminRoutes);


app.use((err,req,res,next) => {
    res.json({
        success:false,
        message: err.message
    });
});


app.listen(port,() => {
    console.log(`app start on port:${port}`);
});

