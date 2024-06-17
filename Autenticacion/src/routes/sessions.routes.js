import { Router } from "express";
import passport from "passport";

import { initAuthStrategies } from "../auth/passport.strategies.js";

const routesSessions = Router();

initAuthStrategies();

routesSessions.post('/login',passport.authenticate('login'), async (req, res) => {
    try {
        if (typeof req.user !== 'object') {
            const {message}=req.authInfo;
            return res.status(401).send({ status: false, message:message, data: {} });
         }
         req.session.user = req.user;
         res.status(200).send({ status: true, message: req.authInfo.message, data:{url:'/perfil'} });
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})

routesSessions.post('/logout',(req,res)=>{
    try {
        req.session.destroy(err=>
        {
            if(err){
                throw new Error("Error al eliminar session");
            }
            res.status(200).send({status:true,message:'',data:{url:'/'}})
        })
        
    } catch ({ message }) {
        console.error(message)
        res.status(500).send({ status: false, message, data: {} })
    }
})

routesSessions.get('/ghlogin', passport.authenticate('ghlogin', {scope: ['user']}), async (req, res) => {
});

routesSessions.get('/ghlogincallback', passport.authenticate('ghlogin'), async (req, res) => {
    try {
        req.session.user = req.user // req.user es inyectado AUTOMATICAMENTE por Passport al parsear el done()
        req.session.save(err => {
            if (err) throw new Error("Error al obtener datos")
            res.redirect('/perfil');
        });
    } catch ({message}) {
        res.status(500).send({ status: false, message, data: {} });
    }
});



export default routesSessions;
