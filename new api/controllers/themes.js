const ThemesModel = require("../models/themes");

module.exports = {
    getAll(req,res){
        ThemesModel.find().then(themes =>{
            res.send(themes);
        })
    }

}