import { CreateCategoria, ShowCategoria, ModifyCategoria, ModifyState } from "../Controllers/categorias.js";
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../Helpers/validar_campos.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { CategoriaExiste } from "../Helpers/categorias.js";



const router = Router()
router.post("/createcategoria", [
    check("id").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ID"),
    check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
    check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
    check("id").custom(CategoriaExiste),
    validarCampos

], CreateCategoria)

router.get("/showcategorias", ShowCategoria)

router.put("/updatecategoria/:id", [
    check("id").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ID"),
    check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
    check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
    check("id").custom(CategoriaExiste),
    validarCampos

], ModifyCategoria)


router.put("/updatestate/:id", [
    validarJWT,
    check("id").notEmpty().withMessage("ID NO VALIDO"),
    check("estado").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ESTADO"),
    validarCampos
], ModifyState)


export default router 