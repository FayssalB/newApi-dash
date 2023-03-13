const express = require('express');

const server = express();

const mongoose = require("mongoose");

const routes = require("./routes");

server.use(express.json());

server.listen(5602, () => {
    console.log("Serveur lancé et à l'écoute sur le port 5602");
    
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/API-DASH");
    
    const db = mongoose.connection;
    db.once('open', () => console.log("Connexion à la base de Dash !")).on("error", error => console.error("Problème durant la connexion à la base de mongo", error));
});

routes(server);