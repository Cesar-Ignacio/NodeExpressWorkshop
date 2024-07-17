import { Router } from "express";
import { modelToys } from "../models/toys.model.js";


const toysRoutes = Router();


toysRoutes.get('/', (req, res) => {
    res.status(200).send("<h1>Hola, Bienvenidos</h1>")
})

toysRoutes.get('/getToys', async (req, res) => {
    const data = await modelToys.find().lean();
    res.status(200).send({data})
})


export default toysRoutes;