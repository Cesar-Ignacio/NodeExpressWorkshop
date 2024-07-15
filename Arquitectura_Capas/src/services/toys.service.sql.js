
const getToysService = async () => {
    try {
        return [{id:'7777777',name:"Domino",description:"Madera 10cm2",price:8000}];
    } catch (error) {
        console.log(error);
    }
}

const createToy = async (campos) => {
    try {
        return modelToys.create(campos)
    } catch (error) {
        console.log(error);
    }
}


export default {getToysService,createToy}
