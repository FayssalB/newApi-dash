const ThemesController = require("../controllers/themes");
const GamesController = require("../controllers/games");

module.exports = server => {

    server.get("/themes", (req,res) => {
        ThemesController.getAll(req,res);
    });

    server.get("/start/:id", async (req, res) => {
        ThemesController.getThemes(req,res);
    });

    server.get("/games/:id", (req,res) => {
        GamesController.getThemes(req,res);
    });

    server.post("/games/:id/options", (req, res) => {
        GamesController.addOptions(req, res);
    });

    server.post("/newgame", (req, res) => {
        GamesController.createGame(req, res);
    });

    server.post('/games/:id/themes', (req, res) => {
        GamesController.handleThemes(req, res);
    });  

    server.post('/games/:id/points', (req, res) => {
        GamesController.addScores(req, res);
    })
    server.get('/games/:id/points', (req, res) => {
        GamesController.getScores(req, res);
    })

}