import { modelToys } from "../models/toys.model.js";

const getToysService = async () => {
    try {
        return await modelToys.find().lean();
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