import { Router } from "express";
import { ia_descripcion, ia_precios, ia_recomendacion } from "../Controllers/ia.js";

const router = new Router()
router.post("/descripcion", ia_descripcion)
router.post("/precios", ia_precios)
router.post("/recomendacion/:cliente", ia_recomendacion)


export default router