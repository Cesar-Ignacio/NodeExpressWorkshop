import { Router } from "express";
import { validateRequestZod, validateRequestJoi } from "../middleware/validateRequest.js";
import { loginSchemaJoi, loginSchemaZod } from "../schema/authSchema.js";

const routes = Router();

/* Validacion con Zod*/
routes.post('/login',validateRequestZod(loginSchemaZod),(req, res) => {
    try {
        res.status(200).send({ payload: "Autenticación exitosa" })
    } catch (error) {
        res.status(500).send({ payload: null, error: error.message })
    }
})

/** Validacion con Joi 
routes.post('/login',validateRequestJoi(loginSchemaJoi),(req, res) => {
    try {
        res.status(200).send({ payload: "Autenticación exitosa" })
    } catch (error) {
        res.status(500).send({ payload: null, error: error.message })
    }
})*/




export default routes;