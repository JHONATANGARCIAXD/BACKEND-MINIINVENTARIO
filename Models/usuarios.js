import mongoose from "mongoose";

const PersonaSchema = new mongoose.Schema({
    usuario: { type: String },
    email: { type: String },
    contraseña: { type: String }
})

export default mongoose.model("Persona", PersonaSchema)
