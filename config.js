const config = require('./config.json')

function getAuthUrl(hostname) {
    let redirect_uri = `http://${hostname}/discord_auth/exchange_code`
    return `https://discord.com/api/oauth2/authorize?client_id=${module.exports.discord.client_id}&redirect_uri=${redirect_uri}&scope=${module.exports.discord.scope}&response_type=code&prompt=consent`
}

function getBotInvite(hostname) {
    let redirect_uri = `http://${hostname}/dashboard/added_server`
    return `https://discord.com/api/oauth2/authorize?client_id=${module.exports.discord.client_id}&redirect_uri=${redirect_uri}&scope=bot&permissions=8&response_type=code&prompt=consent`
}

//unused for now
function getDatabaseUrl(){
    return `postgres://${module.exports.database.user}:${module.exports.database.password}@${module.exports.database.hostname}:5432/${module.exports.database.database}`
}

function getDiscordApi(){
    return `https://discord.com/api/${module.exports.discord.api}`
}

module.exports = {
    port: config.port,
    discord: {
        client_id: config.client_id,
        client_secret: config.client_secret,
        scope: config.scope,
        api: config.discord_api,
        bot_token: config.bot_token
    },
    database: {
        hostname: config.database.hostname,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database
    },
    getAuthUrl,
    getDatabaseUrl,
    getDiscordApi,
    getBotInvite
}