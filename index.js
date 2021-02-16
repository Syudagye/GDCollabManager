const express = require('express')
const fs = require('fs')
const cookieparser = require('cookie-parser')
const config = require('./config')
const { parse } = require('path')
const discordauth = require('./discord_auth')
const discord = require('discord.js')

const app = express()
const discordClient = new discord.Client()

/* ===== Express server setup ===== */

app.run = {}
fs.readdirSync(`./api/`).forEach(x => {
    app.run[x.split('.')[0]] = require(`./api/${x}`)
})
app.set('view engine', 'pug')

app.use(cookieparser())
app.use('/assets', express.static(__dirname + '/assets'))
app.use('/assets/scss', express.static(__dirname + '/scss'))
app.use('/assets/build', express.static(__dirname + '/build'))

//routes
app.get('/', (req, res) => res.render('home'))
app.get('/dashboard', (req, res) => res.render('dashboard'))
app.get('/dashboard/add_server', (req, res) => res.redirect(config.getBotInvite(req.headers.host)))
app.get('/dashboard/added_server', (req, res) => {
    if(req.query.code != undefined) res.send('<script>document.onload = window.opener.addServerEnd(false)</script>')
    else if(req.query.error == "access_denied") res.send('<script>document.onload = window.opener.addServerEnd(true)</script>')
    else res.redirect('/')
})
app.get('/discord_auth', (req, res) => res.redirect(config.getAuthUrl(req.headers.host)))
app.get('/discord_auth/exchange_code', (req, res) => discordauth.exchangeCode(req, res, config))
app.get('/discord_auth/refresh_token', (req, res) => discordauth.refreshToken(req, res, config))
app.get('/logout', (req, res) => discordauth.logout(res))

//api routes
app.get('/api/servers', (req, res) => app.run.servers(req, res, config, discordClient)) //returns the list of user's servers where the GDCM bot is found
app.get('/api/collabs/:id', (req, res) => app.run.collabs(req, res, config, discordClient)) //returns the list of collabs of a given server id
app.get('/api/discord/users/:id', (req, res) => app.run.users(req, res, config, discordClient)) //returns the user object of a specified user id

app.listen(config.port, () => console.log('Express server started on port ' + config.port))

/* ===== Discord bot setup ===== */

discordClient.on('ready', () => console.log('Bot ready'))
discordClient.login(config.discord.bot_token)