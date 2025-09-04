
import "dotenv/config"
import Ventas from "../Models/ventas.js";
import productos from "../Models/productos.js";
import { usarIA } from "../service/ia.js";


const ia_descripcion = async (req, res) => {
    const { producto } = req.body;

    const respuesta = await usarIA(
        producto,
        "RESPONDE EN ESPAÑOL Y CORTAMENTE, NECESITO QUE HAGAS UNA DESCRIPCIÓN DEL NOMBRE DEL PRODUCTO, BUSCA INFORMACIÓN SOBRE ESTE EN DISTINTAS PARTES, YA SEA TIENDAS O PÁGINAS INFORMATIVAS."
    );

    res.json({ msg: respuesta });
};

const ia_precios = async (req, res) => {
    const { producto } = req.body;

    const respuesta = await usarIA(
        producto,
        "Busca en internet los precios del siguiente producto en distintas tiendas online. Solo responde con el nombre de la tienda y el precio en pesos colombianos (COP), sin agregar ningún otro texto o comentario."
    );

    res.json({ msg: respuesta });
};

const ia_recomendacion = async (req, res) => {
    const { cliente } = req.params;

    const ventas = await Ventas.find({ cliente: cliente });
    const nombre_productos = ventas.map(v => v.productos.map(p => p.nombre));
    const inventario = await productos.find({});

    const respuesta = await usarIA(
        `${nombre_productos}`,
        `Basado en el historial de compras del cliente y los productos que ha adquirido anteriormente, recomienda productos del inventario ${inventario} que puedan interesarle. Devuelve únicamente los nombres de los productos recomendados, sin explicaciones.`
    );

    res.json({ msg: respuesta });
};



export { ia_descripcion, ia_precios, ia_recomendacion }