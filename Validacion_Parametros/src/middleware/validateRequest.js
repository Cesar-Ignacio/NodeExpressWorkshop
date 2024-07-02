export const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (err) {
            const message = err.errors.map(e => e.message).join(', ')
            res.status(400).send({ payload: null, error: message });
        }
    }
} 