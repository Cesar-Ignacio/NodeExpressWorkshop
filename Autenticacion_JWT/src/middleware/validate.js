import { config } from "../config.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const cookieToken = req.signedCookies.token;
    if (!cookieToken) return res.status(401).send({ origin: ".", payload: 'Se requiere token' });
    jwt.verify(cookieToken, config.SECRET, (err, payload) => {
        if (err) return res.status(403).send({ origin: "..", payload: 'Token no válido' });
        req.user = payload;
        next();
    });
}

export const verifyAutenticate = (role) => {
    return async (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).send("Usuario no autorizado");
        }
        next();
    }
}