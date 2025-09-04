import mongoose from "mongoose";


const VentaSchema = new mongoose.Schema({
    numero: {type: String},
    cliente: {type: String},
    productos: {type: Array},
    total: {type: String, default: 0},
    fecha: {type: Date, default: new Date()}
})

export default mongoose.model("Venta", VentaSchema)