import { Router } from "express";
import { validateRequest } from "../middleware/validateRequest.js";
import { loginSchema } from "../schema/authSchema.js";

const routes = Router();


routes.post('/login',validateRequest(loginSchema),(req, res) => {
    try {
        res.status(200).send({ payload: "Autenticación exitosa" })
    } catch (error) {
        res.status(500).send({ payload: null, error: error.message })
    }
})



export default routes;