import express from 'express'
import { engine } from 'express-handlebars';
import { config } from './config.js';
import viewsRoutes from './routes/views.routes.js';

const app=express();
/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', config.VIEWS_DIR);

app.use('/',viewsRoutes)

app.listen(8080,()=>{
    console.log(`Servidor activo en port 8080`);
})
