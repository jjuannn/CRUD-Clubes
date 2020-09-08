const fs = require("fs")

const storage = require("../storage/storage.js")

function obtenerTodosLosEquipos(){
    return storage.obtenerTodosLosEquipos()
}

function obtenerPorId(numeroId){
    return storage.obtenerPorId(numeroId)
}

module.exports = {
    obtenerTodosLosEquipos,
    obtenerPorId
}