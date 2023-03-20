const ThemesModel = require("../models/themes");

module.exports = {
    getAll(req,res) {
        ThemesModel.find().then(themes =>{
            res.send(themes);
        })
    },

    getThemes(req,res) {
        ThemesModel.findById(req.params.id).then(theme => {
        res.send(theme);
        })
    }
}