import { Router } from "express";
import controllerToy from "../controllers/toys.controllers.js";

const toysRoutes=Router();


toysRoutes.get("/",(req,res)=>{
    try {
        res.status(200).send("Bienvenido")
    } catch (error) {
        console.log(error)
    }
})

toysRoutes.get("/get",controllerToy.getToys)
toysRoutes.get("/createToy",controllerToy.createToy)


export default toysRoutes;