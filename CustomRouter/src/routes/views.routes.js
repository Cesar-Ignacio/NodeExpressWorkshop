import CustomRouter from "./customRoutes.js";

export class ViewsRoutes extends CustomRouter{
    init(){
        this.get('/',(req,res)=>{
            res.render('home')
        })
        
        this.get('/login',(req,res)=>{
            res.render('login');
        })
    }
}