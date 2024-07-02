export const validacionCampos = (req, res, next) => {
    const e = Object.values(req.body).every(campo => campo !== null && campo !== undefined && campo.toString().trim() !== '')
    if (!e) {
        return res.sendBadRequest("Faltan campos");
    }
    next();
}

export const autenticarUsuario = (req, res, next) => {

    const userDB = {
        email: "cesar@gmail.com",
        password: "123abc"
    }

    try {
        const { email, password } = req.body;
        if (email !== userDB.email || password !== userDB.password) {
            return res.sendUnauthorized('No se encontro el usuario')
        }
        next()
    } catch (error) {
        res.sendServerError(error)
    }

}