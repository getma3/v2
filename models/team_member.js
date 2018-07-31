const mongoose =require("mongoose")
const Schema = mongoose.Schema;

const TeamMember_Schema = new Schema ({
    username:String,
    googleID:String,
    thumb:String
})

const TeamMember = mongoose.model('team_members',TeamMember_Schema);

module.exports = TeamMember;