import { Router } from "express";
import { registrar, inicio, listarpersonas } from "../Controllers/usuarios.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { check } from "express-validator";
import { validarCorreoUnicoUsuario, validarUsuarioPorCorreo } from "../Helpers/usuarios.js";
import { validarCampos } from "../Helpers/validar_campos.js";
const router = Router()

router.post("/registrar",
    [
        check('usuario').notEmpty(),
        check('email').notEmpty().isEmail().custom(validarCorreoUnicoUsuario),
        validarCampos
    ],
    registrar)
router.post("/inicio",
    [
        check('email').notEmpty().isEmail().custom(validarUsuarioPorCorreo),
        validarCampos
    ],
    inicio)
router.get("/mostrarpersonas", [validarJWT], listarpersonas)

export default router