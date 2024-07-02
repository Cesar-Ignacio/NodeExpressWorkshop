import { Router } from "express";

const viewRouter=Router();

viewRouter.get('/',(req,res)=>{
    res.render('login');
})

export default viewRouter;