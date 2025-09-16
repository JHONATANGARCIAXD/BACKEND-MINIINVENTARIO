import Cliente from "../Models/clientes.js";
import Producto from "../Models/productos.js";
const validarClientePorIdentificacion = async (id) => {
    console.log(id);
    const cliente = await Cliente.findOne({ _id: id });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
};


const validarProductos = async (productos) => {
    const nombres_productos = productos.map(producto => producto.producto)
    const productoDb = await Producto.find({ _id: { $in: nombres_productos } })

    for (let elemento of productos) {
        const producto = productoDb.find(p => p._id == elemento.producto)
        if (!producto) {
            throw new Error(`EL PRODUCTO ${elemento.producto} NO EXISTE`);
        }
        if (producto.cantidad < elemento.cantidad) {
            throw new Error(`EL PRODUCTO ${elemento.producto} NO TIENE STOCK PARA LA VENTA`)
        }
    }

}

export { validarClientePorIdentificacion, validarProductos }