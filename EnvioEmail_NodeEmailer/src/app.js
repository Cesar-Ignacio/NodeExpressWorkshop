import express from 'express'
import { config } from './config.js';


const app=express();

app.get("/",(req,res)=>{
    res.status(200).send("<h1>Bienvenido!</h1>")
});

app.listen(config.PORT,()=>{
    console.log(`Servidor activo en port ${config.PORT}`)
})