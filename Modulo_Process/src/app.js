import express from 'express'
import config from './config/config.js'

const app=express();

app.listen(config.PORT,()=>{
    console.log(`Servidor activo en port ${config.PORT}`)
})
