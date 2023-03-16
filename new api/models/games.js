const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GamesSchema = new Schema ({
    themes : Array,
    options: {
        nbTeams : Number,
        nameTeams: Array,
        chrono: Number
    }
});
////1ere argument est la collectio dans la db
const GamesModel = mongoose.model("games", GamesSchema);

module.exports = GamesModel;