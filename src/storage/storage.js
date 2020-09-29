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
    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    return dataMapper(nuevoEquipo)
}


function obtenerTodosLosEquipos(){
    const clubes = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const listaEquipos = clubes.map( club => {
        return dataMapper(club)
    })
    return listaEquipos
}

module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    guardarEquipo
}