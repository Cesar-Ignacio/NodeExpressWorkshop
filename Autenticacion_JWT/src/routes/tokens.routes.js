import { Router } from "express";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { createToken } from "../utils/jwk.js";

const routesTokens = Router();
initAuthStrategies();


routesTokens.get("/", (req, res) => {
    res.status(200).send("Hola mundo");
})

//routesTokens.post('/login', passport.authenticate('login'), async (req, res) => {
routesTokens.post('/login', passportCall('login'), async (req, res) => {
    try {
        const { message } = req.authInfo;
        const token = createToken(req.user, '60000')
        res.cookie('token', token, { maxAge: 60000, signed: true, httpOnly: true });
        res.status(200).send({ status: false, message, data: { url: '/perfil' } });
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})

export default routesTokens;