const config = require('config')
const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.GOOGLE_DB_HOST ||config.get('db.host'),
    database: process.env.GOOGLE_DB_DATABASE || config.get('db.database'),
    user: process.env.GOOGLE_DB_USER || config.get('db.user'),
    password: process.env.GOOGLE_DB_PASSWORD || config.get('db.password')
  })

  module.exports = pool