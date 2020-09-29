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

function guardarCambiosEquipo(equipoEditado){
    const equipos = obtenerTodosLosEquipos()

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipoEditado.numeroId) === Number(equipos[i].numeroId)){
            equipos.splice(i, 1, equipoEditado)
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    return equipoEditado
}

function guardarBorrarEquipo(id){
    const equipos = obtenerTodosLosEquipos()

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipos[i].numeroId) === Number(id)){
            equipos.splice(i, 1)
            break
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos), "utf-8")
}

function obtenerTodosLosEquipos(){
    const clubes = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const listaEquipos = clubes.map(club => dataMapper(club));
    return listaEquipos
}




module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    guardarEquipo,
    guardarCambiosEquipo,
    guardarBorrarEquipo
}
