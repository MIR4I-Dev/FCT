import mysql from "mysql2/promise";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../config.js";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "gadgets",
});

export class UserModel {
  static async findUser(username) {
    const [rows] = await connection.query(
      "SELECT id, username, password FROM users WHERE username = ?",
      [username],
    );
    return rows[0];
  }

  static async create({ username, password }) {
    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));

    const user = await this.findUser(username);
    if (user) return null;

    await connection.query(
      "INSERT INTO users (id, username, password) VALUES (?, ?, ?)",
      [id, username, hashedPassword],
    );

    return id;
  }

  static async login({ username, password }) {
    const user = await this.findUser(username);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...publicUser } = user;
    return publicUser;
  }
}
