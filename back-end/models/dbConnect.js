const Mysql = require('Mysql');
require("dotenv").config();

const Bdd = Mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

Bdd.connect((err) => {
    if (err) console.log(err.message);
    else console.log("Connection réussie")
});

module.exports = Bdd;