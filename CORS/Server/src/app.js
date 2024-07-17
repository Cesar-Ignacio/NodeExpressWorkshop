import express from 'express';
import toysRoutes from './routers/toys.routes.js';
import MongoSingleton from './db/mongo.singleton.js';
import cors from 'cors'

const app=express();

/**Configuración de cors */
app.use(cors());

/**Rutas */
app.use('/api/toys',toysRoutes)

app.listen(8080,()=>{
    MongoSingleton.getInstance();
    console.log("Servidor activo");
})


