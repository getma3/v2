const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StageSchema = new Schema ({
    name:String,
    location:[Number],
    routes:[Number],
    options:[String],
    desc:String,
    nearby:[String]
})

const Stage = mongoose.model("stages",StageSchema);

module.exports = Stage
