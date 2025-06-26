
const passport=require("passport");
const Auth = require("../Model/AuthModel");
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {
jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
secretOrKey :'Admin',
}

passport.use(new JwtStrategy(opts,async function(payload, done) {
   let checkEmail=await Auth.findOne({email:payload.userData.email})
   if(checkEmail){
        return done(null,checkEmail)
   }else{
    return done(useCallback,false)
   }
}));
passport.serializeUser((user,done)=>{
    return done(null,user.id)
})
passport.deserializeUser(async(id,done)=>{
    let checkEmail=await Auth.findById(id);
    if(checkEmail){
        return done(null,checkEmail)
    }else{
        return done(null,false)
    }
})

module.exports=passport