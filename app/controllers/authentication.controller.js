import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getConnection } from '../DB.js';

dotenv.config();

async function login(req, res) {
    // console.log(req.body);
    const user = req.body.user;
    const password = req.body.password;

    if (!user || !password) {
        return res.status(400).send({ status: "Error", message: "Los Campos Estan Incompletos" });
    }

    try {
        const connection = getConnection();
        const [rows] = await connection.promise().query('SELECT * FROM nuevo_usuario WHERE user = ?', [user]);

        if (rows.length === 0) {
            return res.status(400).send({ status: "Error", message: "Error durante en login" });
        }

        const usuarioARevisar = rows[0];
        const loginCorrecto = await bcryptjs.compare(password, usuarioARevisar.password);

        if (!loginCorrecto) {
            return res.status(400).send({ status: "Error", message: "Error durante el login" });
        }

        const token = jsonwebtoken.sign(
            { user: usuarioARevisar.user },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const cookieOpiton = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            path: "/"
        };

        res.cookie("jwt", token, cookieOpiton);
        res.send({ status: "Ok", message: "Usuario Logeado", redirect: "/admin" });
    } catch (error) {
        console.error('Error during login:', error.stack);
        res.status(500).send({ status: "Error", message: "Error durante el login" });
    }
}

async function register(req, res) {
    const fullname = req.body.fullname;
    const user = req.body.user;
    const email = req.body.email;
    const password = req.body.password;

    if (!fullname || !user || !email || !password) {
        return res.status(400).send({ status: "Error", message: "Los Campos Estan Incompletos" });
    }

    try {
        const connection = getConnection();
        const [existingUser] = await connection.promise().query('SELECT * FROM nuevo_usuario WHERE user = ?', [user]);

        if (existingUser.length > 0) {
            return res.status(400).send({ status: "Error", message: "Usuario ya registrado" });
        }

        const salt = await bcryptjs.genSalt(5);
        const hashPassword = await bcryptjs.hash(password, salt);

        await connection.promise().query(
            'INSERT INTO nuevo_usuario (fullname, user, email, password) VALUES (?, ?, ?, ?)',
            [fullname, user, email, hashPassword]
        );

        res.status(201).send({ status: "Ok", message: `Usuario ${user} agregado`, redirect: "/" });
    } catch (error) {
        console.error('Error during registration:', error.stack);
        res.status(500).send({ status: "Error", message: "Error durante el registro" });
    }
}

export const methods = {
    login,
    register
};
