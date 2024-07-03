export const handlePolice = (policies) => {
    return (req, res, next) => {
        
        if (policies.includes("PUBLIC")) return next();

        // con session -> const user = req.session.user;

        const user=req.query.user;
    

        // Redirigir si no hay usuario en la sesión
        if (!user) return res.redirect('/');

        // Verificar si el rol del usuario está permitido
        if (!policies.includes(user.toUpperCase())) {
            let message = '';

            if (user.toUpperCase() === 'USER') {
                message = 'Access Denied: User role does not have the required permissions.';
            } else if (user.toUpperCase() === 'PREMIUM') {
                message = 'Access Denied: Premium role does not have the required permissions.';
            } else {
                errorMessage = 'Access Denied: Your role does not have the required permissions.';
            }
            return res.status(403).json({ status: false, message });
        }

        // Agregar el usuario a la solicitud y continuar
        req.user = user;
        next();
    }
}