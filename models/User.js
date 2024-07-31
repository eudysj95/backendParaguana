const {Schema, model} = require("mongoose");

const UserSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    subCategoria: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        default: "default.png"
    },
    mapa: {
        type: String,
        default: "mapa"
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});

module.exports = model("User", UserSchema, "users");