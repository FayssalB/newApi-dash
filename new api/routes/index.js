const ThemesController = require("../controllers/themes");
const GamesController = require("../controllers/games");
const GamesModel = require('../models/games');

module.exports = server => {

    server.get("/themes", (req,res) => {
        ThemesController.getAll(req,res);
    });

    server.get("/games", (req,res) => {
        GamesController.getThemes(req,res);
    });

    server.post("/games/:id/options", (req, res) => {
        GamesController.addOptions(req, res);
    });

    server.post("/newgame", (req, res) => {
        const { themes } = req.body;

        const newGame = new GamesModel({themes});

        newGame.save()
            .then(game => {
                res.send(game);
            })
            .catch(error => {
                console.log(error);
                res.status(500).send('Internal server error');
            });
    });

    server.post('/games/:id/themes', (req, res) => {
        const { id } = req.params;
        const { themeId } = req.body;
      
        GamesModel.findByIdAndUpdate(id, { $push: { themes: themeId } })
          .then(game => {
            if (!game) {
              res.status(404).send('Game not found');
            } else {
              res.send(game);
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error');
          });
      });
}