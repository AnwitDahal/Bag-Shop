const express=require("express");
const path=require('path')
const db=require('./config/mongoose-connection')
const adminsRouter=require('./routes/adminsRouter')
const usersRouter=require('./routes/usersRouter')
const productsRouter=require('./routes/productsRouter')
const app=express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')

app.use('/admins',adminsRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)

app.listen(3000)