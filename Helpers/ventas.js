import Cliente from "../Models/clientes.js";
import Producto from "../Models/productos.js";
const validarClientePorIdentificacion = async (id) => {
    const cliente = await Cliente.findOne({ _id: id });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
};


const validarProductos = async (productos) => {
    const id_productos = productos.map(producto => producto.id)
    const productoDb = await Producto.find({ _id: { $in: id_productos } })

    for (let elemento of productos) {
        const producto = productoDb.find(p => p._id == elemento.id)
        if (!producto) {
            throw new Error(`EL PRODUCTO ${elemento._id} NO EXISTE`);
        }
        if (producto.cantidad < elemento.cantidad) {
            throw new Error(`EL PRODUCTO ${producto.nombre} NO TIENE STOCK PARA LA VENTA`)
        }
    }

}

export { validarClientePorIdentificacion, validarProductos }