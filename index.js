const express = require('express')
const fs = require('fs')
const cookieparser = require('cookie-parser')
const config = require('./config')
const { parse } = require('path')
const request = require('request')
const querystring = require('querystring')

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
        request.post('https://discord.com/api/v8/oauth2/token', {
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
            let parsedBody = JSON.parse(body)            
            res.cookie('tokens', parsedBody)
            res.cookie('tokens_expiration', `{\"time\": ${parsedBody.expires_in + Date.now()}}`)
            res.send('<script>document.onload = window.opener.loginEnd(false)</script>')
        })
    }
    else if(req.query.error == "access_denied"){
        res.send('<script>document.onload = window.opener.loginEnd(true)</script>')
    }
    else res.redirect('/')
})
app.get('/discord_auth/refresh_token', (req, res) => {
    if(req.query.refresh_token != undefined){
        request.post('https://discord.com/api/v8/oauth2/token', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: querystring.stringify({
                client_id: config.discord.client_id,
                client_secret: config.discord.client_secret,
                grant_type: "refresh_token",
                refresh_token: req.query.refresh_token,
                redirect_uri: `http://${req.headers.host}/discord_auth/refresh_token`,
                scope: config.discord.scope
            })
        }, (err, _res, body) => {
            console.log(err)
            let parsedBody = JSON.parse(body)     
            console.log(parsedBody)       
            res.cookie('tokens', parsedBody)
            res.cookie('tokens_expiration', `{\"time\": ${parsedBody.expires_in + Date.now()}}`) 
            res.json(body)
        })
    }
})

app.listen(config.port, () => console.log('server started'))