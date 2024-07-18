const express=require("express");
const path=require('path')
const cookieParser=require('cookie-parser')
const expressSession=require('express-session');
const flash=require("connect-flash")
const db=require('./config/mongoose-connection')
const adminsRouter=require('./routes/adminsRouter')
const usersRouter=require('./routes/usersRouter')
const productsRouter=require('./routes/productsRouter')
const mainRouter=require('./routes/main')
const app=express();
require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash())
app.set('view engine','ejs')

app.use('/',mainRouter)
app.use('/admins',adminsRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)

app.listen(3000)