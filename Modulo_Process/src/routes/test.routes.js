import { Router } from "express";
import { fork } from 'child_process';

const testRoutes = Router();

const list = (...numbers) => {
    numbers.forEach(n => {
        if (isNaN(n)) {
            console.log("Se detecto error");
            process.exit(-4);
        }
        console.log(n)
    })
}


const complex = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(70);
        }, 9000);
    });
};


// process.on('exit', code => {
//     console.log(`Código de error ${code}`)
// })

testRoutes.get('/', (req, res) => {
    res.status(200).json({ message: "Hola mundo", payload: `Activo ${process.uptime().toFixed(1)}` })
});


testRoutes.get('/list', (req, res) => {
    list(4, 7, "dd", 10);
    res.status(200).send("Se ejecuto funcion list")
})

testRoutes.get('/complexAsync', async (req, res) => {
    res.status(200).json({ valor: await complex() })
})

testRoutes.get('/complexOp', (req, res) => {
    const child = fork('./src/funncion.js');
    child.send("start");

    child.on('message', result => {
        console.log(result)
        res.status(200).json({ valor: result });
    });

})


export default testRoutes;