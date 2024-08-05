import express from 'express'
import routes from './routes/test.routes.js';
import addLogger from './middleware/logger.middleware.js';

const app=express();

app.use(addLogger)

app.get('/',(req,res)=>{
    res.status(200).send("<h1>Bienvenido</h1>")
    req.logger.info(`${req.method} ${req.url}`)
})

app.use('/',routes)


app.listen(8000,()=>{
    console.log("Servidor activo");
})