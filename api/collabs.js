const { discord } = require("../config");

const database = require('../database')

module.exports = (req, res, config, discordClient) => {
    let serverid = req.params.id
    if(/[^0-9]/.test(serverid)) return res.send('wrong server id')
    database.query(`SELECT * FROM collab WHERE server_id = '${serverid}';`, (err, dbres) => {
        if(err != undefined) return res.send('an error occured :/')
        res.send(dbres.rows)
    })
}