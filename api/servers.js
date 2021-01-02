const request = require('request')

module.exports = (req, res, config, discordClient) => {
    let access_token = JSON.parse(req.cookies.tokens).access_token
    request.get(`${config.getDiscordApi()}/users/@me/guilds`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    }, (err, _res, body) => {
        if (err != null) return console.error(err)
        if (_res.statusCode != 200) return console.error(_res)
        let userguilds = JSON.parse(body)
        let botguilds = discordClient.guilds.cache
        let sharedguilds = []
        userguilds.forEach(guild => {
            if(botguilds.get(guild.id) != undefined) sharedguilds.push(guild)
        });
        res.json(sharedguilds)
    })
}