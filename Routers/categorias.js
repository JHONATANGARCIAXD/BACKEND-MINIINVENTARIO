import { CreateCategoria, ShowCategoria, UpdateCategoria, UpdateState } from "../Controllers/categorias.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../Helpers/validar_campos.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";

const router = Router()
router.post("/createcategoria", [
    check("id").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ID"),
    check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
    check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
    validarCampos

], CreateCategoria)

router.get("/showcategorias", ShowCategoria)

router.put("/updatecategoria/:id", [
    check("id").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ID"),
    check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
    check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
    validarCampos

], UpdateCategoria)


router.put("/updatestate/:id", [
    validarJWT
], UpdateState)


export default router 