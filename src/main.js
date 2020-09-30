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
const { guardarBorrarEquipo } = require("./storage/storage.js")
const obtenerEquipos = service.obtenerTodosLosEquipos
const obtenerPorId = service.obtenerPorId


app.get("/", (req, res) => {

    const equipos = obtenerEquipos()

    res.setHeader("Content-Type", "application/json")
    res.send(equipos)
})
app.post("/agregar-equipo", urlencodedParser, upload.single("escudo"), (req, res) => {

    const equipo = nuevoEquipoDesdeForm(req.body)
    equipo.fotoEscudo = `http://localhost:3030/imagenes/${req.file.filename}`

    service.crearEquipo(equipo)

    res.redirect("/")
    
})

app.get("/editar-equipo?:id", (req, res) => {

    const parametros = req.query.id
    let equipoSeleccionado = obtenerPorId(parametros)

    res.setHeader("Content-Type", "application/json")
    res.send(equipoSeleccionado)
})

app.post("/editar-equipo?:id", urlencodedParser , upload.single("escudo"), (req, res) => {

    const equipoEditado = req.body

    const fotoEscudo = `http://localhost:3030/imagenes/${req.file.filename}`
    equipoEditado.fotoEscudo = fotoEscudo
    
    delete equipoEditado.escudo

    service.editarEquipo(equipoEditado)

    res.redirect("/")
})

app.get("/ver-equipo?:id", (req, res) => {
    let equipoSeleccionado = obtenerPorId(req.query.id)

    res.setHeader("Content-Type", "application/json")
    res.send(equipoSeleccionado)
})

app.get("/borrar-equipo?:id", (req, res) => {

    const borrarEquipo = service.borrarEquipo(req.query.id)

    if(borrarEquipo.success === true){
        res.status(200)
    } else {
        res.status(500)
    }
})

const PUERTO = 3030
app.listen(process.env.PUERTO || PUERTO)