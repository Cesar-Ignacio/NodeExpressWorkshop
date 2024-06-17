import express from 'express'
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

import routesViews from './routes/views.routes.js';
import routesUsers from './routes/users.routes.js';
import routesSessions from './routes/sessions.routes.js';
import { config } from './config.js';

const app = express();
/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**Config sessions */
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGODB_URI,
        ttl: 15
    }),
    secret: "claveSecreta",
    resave: true,
    saveUninitialized: true
}));
/**Configuracion de passport */
app.use(passport.initialize());
app.use(passport.session());
/**Config hanblebars */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', config.VIEWS_DIR);
/**Routes */
app.use(routesViews);
app.use('/api/users', routesUsers)
app.use('/api/sessions', routesSessions)
/**Init servidor */
app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Servidor activo")
})