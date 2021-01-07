const { Pool } = require('pg')
const { database } = require('./config')

var pool = new Pool({
    host: database.hostname,
    database: database.database,
    user: database.user,
    password: database.password
})

module.exports = {
    query: (query, callback) => pool.query(query, callback)
}