import CustomRouter from "./customRoutes.js";

export class ViewsRoutes extends CustomRouter{
    init(){

        this.get('/',(req,res)=>{
            res.render('home')
        })

    }
}