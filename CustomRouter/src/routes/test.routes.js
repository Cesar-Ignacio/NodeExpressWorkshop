import CustomRouter from "./customRoutes.js";
import { validacionCampos, autenticarUsuario } from "../middleware/validacion.middleware.js";
export class TestRoutes extends CustomRouter {


    init() {
        this.get('/', (req, res, next) => {
            res.sendSuccess("Hola para todos")
        })

        this.post('/login', validacionCampos, autenticarUsuario, (req, res) => {
            try {
                res.sendSuccess("Login Exitoso")
            } catch (error) {
                res.sendServerError(error);
            }
        })
    }
}