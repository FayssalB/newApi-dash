const GamesModel = require("../models/games");

module.exports = {
    getThemes(req, res) {
      const { id } = req.params;
        GamesModel.findById(id).then(themes => {
            res.send(themes);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
    }, 
    handleThemes(req, res) {
        const { id } = req.params;
        const { themeId } = req.body;

        GamesModel.findByIdAndUpdate(id, {}, { new: true, upsert: true})
          .then(game => {
            // Si la game n'est pas trouvé dans la base de donnée 
            if (!game) {
              res.status(404).send('Game not found');
            } else {
              // Si la game est trouvé et que le thème choisi existe déjà, je le retire
              if (game.themes.includes(themeId)) {
                GamesModel.findByIdAndUpdate(id, { $pull: { themes: themeId } })
                  .then(game => {
                    res.send(game);
                  })
                  .catch(error => {
                    console.log(error);
                    res.status(500).send('Internal server error');
                  });
                  // Si le thème n'est pas dans la game, je l'ajoute
              } else {
                GamesModel.findByIdAndUpdate(id, { $addToSet: { themes: themeId } })
                  .then(game => {
                    res.send(game);
                  })
                  .catch(error => {
                    console.log(error);
                    res.status(500).send('Internal server error')
                  })
              }
            }
          })
    },
    createGame(req, res) {
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
    },
    getAll(req,res){
        GamesModel.find().then(games =>{
            res.send(games);
        })
    },
    addOptions(req,res){
        const { nbTeams, nameTeams, chrono } = req.body.options;
        
        const newOption = { nbTeams, nameTeams , chrono };

        const { id } = req.params;
        
        GamesModel.findByIdAndUpdate(id, { options: newOption })
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
    },
  
    addScores(req, res) {
      if (req.body.partie) {
        const { partie } = req.body;
    
        const { id } = req.params;
    
        GamesModel.findByIdAndUpdate(
          id,
          { $push: { points: partie  } },
          { new: true }
        )
          .then(game => {
            if (!game) {
              res.status(404).send('Game not found');
            } else {
              console.log(res);
              res.send(game);
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).send('Internal server error');
          });
      } else {
        res.status(400).send('Bad request: points not provided');
      }
    },
    getScores(req, res) {
      const { id } = req.params;
        GamesModel.findById(id).then(points => {
            res.send(points);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
    }
}