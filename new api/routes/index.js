const ThemesController = require("../controllers/themes");

module.exports = server =>{

    server.get("/themes", (req,res) =>{
        ThemesController.getAll(req,res);
    });
}