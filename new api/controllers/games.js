const GamesModel = require("../models/games");

module.exports = {
    getThemes(req, res) {
        GamesModel.find().select('themes').then(themes => {
            res.send(themes);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
    }, 
    
    getAll(req,res){
        GamesModel.find().then(games =>{
            res.send(games);
        })
    },
    addOptions(req,res){
        const { nbTeams, nameTeams, chrono } = req.body.options;

        const newOption = { nbTeams, nameTeams, chrono };

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
    }
}