import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'

import { modelUser } from "../dao/models/users.model.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";
import { config } from "../config.js";

const localStrategy = local.Strategy;

export const initAuthStrategies = () => {

    passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const foundUser = await modelUser.findOne({ email: username });
                if (!foundUser) {
                    return done(null, false, { message: 'No se encontro el usuario' });
                }

                if (foundUser && await checkPassword(password, foundUser.password)) {
                    return done(null, foundUser, { message: 'Autenticacíon existosa' });

                } else {
                    return done(null, false, { message: 'Contraseña incorrecta', email: foundUser.email });
                }
            } catch (err) {
                return done(err, false);
            }
        }));

    passport.use('register', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const foundUser = await modelUser.findOne({ email: username });

                if (!foundUser) {
                    const user = {
                        ...req.body,
                        password: await hashPassword(password)
                    }
                    const newUser = new modelUser(user);
                    await newUser.save();
                    return done(null, newUser, { message: 'Usuario registado' });
                } else {
                    return done(null, false, { message: 'El email ya esta registrado' });
                }
            } catch (err) {
                return done(null, false, { message: err.message });
            }

        }));

    passport.use('ghlogin', new GitHubStrategy(
        {
            clientID: config.GITHUB_CLIENT_ID,
            clientSecret: config.GITHUB_CLIENT_SECRET,
            callbackURL: config.GITHUB_CALLBACK_URL
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json?.email || null;

                if (email) {

                    const foundUser = await modelUser.findOne({ email: email });

                    if (!foundUser) {
                        const user = {
                            firstName: profile._json.name.split(' ')[0],
                            lastName: profile._json.name.split(' ')[1],
                            email: email,
                            password: 'none'
                        }
                        const process = new modelUser(user)
                        await process.save();
                        return done(null, process);
                    } else {
                        return done(null, foundUser);
                    }
                } else {
                    return done(new Error('Faltan datos de perfil'), null);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    ));


    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

}

export const passportCall = (stategy) => {
    return (req, res, next) => {
        passport.authenticate(stategy, function (err, user, info) {
            if (err) {
                return next(err);
            };
            if (!user) {
                console.log(`${info.message} ${info.email || ''} ${req.ip}`);
                return res.status(401).send({ status: false, message: info.message });
            }
            req.authInfo = { message: info.message };
            req.user = user;
            next();
        })(req, res, next)
    }
}