const GamesModel = require("../models/themes");

module.exports = {
    getThemes(req, res) {
        GamesModel.find().select('_id').then(themes => {
            res.send(themes);
        }).catch(err => {
            console.log(err);
            res.status(500).send('Server Error');
        });
    }, 
    createGame(req, res) {
        GamesModel
    }
}