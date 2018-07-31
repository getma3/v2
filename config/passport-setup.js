const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require('../config/keys');
const TeamMember = require('../models/team_member');

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser((id,done)=>{
    TeamMember.findById(id).then(user=>{
        done(null,user);
    })
})
passport.use(
    new GoogleStrategy({
    clientID:keys.google_auth.clientID,
    clientSecret:keys.google_auth.clientSecret,
    callbackURL:"/auth/google/redirect"
},(accessToken,refreshToken,profile,done)=>{
    TeamMember.findOne({googleID:profile.id}).then(user=>{
        if(!user){
            new TeamMember ({
                username:profile.displayName,
                googleID:profile.id,
                thumb:profile._json.image.url
            }).save().then((newUser)=>{
                done(null,newUser);
                console.log('added new team member to db')
            }).catch(err=>{
                console.log('failed to add new team member',err)
            })
        }else{
            console.log('team member already exists..')
            done(null,user);
        } 
    })
}))