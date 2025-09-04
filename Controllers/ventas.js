import Venta from "../Models/ventas.js";
import Producto from "../Models/productos.js";


const crearventa = async (req, res) => {
    const { cliente, productos } = req.body
    let total = 0
    const numero = Math.floor(new Date().getTime() * Math.random());

    const nombres_productos = productos.map(producto => producto.nombre)
    const productoDb = await Producto.find({ nombre: nombres_productos })

    for (let elemento of productos) {
        const producto = productoDb.find(nombre => { return nombre.nombre == elemento.nombre })

        total += producto.precio * elemento.cantidad
        await Producto.findOneAndUpdate({ nombre: producto.nombre }, { $inc: { cantidad: -elemento.cantidad } })
    }

    const venta = new Venta({ numero: numero, cliente: cliente, productos: productos, total: total })
    await venta.save()


    res.json({ msg: "CREADA" })
}


const mostrarventas = async (req, res) => {
    const ventas = await Venta.find({})
    res.json(ventas)
}

const mostrarventaespe = async (req, res) => {
    const { numero } = req.params
    const venta = await Venta.findOne({ numero: numero })
    res.json(venta)
}


const mostrarventascliente = async (req, res) => {
    const { cliente } = req.params
    const ventas = await Venta.find({ cliente: cliente })
    res.json(ventas);
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

    res.json(ventas);
};

export { crearventa, mostrarventas, mostrarventaespe, mostrarventascliente, mostrasventasproducto }

