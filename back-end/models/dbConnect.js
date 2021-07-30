const MYSQL = require('mysql');
require("dotenv").config();

const BDD = MYSQL.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

BDD.connect((err) => {
    if (err) console.log(err.message);
    else console.log("Connection réussie")
});

module.exports = BDD;