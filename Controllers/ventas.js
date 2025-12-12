import Venta from "../Models/ventas.js";
import Producto from "../Models/productos.js";


const crearventa = async (req, res) => {
    const { cliente, productos, numero } = req.body
    let total = 0

    const ids_productos = productos.map(producto => producto.id)
    const productoDb = await Producto.find({ _id: { $in: ids_productos } })

    for (let elemento of productos) {
        const producto = productoDb.find(p => p._id == elemento.id)
        total += producto.precio * elemento.cantidad
        await Producto.findOneAndUpdate({ _id: producto._id }, { $inc: { cantidad: -elemento.cantidad } })
    }

    const venta = new Venta({ numero: numero, cliente: cliente, productos: productos, total: total })
    await venta.save()

    res.json({ msg: "VENTA CREADA" })
    
}


const mostrarventas = async (req, res) => {
    const ventas = await Venta.find({}).populate("cliente").populate("productos.id")

    res.json({msg: ventas})

}

const mostrarventaespe = async (req, res) => {
    const { numero } = req.params
    const venta = await Venta.findOne({ numero: numero })
    res.json({ msg: venta })
}

const mostrarventascliente = async (req, res) => {
    const { cliente } = req.params
    const ventas = await Venta.find({ cliente: cliente })
    res.json({ msg: ventas });
}

const mostrasventasproducto = async (req, res) => {
    const { producto } = req.params
    const { fecha_in, fecha_fi } = req.body;

    const ventas = await Venta.find({
        $and: [
            { "productos.nombre": producto },
            {
                fecha: {
                    $gte: fecha_in,
                    $lte: fecha_fi
                }
            },
        ]
    });

    res.json({msg: ventas});
};

export { crearventa, mostrarventas, mostrarventaespe, mostrarventascliente, mostrasventasproducto }

