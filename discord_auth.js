const request = require('request')
const querystring = require('querystring')

function exchangeCode(req ,res, config){    
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
            res.cookie('tokens', body)
            let parsedBody = JSON.parse(body)
            res.cookie('tokens_expiration', `{\"time\": ${parsedBody.expires_in + Date.now()}}`)
            res.send('<script>document.onload = window.opener.loginEnd(false)</script>')
        })
    }
    else if(req.query.error == "access_denied"){
        res.send('<script>document.onload = window.opener.loginEnd(true)</script>')
    }
    else res.redirect('/')
}
function refreshToken(req, res, config) {
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
            res.cookie('tokens', body)
            let parsedBody = JSON.parse(body)
            res.cookie('tokens_expiration', `{\"time\": ${parsedBody.expires_in + Date.now()}}`) 
            res.json(body)
        })
    }
}
function logout(res) {
    res.clearCookie('tokens')
    res.clearCookie('tokens_expiration')
    res.redirect('/')
}
module.exports = {
    exchangeCode,
    refreshToken,
    logout
}