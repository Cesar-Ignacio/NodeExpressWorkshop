import { Router } from "express";

const routesViews=Router();

routesViews.get('/',(req,res)=>{
    res.status(200).render('login');
})

routesViews.get('/register',(req,res)=>{
    res.status(200).render('register')
})

routesViews.get('/perfil',(req,res)=>{
    //res.status(200).render('perfil',{user:req.session.user})
    res.status(200).render('perfil',{user:{email:'ww@ss.com'}})
})

export default routesViews;