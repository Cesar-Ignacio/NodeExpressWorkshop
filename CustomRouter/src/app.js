import express from 'express'
import { TestRoutes } from './routes/test.routes.js';
import { engine } from 'express-handlebars';
import { ViewsRoutes } from './routes/views.routes.js';
import { config } from './config.js';

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', config.VIEWS_DIR);


app.use('/',new ViewsRoutes().getRouter());
app.use('/api/test',new TestRoutes().getRouter());

app.listen(8080,()=>{
    console.log("Servidor activo");
})