import { Router } from 'express';
import { config } from '../config.js'


export default class CustomRouter {

    constructor() {
        this.router = Router();
        this.init();
    }

    init() { } // Vacío, se redeclarará en clase heredada

    getRouter() {
        return this.router;
    }

    applyCallBacks(callBacks) {
        return callBacks.map(callBack => async (...params) => {
            try {
                await callBack.apply(this, params);
            } catch (err) {
                console.log(err);
                params[1].status(500).send({ origin: config.SERVER, payload: null, error: err.message });
            }
        })
    }

    generateCustomResponses(req, res, next) {
        // Método para 200 Success
        res.sendSuccess = payload => res.status(200).send({ origin: config.SERVER, payload: payload });
        // Método para 400 Bad Request
        res.sendBadRequest = err => res.status(400).send({ origin: config.SERVER, payload: null, error: err });
        // Método para 401 Unauthorized
        res.sendUnauthorized = err => res.status(401).send({ origin: config.SERVER, payload: null, error: err });
        // Método para 403 Forbidden
        res.sendForbidden = err => res.status(403).send({ origin: config.SERVER, payload: null, error: err.message });
        // Método para 404 Not Found
        res.sendNotFound = err => res.status(404).send({ origin: config.SERVER, payload: null, error: err.message });
        // Método para 500 Internal Server Error
        res.sendServerError = err => res.status(500).send({ origin: config.SERVER, payload: null, error: err.message });
        next();
    }

    get(path, ...callBacks) {
        this.router.get(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    post(path, ...callBacks) {
        this.router.post(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    put(path, ...callBacks) {
        this.router.put(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }

    delete(path, ...callBacks) {
        this.router.delete(path, this.generateCustomResponses, this.applyCallBacks(callBacks));
    }
};