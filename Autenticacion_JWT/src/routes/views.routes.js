import { Router } from "express";
import passport from "passport";
import { initAuthStrategies, passportCall } from "../auth/passport.strategies.js";
import { verifyAutenticate, verifyToken } from "../middleware/validate.js";

const routesViews = Router();
initAuthStrategies();


routesViews.get('/', (req, res) => {
    res.status(200).render('login');
})

routesViews.get('/register', (req, res) => {
    res.status(200).render('register')
})

// routesViews.get('/perfil', verifyToken, (req, res) => {
//routesViews.get('/perfil', passport.authenticate('jwtlogin'), verifyAutenticate('admin'), (req, res) => {
routesViews.get('/perfil', passportCall('jwtlogin'), verifyAutenticate('admin'), (req, res) => {
    //res.status(200).render('perfil',{user:req.session.user})
    console.log(req.user)
    console.log(req.authInfo)
    res.status(200).render('perfil', { user: req.user })
})

export default routesViews;