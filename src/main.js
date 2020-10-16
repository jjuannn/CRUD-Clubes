const express = require("express")
const app = express()

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

const mapper = require ("./mapper/mapper.js")
const service = require("./service/service.js")

app.get("/", (req, res) => {

    const equipos = service.obtenerTodosLosEquipos()
    
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

    const equipo = mapper.nuevoEquipoDesdeForm(req.body)
    equipo.fotoEscudo = `/imagenes/${req.file.filename}`

    service.crearEquipo(equipo)

    res.redirect("/")
})

app.get("/editar-equipo?:id", (req, res) => {

    let equipoSeleccionado = service.obtenerPorId(req.query.id)

    res.render("edit-team", {
        layout: "header", 
           data: {
               equipoSeleccionado
        }
    })
})

app.post("/editar-equipo?:id", urlencodedParser, upload.single("escudo"), (req, res) => {
    
    const equipoEditado = req.body
    if(req.file){
        equipoEditado.fotoEscudo = `/imagenes/${req.file.filename}`
    }

    service.editarEquipo(equipoEditado)

    res.redirect("/")
})

app.get("/ver-equipo?:id", (req, res) => {

    let equipoSeleccionado = service.obtenerPorId(req.query.id)

    res.render("view-team", {
        layout: "header", 
           data: {
               equipoSeleccionado
        }
    })
})

app.get("/borrar-equipo?:id", (req, res) => {
    
    service.borrarEquipo(req.query.id)
    
    res.redirect("/")
})

const PUERTO = 3030
app.listen(process.env.PUERTO || PUERTO, console.log(`listening at port ${PUERTO}`))