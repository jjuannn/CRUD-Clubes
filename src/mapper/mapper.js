const Equipo = require("../entities/equipo")

module.exports = function nuevoEquipo(equipo){
    const {
        name: nombre,
        tla: abreviatura,
        venue: estadio,
        phone: telefono,
        website: sitioWeb,
        crestUrl: fotoEscudo,
        founded: anoFundacion,
        id: numeroId
    } = equipo

    const pais = equipo.area.name
    
    return new Equipo(
        nombre,
        abreviatura,
        estadio, 
        telefono, 
        sitioWeb, 
        fotoEscudo,
        pais,
        Number(anoFundacion),
        Number(numeroId)
        )
}