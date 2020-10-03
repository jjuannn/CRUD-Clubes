
const fs = require("fs")

const storage = require("../storage/storage.js")

function obtenerTodosLosEquipos(){
    return storage.obtenerTodosLosEquipos()
}

function obtenerPorId(numeroId){
    return storage.obtenerPorId(numeroId)
}

function crearEquipo(nuevoEquipo){
    return storage.guardarEquipo(nuevoEquipo)
}

function editarEquipo(equipoEditado){
    return storage.guardarCambiosEquipo(equipoEditado)
}

function borrarEquipo(id){
    return storage.borrarEquipo(id)
}

module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId,
    crearEquipo,
    editarEquipo,
    borrarEquipo
}