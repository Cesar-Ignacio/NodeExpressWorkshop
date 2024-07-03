import { Router } from "express";

const viewRouter=Router();

viewRouter.get('/',(req,res)=>{
    res.render('login');
})

viewRouter.all('*',(req,res)=>{
    res.status(404).send("No se encontro la página")
})
export default viewRouter;