const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ThemesSchema = new Schema ({
    themes : String,
    element: Array
});
////1ere argument est la collectio dans la db
const ThemesModel = mongoose.model("themes", ThemesSchema);

module.exports = ThemesModel;