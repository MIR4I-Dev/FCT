import DBLocal from "db-local";
const { Schema } = new DBLocal({ path: './db' })
import crypto from 'node:crypto';
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from "./config.js";

const Session = Schema('Session', {
    id: { type: String, required: true },
    username: { type: String, required: true },
    expiresAt: { type: Date, required: true },
})

const User = Schema('User', {
    id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
})

export class UserRepository {
    static async create({ username, password }) {
        //1. Validaciones de username
        Validation.username(username);
        Validation.password(password);

        //3. Validaciones de que el usuario no exista
        const user = User.findOne({ username });
        if (user) throw new Error('User already exists');

        //4. Crear el usuario
        const id = crypto.randomUUID();
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
        const newUser = User.create({
            id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }

    static async login({ username, password }) {
        Validation.username(username);
        Validation.password(password);

        const user = User.findOne({ username });
        if (!user) throw new Error('User not found');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid password');

        const { password: _, ...publicUser } = user;
        return publicUser;
    }

    static async logout() {

    }
}

class Validation {
    static username(username) {
        if (username.length < 3) throw new Error('Username must be at least 3 characters long');
        if (typeof username !== 'string') throw new Error('Username must be a string');
    }

    static password(password) {
        if (password.length < 6) throw new Error('Password must be at least 6 characters long');
        if (typeof password !== 'string') throw new Error('Password must be a string');
    }
}