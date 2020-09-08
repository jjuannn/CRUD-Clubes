const fs = require ("fs")

const mapper = require("../mapper/dataMapper.js")
const dataMapper = mapper.dataMapper

function obtenerTodosLosEquipos(){
    return leerListaDeEquipos()
}

function leerListaDeEquipos(){
    const clubes = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const listaEquipos = clubes.map( club => {
        return dataMapper(club)
    })
    return listaEquipos
}

function obtenerPorId(idEquipo){
    const clubes = leerListaDeEquipos()
    let equipoSeleccionado
    for(let i = 0; i < clubes.length; i++){
        if(Number(clubes[i].numeroId) === Number(idEquipo)){
            equipoSeleccionado = clubes[i]
        }
    }
    return equipoSeleccionado
}

module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId
}