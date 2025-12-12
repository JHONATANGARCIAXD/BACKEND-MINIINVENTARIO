import { Router } from "express";
import { registrar, inicio, listarpersonas } from "../Controllers/usuarios.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { check } from "express-validator";
import { validarCorreoUnicoUsuario, validarUsuarioPorCorreo } from "../Helpers/usuarios.js";
import { validarCampos } from "../Helpers/validar_campos.js";
const router = Router()

router.post("/registrar",
    [
        check('email').notEmpty().withMessage("POR FAVOR, COMPLETE EL CAMPO EMAIL").isEmail().withMessage("EL FORMATO DEL CORREO ES INCORRECTO").custom(validarCorreoUnicoUsuario),
        check('contraseña').notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CONTRASEÑA"),
        validarCampos
    ],
    registrar)
router.post("/inicio",
    [
        check('email').notEmpty().withMessage("POR FAVOR, COMPLETE EL CAMPO EMAIL").isEmail().withMessage("EL FORMATO DEL CORREO ES INCORRECTO").custom(validarUsuarioPorCorreo),
        check('contraseña').notEmpty().withMessage("POR FAVOR, COMPLETA EL CAMPO CONTRASEÑA"),
        validarCampos
    ],
    inicio)
router.get("/mostrarpersonas", [validarJWT], listarpersonas)

export default router