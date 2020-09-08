const Equipo = require("../entities/equipo")

function dataMapper(equipo){
    const {
        nombre,
        abreviatura,
        estadio,
        direccion,
        anoFundacion,
        numeroId,
        telefono,
        website,
        fotoEscudo,
        pais
    } = equipo


    return new Equipo(
        nombre, 
        abreviatura, 
        estadio, 
        direccion, 
        anoFundacion, 
        numeroId, 
        telefono, 
        website, 
        pais, 
        fotoEscudo
    )
}

module.exports = {
    dataMapper
}