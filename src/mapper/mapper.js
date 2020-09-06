const Equipo = require("../entities/equipo")

module.exports = function nuevoEquipo(equipo){
    const {
        name: nombre,
        tla: abreviatura,
        venue: estadio,
        phone: telefono,
        website: website,
        crestUrl: fotoEscudo,
        founded: anoFundacion,
        id: numeroId,
        area: pais
    } = equipo

    
    return new Equipo(
        nombre,
        abreviatura,
        estadio, 
        telefono, 
        website, 
        fotoEscudo,
        pais,
        Number(anoFundacion),
        Number(numeroId)
        )
}