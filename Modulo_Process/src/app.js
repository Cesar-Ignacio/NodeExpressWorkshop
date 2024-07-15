import express from 'express'
import config from './config/config.js'
import testRoutes from './routes/test.routes.js';

const app=express();


app.use(testRoutes)

app.listen(config.PORT,()=>{
    console.log(`Servidor activo en port ${config.PORT}`)
})
