const express = require('express')
const mysql = require('mysql2')
const { json } = require('express');
const dotenv = require('dotenv')
const app = express();

dotenv.config();

var db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: {
      rejectUnauthorized: true
    }
  });
  
db.connect(function(err) {
    if (err) throw err;
    console.log("Successfully connected to PlanetScale!");
});

app.get("/", (req, res) => {
    res.json("Hello, this is the backend.")
})

app.get("/kanjidict", (req,res) => {
    const q = "SELECT * from kanji_dict;"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})


