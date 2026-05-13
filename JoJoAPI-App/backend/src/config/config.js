import mysql from "mysql2/promise";

export const {
    PORT = 3000,
    SALT_ROUNDS = 10,
    JWT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    DB_HOST,
    DB_USER,
    DB_PORT,
    DB_PASSWORD,
    DB_NAME,
} = process.env;

export const connection = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    port: DB_PORT,
    password: DB_PASSWORD,
    database: DB_NAME,
});
