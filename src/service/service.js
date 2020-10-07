const fs = require("fs")

const storage = require("../storage/storage.js")

function obtenerTodosLosEquipos(){
    return storage.obtenerTodosLosEquipos()
}

function obtenerPorId(numeroId){
    return storage.obtenerPorId(numeroId)
}

function crearEquipo(equipoNuevo){
    return storage.guardarEquipoNuevo(equipoNuevo)
}

function borrarEquipo(id){
    return storage.borrarEquipo(id)
}

function editarEquipo(equipoEditado){
    return storage.guardarCambiosEquipo(equipoEditado)
}

module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    crearEquipo,
    borrarEquipo,
    editarEquipo
}