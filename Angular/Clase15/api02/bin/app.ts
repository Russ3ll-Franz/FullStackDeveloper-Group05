import { Application } from "express";
import { erroresManejador } from "../manejadores/errores";
import { ruteador as usuarioRutas } from "../rutas/usuarioRutas";
import { ruteador as autorRutas } from "../rutas/autorRutas";
import { ruteador as libroRutas } from "../rutas/libroRutas";

import express = require("express");
import bodyParser = require("body-parser");
import expressValidator = require("express-validator");

const cors = require("cors");

const app: Application = express();

app.use(express.static("./publico"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "150mb" }));
app.use(expressValidator());

var corsOptions = {
  origin: process.env.DOMINIO,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(express.static("./publico"));

app.use("/usuario", usuarioRutas);
app.use("/libro", libroRutas);
app.use("/autor", autorRutas);

app.use(erroresManejador.noEncontrado);
app.use(erroresManejador.general);

export { app };
