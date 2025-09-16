import categorias from "../Models/categorias.js"

const CategoriaExiste = async (id, { req }) => {
    const newId = req.body.id

    if (id !== newId) {
        const categoria = await categorias.findOne({ id: newId })
        if (categoria) {
            throw new Error("LA CATEGORIA CON ESTE ID YA EXISTE");
        }
    }
}

export { CategoriaExiste }