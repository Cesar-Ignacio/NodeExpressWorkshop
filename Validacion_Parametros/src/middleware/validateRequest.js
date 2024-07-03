
export const validateRequestZod = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            // mostrar todos los ms junstos
            // const message = err.errors.map(e => e.message).join(', ')
            res.status(400).send({ payload: null, error: err.errors[0].message });
        }
    }
}

export const validateRequestJoi = schema => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({
                payload:null,
                error: error.details[0].message
            });
        }
        next();
    }
}
