import mysql from "mysql2/promise"
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' });

console.log(`ENV ${process.env.DB_USER}`)    
console.log(`ENV ${process.env.DB_PASSWORD}`)    

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectionLimit: 10,
    queueLimit: 0
})

export default pool;