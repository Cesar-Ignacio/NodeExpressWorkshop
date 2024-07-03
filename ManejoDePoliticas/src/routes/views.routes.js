import { Router } from "express";
import { handlePolice } from "../middleware/handlePolice.js";

const viewsRoutes=Router();



viewsRoutes.get('/',(req,res)=>{
    res.render('home');
})

viewsRoutes.get('/viewUser',handlePolice(["USER","PRIMIUM","ADMIN"]),(req,res)=>{
    res.render('viewUser')
})

viewsRoutes.get('/viewPrimium',handlePolice(["PRIMIUM","ADMIN"]),(req,res)=>{
    res.render('viewPrimium')
})

viewsRoutes.get('/viewAdmin',handlePolice(["ADMIN"]),(req,res)=>{
    res.render('viewAdmin')
})



export default viewsRoutes;