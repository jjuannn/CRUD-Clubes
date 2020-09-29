const fs = require ("fs")
const express = require("express")
const app = express()
const cors = require("cors")

const multer = require ("multer")
const upload = multer({dest: './uploads/imagenes'})

const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("src"))
app.use(express.static(__dirname + "/uploads"))
app.use(express.static(__dirname + '/styles'))
app.use(cors())

const mapper = require ("./mapper/mapper.js")
const nuevoEquipoDesdeForm = mapper.nuevoEquipoDesdeForm

const service = require("./service/service.js")
const obtenerEquipos = service.obtenerTodosLosEquipos
const obtenerPorId = service.obtenerPorId


app.get("/", (req, res) => {

    const equipos = obtenerEquipos()
    

    res.setHeader("Content-Type", "application/json")
    res.send(equipos)
})
app.post("/agregar-equipo", urlencodedParser, upload.single("escudo"), (req, res) => {

    const fotoEscudo = `http://localhost:3030/imagenes/${req.file.filename}`
    const equipo = nuevoEquipoDesdeForm(req.body)
    equipo.fotoEscudo = fotoEscudo
    const equipoNuevo = service.crearEquipo(equipo)

    res.redirect("/")
    
})

app.get("/editar-equipo?:id", (req, res) => {

    const parametros = req.query.id
    let equipoSeleccionado = obtenerPorId(parametros)

    res.setHeader("Content-Type", "application/json")
    res.send(equipoSeleccionado)
})

app.post("/editar-equipo?:id", urlencodedParser , upload.single("escudo"), (req, res) => {
    const equipos = obtenerEquipos()

    const equipoEditado = req.body

    const fotoEscudo = `http://localhost:3030/imagenes/${req.file.filename}`
    equipoEditado.fotoEscudo = fotoEscudo
    
    for(let i = 0; i < equipos.length; i++){
        if(Number(equipoEditado.numeroId) === Number(equipos[i].numeroId)){
            equipos.splice(i, 1, equipoEditado)
        }
    }

    delete equipoEditado.escudo

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos))
})

app.get("/ver-equipo?:id", (req, res) => {
    const parametros = req.query.id
    let equipoSeleccionado = obtenerPorId(parametros)
    
    res.setHeader("Content-Type", "application/json")
    res.send(equipoSeleccionado)
})

app.get("/borrar-equipo?:id", (req, res) => {
    const equipos = obtenerEquipos()
    
    for(let i = 0; i < equipos.length; i++){
        if(Number(equipos[i].numeroId) === Number(req.query.id)){
            equipos.splice(i, 1)
            break
        }
    }

    fs.writeFileSync("./data/listaEquipos.json", JSON.stringify(equipos), "utf-8")

})

const PUERTO = 3030
app.listen(process.env.PUERTO || PUERTO)