import { Router } from "express";
import { CrateProduct, ShowProducts, SpecificProduct, ModifyProduct, Modifystate, DeleteProduct } from "../Controllers/productos.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { check } from "express-validator";
import { BuscarProductoReferenciaEx, BuscarProductoReferenciaNoEx } from "../Helpers/productos.js";
import { validarCampos } from "../Helpers/validar_campos.js";

const router = Router()

router.post("/createproduct",
    [
        validarJWT,
        check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
        check("categoria").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CATEGORIA"),
        check("cantidad").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CANTIDAD"),
        check("precio").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO PRECIO"),
        check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
        check("referencia").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO REFERENCIA"),
        check("referencia").custom(BuscarProductoReferenciaEx),
        validarCampos
    ], CrateProduct)

router.get("/showproducts", ShowProducts)

router.get("/specifyproduct/:referencia_buscar",
    [
        check("referencia_buscar").custom(BuscarProductoReferenciaNoEx),
        validarCampos
    ], SpecificProduct)

router.put("/modifyproduct/:referencia_buscar",
    [
        validarJWT,
        check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
        check("categoria").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CATEGORIA"),
        check("cantidad").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CANTIDAD"),
        check("precio").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO PRECIO"),
        check("descripcion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DESCRIPCION"),
        check("referencia").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO REFERENCIA"),
        check("referencia_buscar").custom(BuscarProductoReferenciaNoEx),
        check("referencia_buscar").custom(BuscarProductoReferenciaEx),
        , validarCampos
    ], ModifyProduct)


router.put("/modifystate/:referencia_buscar", [
    validarJWT,
    check("referencia_buscar").custom(BuscarProductoReferenciaNoEx),
    validarCampos
], Modifystate)

router.delete("/deleteproduct/:referencia_buscar",
    [
        validarJWT,
        check("referencia_buscar").custom(BuscarProductoReferenciaNoEx),
        validarCampos
    ], DeleteProduct)

export default router