import express from 'express'
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';

import routesViews from './routes/views.routes.js';

import routesTokens from './routes/tokens.routes.js';
import { config } from './config.js';

const app = express();
/**Middleware de aplicacion */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/**Config sessions */
app.use(session({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true
}));
/**Configuracion cookies */
app.use(cookieParser(config.SECRET));
/**Configuracion de passport */
app.use(passport.initialize());
app.use(passport.session());

/**Config hanblebars */
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', config.VIEWS_DIR);
/**Routes */
app.use(routesViews);

app.use('/api/tokens',routesTokens)
/**Init servidor */
app.listen(config.PORT, async () => {
    await mongoose.connect(config.MONGODB_URI);
    console.log("Servidor activo")
})