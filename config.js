const config = require('./config.json')

function getAuthUrl(hostname) {
    let redirect_uri = `http://${hostname}/discord_auth/exchange_code`
    return `https://discord.com/api/oauth2/authorize?response_type=code&client_id=${module.exports.discord.client_id}&scope=${module.exports.discord.scope}.join&redirect_uri=${redirect_uri}&prompt=consent`
}

module.exports = {
    port: config.port,
    discord: {
        client_id: config.client_id,
        client_secret: config.client_secret,
        scope: config.scope
    },
    getAuthUrl
}