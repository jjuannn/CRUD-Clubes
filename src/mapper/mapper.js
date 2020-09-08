const Equipo = require("../entities/equipo")

function nuevoEquipoDesdeForm(equipo){
    const {
        name: nombre,
        tla: abreviatura,
        venue: estadio,
        address: direccion,
        founded: anoFundacion,
        id: numeroId,
        phone: telefono,
        website: website,
        crestUrl: fotoEscudo,
    } = equipo

    const pais = equipo.area

    return new Equipo(
        nombre,
        abreviatura,
        estadio, 
        direccion,
        Number(anoFundacion),
        Number(numeroId),
        telefono,
        website,
        pais,
        fotoEscudo,
    )
}

module.exports = {
    nuevoEquipoDesdeForm
}
