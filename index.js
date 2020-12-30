const express = require('express')
const fs = require('fs')
const cookieparser = require('cookie-parser')
const config = require('./config')
const { parse } = require('path')
const discordauth = require('./discord_auth')

const app = express()

app.run = {}
fs.readdirSync(`./api/`).forEach(x => {
    app.run[x.split('.')[0]] = require(`./api/${x}`)
})
app.set('view engine', 'pug')

app.use(cookieparser())
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/assets/scss', express.static(__dirname + '/scss'))

//routes
app.get('/', (req, res) => res.render('home'))
app.get('/dashboard', (req, res) => res.render('dashboard'))
app.get('/discord_auth', (req, res) => res.redirect(config.getAuthUrl(req.headers.host)))
app.get('/discord_auth/exchange_code', (req, res) => discordauth.exchangeCode(req, res, config))
app.get('/discord_auth/refresh_token', (req, res) => discordauth.refreshToken(req, res, config))
app.get('/logout', (req, res) => discordauth.logout(res))

//api

app.listen(config.port, () => console.log('Express server started on port ' + config.port))