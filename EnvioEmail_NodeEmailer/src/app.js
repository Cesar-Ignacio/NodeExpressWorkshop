import express from 'express'
import { config } from './config.js';
import nodeemailer from 'nodemailer';

const app = express();

console.log(config.GMAIL_APP_USER);
console.log(config.PASS_APP_GMAIL);

const transport = nodeemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.GMAIL_APP_USER,
        pass: config.PASS_APP_GMAIL
    }
})

app.get("/", (req, res) => {
    res.status(200).send("<h1>Bienvenido!</h1>")
});

app.get('/mail', async (req,res) => {

    try {
        let result = await transport.sendMail({
            from: `E-commerce <${config.GMAIL_APP_USER}>`,
            to: "portfolio1a4@gmail.com",
            subject: "Prueba de NodeEmailer",
            html: `
                <div>
                    <strong>Este es un mensaje de prueba 2</strong>
                </div>
            `
        })
        console.log(result)
        res.status(200).send(result)
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }


})

app.listen(config.PORT, () => {
    console.log(`Servidor activo en port ${config.PORT}`)
})