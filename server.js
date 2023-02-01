const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3000;
const server = express();

server.use(express.urlencoded({ extended: false}));
server.use(express.json());

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "rootJ@ckson2013!",
        database: "company_db"
    },
    console.log('Connected to the company_db Database!')
);