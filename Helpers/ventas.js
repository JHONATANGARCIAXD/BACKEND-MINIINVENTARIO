import Cliente from "../Models/clientes.js";
import Producto from "../Models/productos.js";
const validarClientePorNombre = async (nombre, { req }) => {


    const cliente = await Cliente.findOne({ nombre });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
    req.cliente = cliente;
};


const validarProductos = async (productos) => {
    const nombres_productos = productos.map(producto => producto.nombre)
    const productoDb = await Producto.find({ nombre: nombres_productos })


    for (let elemento of productos) {
        const producto = productoDb.find(p => p.nombre == elemento.nombre)
        if (!producto) {
            throw new Error(`EL PRODUCTO ${elemento.nombre} NO EXISTE`);
        }
        if (producto.cantidad < elemento.cantidad) {
            throw new Error(`EL PRODUCTO ${elemento.nombre} NO TIENE STOCK PARA LA VENTA`)
        }
    }

}

export { validarClientePorNombre, validarProductos }