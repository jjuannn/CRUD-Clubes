const Equipo = require("../entities/equipo")

function nuevoEquipoDesdeForm(equipo){
    const {
        nombre: nombre,
        abreviatura: abreviatura,
        estadio: estadio,
        direccion: direccion,
        anoFundacion: anoFundacion,
        numeroId: numeroId,
        telefono: telefono,
        website: website,
        escudo: fotoEscudo,
        pais: pais
    } = equipo

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
