import jsonwebtoken from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getConnection } from '../DB.js';

dotenv.config();

async function soloAdmin(req, res, next) {
    const logeado = await revisarCookie(req);
    if (logeado) return next();
    return res.redirect('/');
}

async function soloPublico(req, res, next) {
    const logeado = await revisarCookie(req);
    if (!logeado) return next();
    return res.redirect('/admin');
}

async function revisarCookie(req) {
    try {
        const cookies = req.headers.cookie;
        if (!cookies) {
            console.log('No cookies found in the request.');
            return false;
        }

        const cookieJWT = cookies.split('; ').find(cookie => cookie.startsWith('jwt='));
        if (!cookieJWT) {
            console.log('JWT cookie not found.');
            return false;
        }

        const token = cookieJWT.slice(4);
        const decodificada = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decodificada);

        const connection = getConnection();
        const [rows] = await connection.promise().query('SELECT * FROM nuevo_usuario WHERE user = ?', [decodificada.user]);

        if (rows.length === 0) {
            console.log('User not found in the database.');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error during cookie verification:', error);
        return false;
    }
};

export const methods = {
    soloAdmin,
    soloPublico
};
