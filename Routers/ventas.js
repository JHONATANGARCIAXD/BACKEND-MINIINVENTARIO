import { Router } from "express";
import { crearventa, mostrarventaespe, mostrarventas, mostrarventascliente, mostrasventasproducto } from "../Controllers/ventas.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { check } from "express-validator";
import { validarClientePorNombre, validarProductos } from "../Helpers/ventas.js";
import { validarCampos } from "../Helpers/validar_campos.js";


const router = Router()
router.post("/crearventa",
    [
        validarJWT,
        check('cliente').notEmpty().custom(validarClientePorNombre),
        check('productos').notEmpty().custom(validarProductos),
        validarCampos
    ], crearventa,)
router.get("/mostrarventas", [validarJWT], mostrarventas)
router.get("/mostrarventaes/:numero", [validarJWT], mostrarventaespe)
router.get("/mostrarventascliente/:cliente", [validarJWT], mostrarventascliente)
router.get("/mostrarventasproducto/:producto", [validarJWT], mostrasventasproducto)
export default router