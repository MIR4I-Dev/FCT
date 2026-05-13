import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "../../config/config.js";
import { connection } from "../../config/config.js";

export class UserModel {

  static #toPublic(user) {
    const { password: _, ...publicUser } = user;
    return publicUser;
  }

  static async findUser(email, username = null) {
    let query = "SELECT * FROM users WHERE email = ? OR username = ?";
    let queryParams = [email, username];

    const [rows] = await connection.query(query, queryParams);
    return rows[0] || null;
  }

  static async create({
    username,
    email,
    password = null,
    provider = "local",
    provider_id = null,
  }) {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, Number(SALT_ROUNDS));
    }

    const userExists = await this.findUser(email, username);
    if (userExists) return null;

    const [result] = await connection.query(
      "INSERT INTO users (username, email, password, provider, provider_id) VALUES (?, ?, ?, ?, ?)",
      [username, email, hashedPassword, provider, provider_id],
    );

    return this.#toPublic({ id: result.insertId, username, email, provider, provider_id, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }

  static async findByProviderId(providerId) {
    const [rows] = await connection.query(
      "SELECT * FROM users WHERE provider_id = ?",
      [providerId],
    );
    return rows[0];
  }

  static async findOrCreate({ username, email, provider, provider_id }) {
    const user = await this.findByProviderId(provider_id);
    if (user) return this.#toPublic(user);

    const existingLocalUser = await this.findUser(email);
    if (existingLocalUser) {
      const updatedUser = await this.updateProvider({ email, provider, provider_id });
      return updatedUser;
    }

    return this.create({ username, email, provider, provider_id });
  }

  static async login({ email, password }) {
    const user = await this.findUser(email);
    if (!user || user.provider !== "local") return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return this.#toPublic(user);
  }

  static async postSubmission({ email, description }) {
    if (!email || !description) return null;
    const user = await this.findUser(email);
    if (!user) return null;
    const { id: user_id } = user;

    await connection.query(
      "INSERT INTO submissions (user_id, description) VALUES (?, ?)",
      [user_id, description],
    );

    return { status: "success" };
  }
  static async updateProvider({ email, provider, provider_id }) {
    await connection.query(
      "UPDATE users SET provider = ?, provider_id = ?, password = NULL WHERE email = ?",
      [provider, provider_id, email],
    );
    return this.#toPublic(await this.findUser(email));
  }
}
