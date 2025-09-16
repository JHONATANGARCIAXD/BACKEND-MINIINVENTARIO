
import Cliente from "../Models/clientes.js";

const validarIdentificacionUnica = async (identificacion, { req }) => {
    const identificacionOriginal = req.params.identificacion_buscar;
    if (identificacion !== identificacionOriginal) {
        const cliente = await Cliente.findOne({ identificacion: identificacion });
        if (cliente) {
            throw new Error("LA IDENTIFICACION YA ESTÁ REGISTRADA");
        }
    }

};


const validarCorreoUnico = async (correo, {req}) => {
    const id = req.params.identificacion_buscar;
    const cliente = await Cliente.findOne({ correo: correo });
    if (cliente && cliente.identificacion !== id) {
        throw new Error("EL CORREO YA ESTÁ REGISTRADO");
    }
};



const validarClientePorIdentificacion = async (identificacion_buscar) => {
    const cliente = await Cliente.findOne({ identificacion: identificacion_buscar });
    if (!cliente) {
        throw new Error("EL CLIENTE NO ESTÁ REGISTRADO");
    }
};

export { validarIdentificacionUnica, validarClientePorIdentificacion, validarCorreoUnico };