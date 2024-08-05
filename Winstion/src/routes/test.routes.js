import { Router } from "express";

const routes = Router();


routes.get("/testLoggers", (req, res) => {
    res.status(200).send("<h1>Prueba de Logger</h1>")
    req.logger.fatal("Se accedio a la fatal");
    req.logger.error("Se accedio a la error");
    req.logger.warning("Se accedio a la warning");
    req.logger.info("Se accedio a la info");
    req.logger.http("Se accedio a la htto");
    req.logger.debug("Se accedio a la denug");
})


export default routes;