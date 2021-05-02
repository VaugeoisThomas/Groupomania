const mysql = require('mysql');
require("dotenv").config();

const bdd = mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

bdd.connect((err) => {
    if(err) console.log(err.message);
    else console.log("Connection réussie")
});