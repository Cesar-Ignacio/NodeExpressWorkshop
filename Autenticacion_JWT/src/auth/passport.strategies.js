import passport from "passport";
import local from 'passport-local';
import GitHubStrategy from 'passport-github2'
import jwt from 'passport-jwt';
import { modelUser } from "../dao/models/users.model.js";
import { checkPassword, hashPassword } from "../utils/bcrypt.js";
import { config } from "../config.js";

const localStrategy = local.Strategy;
const jwtStrategy = jwt.Strategy;
const jwtExtractor = jwt.ExtractJwt;

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.signedCookies) token = req.signedCookies["token"];
    return token;
}


export const initAuthStrategies = () => {

    passport.use('login', new localStrategy({ passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const foundUser = await modelUser.findOne({ email: username }).lean();
                if (!foundUser) {
                    return done(null,false, { message: 'Usuario no encontrado' });
                }

                if (foundUser && await checkPassword(password, foundUser.password)) {
                    //const { password, ...filteredFoundUser } = foundUser;
                    return done(null, {
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        email: foundUser.email,
                        role: foundUser.role
                    }, { message: 'Autenticacíon existosa' });
                } else {
                    return done(null,false, { message: 'Contraseña incorrecta' });
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
                    return done(null, " ", { message: 'El email ya esta registrado' });
                }
            } catch (err) {
                return done(null, " ", { message: err.message });
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

    passport.use('jwtlogin', new jwtStrategy(
        {
            // Aquí llamamos al extractor de cookie
            jwtFromRequest: jwtExtractor.fromExtractors([cookieExtractor]),
            secretOrKey: config.SECRET
        },
        async (jwt_payload, done) => {
            
            try {
                return done(null, jwt_payload, { message: 'Autenticacíon existosa' });
            } catch (err) {
                return done(err);
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
            if(!user){
                return res.status(401).send({ status: false, message: info.message , data: {} })
            }
            req.authInfo={message:info.message};
            req.user = user;
            next();
        })(req, res, next)
    }
}
