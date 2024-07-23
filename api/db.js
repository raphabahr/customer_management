import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "297652li@N",
    database:  "teste_senior"
})