import mongoose from "mongoose";


const VentaSchema = new mongoose.Schema({
    numero: { type: String },
    cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
    productos: [{
        _id: false,
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Producto',
        },
        cantidad: { type: Number, default: 0 }
    }],
    total: { type: String, default: 0 },
    fecha: { type: Date, default: new Date() }
})

export default mongoose.model("Venta", VentaSchema)