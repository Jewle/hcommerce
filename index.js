const express = require('express')
const path = require('path')
const mongoose =require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const productRoutes = require('./routes/products')
const morgan = require('morgan')
const auth = require('./routes/auth')
const session = require('express-session')
const cartRoutes = require('./routes/cart')
const roleRoutes = require('./routes/roles')

const app = express()
app.use(express.static(__dirname + '/'));
//сессия настройка
app.use(session({
    resave:false,
    secret:'secret',
    saveUninitialized:false,
    cookie:{
        sameSite:'lax',
        secure:false,
    }
}))



app.use(cors({
    credentials:true,
    origin:'http://localhost:4200'
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
// app.use(express.urlencoded({extended:true}))

app.use(morgan('combined'))


//Тест, запуск файла на домене localhost
app.get('/', (req,res,next)=>{
    console.log('ff')
    res.sendFile(__dirname + '/client/index.html')
    // next()
})

//Маршруты
app.use('/api/products', productRoutes)
app.use('/api/auth', auth)
app.use('/api/cart', cartRoutes)
app.use('/api/roles',roleRoutes)


mongoose.connect('mongodb+srv://art-user123:root123@cluster0.qcqay.mongodb.net/selfshop?retryWrites=true&w=majority',
    {
        useNewUrlParser:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
    .then(response=>{
        console.log('Connected ')
        app.listen(5000,()=>{
            console.log('Server is running')
        })
    })
    // .then()
    .catch(error=>{
        console.log('Error!', error)
    })

