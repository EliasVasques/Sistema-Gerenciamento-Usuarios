const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/sisgema-gerenciamento-usuarios')

const usuarioRoute = require('./routes/usuario')

const app = express()

// receber dados via post
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.set('view engine', 'ejs')

app.use(express.json()) 
app.use('/usuarios', usuarioRoute)

app.listen(5000, console.log('Rodando na porta 5000'))

