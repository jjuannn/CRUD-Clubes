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

console.log(__dirname)

app.get("/", (req, res) => {

    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    res.render("main", {
        layout: "header",
        data:{
            equipos: equipos
        }
    })
})
app.get("/agregar-equipo", (req, res) => {

    res.render("add-team", {
        layout: "header",
    })
})

app.post("/agregar-equipo", urlencodedParser, upload.single("escudo"), (req, res) => {

    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))

    const fotoEscudo = `/imagenes/${req.file.filename}`
    const equipoNuevo = req.body
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

    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    let equipoSeleccionado 

    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipoSeleccionado = equipos[i]
        }
    }

    res.render("edit-team", {
        layout: "header", 
           data: {
               equipoSeleccionado: equipoSeleccionado
        }
    })
})

app.post("/editar-equipo/:id", urlencodedParser, upload.single("escudo"), (req, res) => {

    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    
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
    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))

    let equipoSeleccionado 

    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipoSeleccionado = equipos[i]
        }
    }

    res.render("view-team", {
        layout: "header", 
           data: {
               equipoSeleccionado: equipoSeleccionado
        }
    })
})

app.get("/borrar-equipo/:id", (req, res) => {
    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    
    for(let i = 0; i < equipos.length; i++){
        if(`id=${equipos[i].numeroId}` === req.params.id){
            equipos.splice(i, 1)
            break
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos), "utf-8")
    
    res.redirect("/")
})

/*
app.get("/fotos", (req, res) => {
    res.render("fotos", {
        layout: "header"
    })
})
app.post("/fotos", upload.single('imagen'), (req, res) => {
    console.log(req.file)
    res.render("fotos",{
        layout: "header",
        data: {
            mensaje: "Foto subida!",
            nombreArchivo: req.file.filename
        }
    })
})*/

app.listen(3030)