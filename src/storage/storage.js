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

    const valorActual = equipos.length

    for(let i = 0; i < equipos.length; i++){
        if(equipos[i].numeroId === nuevoEquipo.numeroId ){
            throw new Error("El ID que ingresaste ya esta en uso. Por favor introducir uno nuevo")
        }
    }

    equipos.push(nuevoEquipo)
    
    sobreescribirDB(equipos)
    
    return equipos.length === valorActual
}

function guardarCambiosEquipo(equipoEditado){
    const equipos = obtenerTodosLosEquipos()

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipoEditado.numeroId) === Number(equipos[i].numeroId)){
            if(!equipoEditado.fotoEscudo){ 
                equipoEditado.fotoEscudo = equipos[i].fotoEscudo
            }
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

    return equipos.length - 1 === valorActual
}

function obtenerTodosLosEquipos(){
    const clubes = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const listaEquipos = clubes.map(club => dataMapper(club));
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
