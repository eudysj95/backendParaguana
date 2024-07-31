const mongoose = require("mongoose");

const conectionDb = async() => {
    try{

        await mongoose.connect("mongodb://localhost:27017/AquiEnParaguana");
        console.log("Conectado correcatmente a la base de datos");

    }catch(error){
    
        throw new Error("No se ha podido conectar a la base de datos")
    
    }
}

module.exports = {
    conectionDb
}