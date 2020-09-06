const fs = require ("fs")
const express = require("express")
const app = express()

const path = require("path")
const multer = require ("multer")
const upload = multer({dest: './uploads/imagenes'})

const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const expHandlebars = require ("express-handlebars")
const hbs = expHandlebars.create()

app.use(express.static("src"))
app.use(express.static(__dirname + "/uploads"))
app.use(express.static(__dirname + '/styles'))

app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

const Equipo = require("./entities/equipo.js")
const nuevoEquipo = require ("./mapper/mapper.js")
const e = require("express")

const obtenerEquipos  = () => {
    return JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
}

app.get("/", (req, res) => {

    const equipos = obtenerEquipos()

    res.render("main", {
        layout: "header",
        data:{
            equipos
        }
    })
})
app.get("/agregar-equipo", (req, res) => {

    res.render("add-team", {
        layout: "header",
    })
})

app.post("/agregar-equipo", urlencodedParser, upload.single("escudo"), (req, res) => {

    const equipos = obtenerEquipos()

    const fotoEscudo = `/imagenes/${req.file.filename}`
    const equipoNuevo = nuevoEquipo(req.body)
    equipoNuevo.fotoEscudo = fotoEscudo
    equipos.push(equipoNuevo)

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    res.render("add-team", {
        layout: "header",
        data: {
            foto: req.file.filename
        }
    })
    res.redirect("/")
})

app.get("/editar-equipo/:id", (req, res) => {

    const equipos = obtenerEquipos()
    let equipoSeleccionado 
    
    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipoSeleccionado = equipos[i]
        }
    }

    res.render("edit-team", {
        layout: "header", 
           data: {
               equipoSeleccionado
        }
    })
})

app.post("/editar-equipo/:id", urlencodedParser, upload.single("escudo"), (req, res) => {

    const equipos = obtenerEquipos()
    
    const equipoEditado = req.body
    const fotoEscudo = `/imagenes/${req.file.filename}`
    equipoEditado.fotoEscudo = fotoEscudo

    for(let i = 0; i < equipos.length; i++){
        if(Number(equipoEditado.numeroId) === Number(equipos[i].numeroId)){
            equipos.splice(i, 1, equipoEditado)
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    res.render("edit-team", {
        layout: "header",
        data: {
            foto: req.file.filename
        }
    })
    res.redirect("/")
})

app.get("/ver-equipo/:id", (req, res) => {
    const equipos = obtenerEquipos()

    let equipoSeleccionado 

    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipoSeleccionado = equipos[i]
        }
    }

    res.render("view-team", {
        layout: "header", 
           data: {
               equipoSeleccionado
        }
    })
})

app.get("/borrar-equipo/:id", (req, res) => {
    const equipos = obtenerEquipos()
    
    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipos.splice(i, 1)
            break
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos), "utf-8")
    
    res.redirect("/")
})

const PUERTO = 3030
app.listen(process.env.PUERTO || PUERTO)