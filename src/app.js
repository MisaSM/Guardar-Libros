const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

// configurando el puerto que se usará para "hostear" la aplicación y escogiendo
//el motor de vistas (ejs) 
app.set("port", 3000); 
app.set("views",path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(express.urlencoded({extended:"false"}));
app.use(express.json());

//le decimos a la app que use las rutas configuradas en el archivo especificado
app.use(require("./routes/routes"));

app.use(express.static(path.join(__dirname, "public")));

module.exports = app;


