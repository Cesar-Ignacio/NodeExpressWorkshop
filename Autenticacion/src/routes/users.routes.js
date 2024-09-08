import { Router } from "express";
import { modelUser } from "../dao/models/users.model.js";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";


const routesUsers = Router();
initAuthStrategies();
/**get all users */
routesUsers.get("/", async (req, res) => {
    try {
        const data = await modelUser.find().lean();
        res.status(200).send(data);
    } catch (error) {
        console.error(error.message)
    }
})

routesUsers.post('/createUser', passportCall('register'), (req, res) => {
    try {
        req.session.user = req.user;
        res.status(200).send({ status: true, message:req.authInfo.message, data: { url: '/perfil' } });
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})


export default routesUsers;