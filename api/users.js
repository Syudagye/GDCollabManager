const request = require('request')

module.exports = (req, res, config, discordClient) => {
    let userid = req.params.id
    if(/[^0-9]/.test(userid)) return res.send('wrong server id')
    request.get(`${config.getDiscordApi()}/users/${userid}`, {
        headers: {
            Authorization: `Bot ${config.dicord.bot_token}`
        }
    }, (err, res, body) => {
        console.log(res);
    })
}