const { resolveAny, resolveSoa } = require("dns")
const fs = require("fs")

const storage = require("../storage/storage.js")

function obtenerTodosLosEquipos(){
    return storage.obtenerTodosLosEquipos()
}

function obtenerPorId(numeroId){
    return storage.obtenerPorId(numeroId)
}

function crearEquipo(nuevoEquipo){
    const equipos = storage.obtenerTodosLosEquipos()

    for(let i = 0; i < equipos.length; i++){
        if(equipos[i].numeroId === nuevoEquipo.numeroId ){
            throw new Error("El ID que ingresaste ya esta en uso. Por favor introducir uno nuevo")
        }
    }
    return storage.guardarEquipo(nuevoEquipo)
}


module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    crearEquipo
}