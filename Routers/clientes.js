import { Router } from "express";
import { CreateClients, ShowClients, SpecificClient, ModifyClient, DeleteClient } from "../Controllers/clientes.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { validarCorreoUnico, validarClientePorNombre, validarClientePorCorreo } from "../Helpers/clientes.js";
import { check } from "express-validator";
import { validarCampos } from "../Helpers/validar_campos.js";


const router = Router()
router.post("/createclients", [
    validarJWT,
    check("correo").notEmpty().isEmail(),
    check("nombre").notEmpty(),
    check("telefono").isNumeric().notEmpty(),
    check("direccion").notEmpty(),
    check("correo").custom(validarCorreoUnico),
    validarCampos

], CreateClients)

router.get("/showclients", [validarJWT], ShowClients)

router.get("/specificClients/:nombre",
    [
        validarJWT,
        check("nombre").custom(validarClientePorNombre),
        validarCampos
    ], SpecificClient)

router.put("/modifyclient/:correo_buscar",
    [
        validarJWT,
        check("correo_buscar").custom(validarClientePorCorreo),
        check("nombre").notEmpty(),
        check("direccion").notEmpty(),
        check("telefono").notEmpty().isNumeric(),
        check("correo").notEmpty().isEmail(),
        check("correo").custom(validarCorreoUnico),
        validarCampos
    ], ModifyClient)

router.delete("/deleteclient/:correo_buscar",
    [
        validarJWT,
        check("correo_buscar").custom(validarClientePorCorreo),
        validarCampos
    ], DeleteClient)

export default router