const ThemesController = require("../controllers/themes");
const GamesController = require("../controllers/games");
// const GamesModel = require('../models/games');

module.exports = server => {

    server.get("/themes", (req,res) =>{
        ThemesController.getAll(req,res);
    });

    server.get("/games", (req,res) =>{
        GamesController.getThemes(req,res);
    });

    server.post("/newgame", (req, res) => {
        GamesController.createGame(req, res);
    });

    server.post('/games/:id/themes', (req, res) => {
        GamesController.handleThemes(req, res);
      });   
}