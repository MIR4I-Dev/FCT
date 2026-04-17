import mysql from "mysql2/promise";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../config/config.js";
import { connection } from "../../config/config.js";

export class UserModel {
  static async findUser(username) {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
    );
    return rows[0];
  }

  static async create({
    username,
    password = null,
    provider = "local",
    provider_id = null,
  }) {
    const id = crypto.randomUUID();
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
    }

    const user = await this.findUser(username);
    if (user) return null;

    await connection.query(
      "INSERT INTO users (id, username, password, provider, provider_id) VALUES (?, ?, ?, ?, ?)",
      [id, username, hashedPassword, provider, provider_id],
    );

    return { id, username };
  }

  static async findByProviderId(providerId) {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE provider_id = ?",
      [providerId],
    );
    return rows[0];
  }

  static async findOrCreate({ username, provider, provider_id }) {
    const user = await this.findByProviderId(provider_id);
    if (user) return user; // Si existe el usuario, lo devolvemos para que no se duplique

    return this.create({ username, provider, provider_id });
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
