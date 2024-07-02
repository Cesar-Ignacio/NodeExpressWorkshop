import express from 'express'
import { engine } from 'express-handlebars';
import { config } from './config.js';
import viewRouter from './routes/views.routes.js';
import routesLogin from './routes/login.routes.js';

const app = express();

/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', config.VIEWS_DIR);


app.use("/",viewRouter);
app.use("/api/test",routesLogin)

app.listen(8080, () => {
    console.log("Servidor activo en port 8080");
})