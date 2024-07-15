import service from "../services/toys.service.js";

const getToys = async (req, res) => {
    try {
        const data = await service.getToysService();
        console.log(data);
        res.status(200).send({ data })
    } catch (error) {
        console.log(error)
    }
}

const createToy=async(req,res)=>{
    try {
        const toyNew =await service.createToy({id:'7777777',name:"Domino",description:"Madera 10cm2",price:8000});
        console.log(toyNew);
        res.status(200).send({data:toyNew})
    } catch (error) {
        console.log(error);
    }
}

export default {getToys,createToy}