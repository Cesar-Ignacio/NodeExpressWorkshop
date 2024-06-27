import CustomRouter from "./customRoutes.js";

export class TestRoutes extends CustomRouter {
    
    init() {
        this.get('/', (req, res, next) => {
            
            res.sendSuccess("Hola para todos")
        })

        this.get('/otra',(req,res)=>{
            try {
                res.render('home');
            } catch (error) {
                res.sendServerError(error.menssage);
            }
        })
    }
}