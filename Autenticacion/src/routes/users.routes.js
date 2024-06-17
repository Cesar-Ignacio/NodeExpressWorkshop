import { Router } from "express";
import { modelUser } from "../dao/models/users.model.js";
import { initAuthStrategies } from "../auth/passport.strategies.js";
import passport from "passport";

const routesUsers=Router();
initAuthStrategies();
/**get all users */
routesUsers.get("/",async(req,res)=>{
    try {
        const data=await modelUser.find().lean();
        res.status(200).send(data);
    } catch (error) {
        console.error(error.message)
    }
})

routesUsers.post('/createUser',passport.authenticate('register'),(req,res)=>{
    try {
        const {message}=req.authInfo;
        if (typeof req.user !== 'object') {
            return res.status(401).send({ status: false, message, data: {} });
         }
         req.session.user = req.user;
         res.status(200).send({ status: true, message, data:{url:'/perfil'} });
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})


export default routesUsers;