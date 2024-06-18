import { Router } from "express";
import passport from "passport";
import { initAuthStrategies } from "../auth/passport.strategies.js";
import { createToken } from "../utils/jwk.js";

const routesTokens = Router();
initAuthStrategies();

routesTokens.get("/", (req, res) => {
    res.status(200).send("Hola mundo");
})

routesTokens.post('/login', passport.authenticate('login'), async (req, res) => {
    try {
        const { message } = req.authInfo;
        if (typeof req.user !== 'object') {
            return res.status(401).send({ status: false, message: message, data: {} });
        }

        const { _id, ...payload } = req.user;/**Hago esto parq que no me tire un error */
        /** const token = createToken(req.user, '15m') tendría que funcionar de esta manera*/
        const token = createToken(payload, '15000')
        res.cookie('cookiePrueba', token, { maxAge: 15000, signed: true, httpOnly: true });
        res.status(200).send({ status: false, message, data: { url: '/perfil', payload: token } });
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})

export default routesTokens;