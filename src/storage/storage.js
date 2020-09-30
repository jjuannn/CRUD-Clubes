const fs = require ("fs")

const mapper = require("../mapper/dataMapper.js")
const dataMapper = mapper.dataMapper

function obtenerPorId(idEquipo){
    const clubes = obtenerTodosLosEquipos()
    let equipoSeleccionado
    for(let i = 0; i < clubes.length; i++){
        if(Number(clubes[i].numeroId) === Number(idEquipo)){
            equipoSeleccionado = clubes[i]
        }
    }
    return equipoSeleccionado
}

function guardarEquipo(nuevoEquipo){
    const equipos = obtenerTodosLosEquipos()

    equipos.push(nuevoEquipo)
    
    sobreescribirDB(equipos)

    return dataMapper(nuevoEquipo)
}

function guardarCambiosEquipo(equipoEditado){
    const equipos = obtenerTodosLosEquipos()

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipoEditado.numeroId) === Number(equipos[i].numeroId)){
            equipos.splice(i, 1, equipoEditado)
        }
    }

    sobreescribirDB(equipos)

    return equipoEditado
}

function borrarEquipo(id){
    const equipos = obtenerTodosLosEquipos()
    
    const valorActual = equipos.length

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipos[i].numeroId) === Number(id)){
            equipos.splice(i, 1)
            break
        }
    }

    sobreescribirDB(equipos)

    if(equipos.length === valorActual){
        return {success: false}
    } else {
        return {success: true}
    }

}

function obtenerTodosLosEquipos(){
    const clubes = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const listaEquipos = clubes.map( club => {
        return dataMapper(club)
    })
    return listaEquipos
}

function sobreescribirDB(equipos){
    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos), "utf-8")
}



module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    guardarEquipo,
    guardarCambiosEquipo,
    borrarEquipo
}