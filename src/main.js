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

app.use(express.static(`${__dirname}/uploads`))
app.use(express.static(__dirname + '/styles'))
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

const Equipo = require("./entities/equipo.js")
const nuevoEquipo = require ("./mapper/mapper.js")
const { type } = require("os")
const { createSecretKey } = require("crypto")
const { POINT_CONVERSION_HYBRID } = require("constants")


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

app.post("/agregar-equipo", urlencodedParser, upload.single("fotoEscudo"), (req, res) => {
    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    const equipoNuevo = req.body
    equipos.push(equipoNuevo)
    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))

    res.render("add-team", {
        layout: "header",
    })
    res.redirect("/")
})
app.get("/editar-equipo/:id", (req, res) => {
    const equipos = JSON.parse(fs.readFileSync("./data/listaEquipos.json", "utf-8"))
    for(let i = 0; i < equipos.length; i++){
        let equipoSeleccionado
        if(equipos[i].numeroId === req.params.id){
            return equipoSeleccionado = equipos[i]
        }
    }
    //console.log(equipoSeleccionado)
    res.render("edit-team", {
        layout: "header", 
           //data: equipoSeleccionado
    })
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