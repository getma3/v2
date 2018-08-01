const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ForumPost_Schema = new Schema ({
   body:String,
   user:String,
   date:Date
})

const Forum_post = mongoose.model("forum-posts",ForumPost_Schema);

module.exports = Forum_post;
