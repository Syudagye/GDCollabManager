const express = require('express')
const fs = require('fs')
const cookieparser = require('cookie-parser')
const config = require('./config')

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
app.get('/discord_auth/exchange_code', (req, res) => {
    if(req.query.code != undefined){
        let request = require('request')
        let querystring = require('querystring')
        request.post('https://discord.com/api/v6/oauth2/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                client_id: config.discord.client_id,
                client_secret: config.discord.client_secret,
                grant_type: "authorization_code",
                code: req.query.code,
                redirect_uri: `http://${req.headers.host}/discord_auth/exchange_code`,
                scope: config.discord.scope
            })
        }, (err, _res, body) => {
            res.cookie('user', JSON.parse(body))
            res.send('<script>document.onload = window.opener.loginEnd()</script>')
        })
    }
    else res.redirect('/')
})

app.listen(config.port, () => console.log('server started'))