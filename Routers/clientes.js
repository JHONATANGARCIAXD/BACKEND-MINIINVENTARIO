import { Router } from "express";
import { CreateClients, ShowClients, SpecificClient, ModifyClient, Modifystate } from "../Controllers/clientes.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { validarCorreoUnico, validarClientePorIdentificacion, validarIdentificacionUnica } from "../Helpers/clientes.js";
import { check } from "express-validator";
import { validarCampos } from "../Helpers/validar_campos.js";


const router = Router()
router.post("/createclients", [
    validarJWT,
    check("identificacion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO IDENTIFICACION"),
    check("correo").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CORREO").isEmail().withMessage("POR FAVOR, INGRESA UN CORREO VALIDO"),
    check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
    check("telefono").isNumeric().notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO TELEFONO"),
    check("direccion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DIRECCION"),
    check("identificacion").custom(validarIdentificacionUnica),
    check("correo").custom(validarCorreoUnico),
    validarCampos

], CreateClients)

router.get("/showclients", [validarJWT], ShowClients)


router.get("/specifyclient/:id",
    [
        validarJWT,
        check("id").custom(validarClientePorIdentificacion),
        validarCampos
    ], SpecificClient)


router.put("/modifyclient/:identificacion_buscar",
    [
        validarJWT,
        check("identificacion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO IDENTIFICACION"),
        check("nombre").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO NOMBRE"),
        check("direccion").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO DIRECCION"),
        check("telefono").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO TELEFONO").isNumeric().withMessage("POR FAVOR, INGRESA UN TELEFONO VALIDO"),
        check("correo").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CORREO").isEmail().withMessage("POR FAVOR, INGRESA UN CORREO VALIDO"),
        check("identificacion_buscar").custom(validarClientePorIdentificacion),
        check("identificacion").custom(validarIdentificacionUnica),
        check("correo").custom(validarCorreoUnico),
        validarCampos
    ], ModifyClient)


router.put("/modifystate/:identificacion_buscar",
    [
        validarJWT,
        check("identificacion_buscar").custom(validarClientePorIdentificacion),
        check("estado").notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO ESTADO"),
        validarCampos
    ], Modifystate)

export default router