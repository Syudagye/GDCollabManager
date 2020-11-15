const express = require('express')
const fs = require('fs')
const cookieparser = require('cookie-parser')

const app = express()

app.run = {}
fs.readdirSync(`./api/`).forEach(x => {
    app.run[x.split('.')[0]] = require(`./api/${x}`)
})
app.config = JSON.parse(fs.readFileSync('./config.json',{encoding: 'utf-8'}))
app.set('view engine', 'pug')

app.use(cookieparser())
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/assets/scss', express.static(__dirname + '/scss'))

//routes
//app.get('/', (req, res) => res.sendFile(__dirname + '/html/home.html'))
//app.get('/dashboard', (req, res) => res.sendFile(__dirname + '/html/dashboard.html'))
app.get('/', (req, res) => res.render('home'))
app.get('/dashboard', (req, res) => res.render('dashboard'))

app.listen(app.config.port, () => console.log('server started'))