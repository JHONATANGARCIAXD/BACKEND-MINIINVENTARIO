import { Router } from "express";
import { crearventa, mostrarventaespe, mostrarventas, mostrarventascliente, mostrasventasproducto } from "../Controllers/ventas.js";
import { validarJWT } from "../Middlewares/validar_jwt.js";
import { check } from "express-validator";
import { validarClientePorIdentificacion, validarProductos } from "../Helpers/ventas.js";
import { validarCampos } from "../Helpers/validar_campos.js";


const router = Router()
router.post("/createsales",
    [
        validarJWT,
        check('cliente').notEmpty().withMessage("EL NOMBRE DEL CLIENTE ES OBLIGATORIO").custom(validarClientePorIdentificacion),
        check('productos').notEmpty().custom(validarProductos),
        validarCampos
    ], crearventa)
router.get("/showsales", [validarJWT], mostrarventas)
router.get("/showsaleespecify/:numero", [validarJWT], mostrarventaespe)
router.get("/showsaleclient/:cliente", [validarJWT], mostrarventascliente)
router.get("/showsalesprodcut/:producto", [validarJWT], mostrasventasproducto)
export default router