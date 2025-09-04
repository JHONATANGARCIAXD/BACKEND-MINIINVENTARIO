import productos from "../Models/productos.js";

const BuscarProductoReferenciaNoEx = async (referencia) => {
    const producto = await productos.findOne({ referencia: referencia })
    if (!producto) {
        throw new Error("El PRODUCTO NO EXISTE");
    }
    
}

const BuscarProductoReferenciaEx = async (referencia, { req }) => {
    const referenciaOriginal = referencia
    const nuevaRef = req.body.referencia
    console.log(referenciaOriginal, nuevaRef);
    if (req.body.estado == undefined || req.body.estado == null) {
        if (nuevaRef !== referenciaOriginal) {
            const producto = await productos.findOne({ referencia: referencia })
            if (producto) {
                throw new Error("El PRODUCTO CON ESTA REFERENCIA YA EXISTE");
            }
        }
    }


}



export { BuscarProductoReferenciaNoEx, BuscarProductoReferenciaEx }