const express=require("express");
const port=8007;
const app=express();

const db=require('./config/db');
const cors=require("cors")
const path=require("path")
const passport=require("passport")
const Strategy=require("./config/passport-jwt")
const session=require("express-session")

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use("/Uploads/Auth",express.static(path.join(__dirname,'Uploads/Auth')))
app.use("/Uploads/Product",express.static(path.join(__dirname,'Uploads/Product')))
app.use("/Uploads/Candidate",express.static(path.join(__dirname,'Uploads/Candidate')))


app.use(session({
    name:"CRM",
    secret:"Crm",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*60
    }
}))
app.use(passport.session())
app.use(passport.initialize())

app.use('/api',require('./Routes/AuthRoutes'))
app.listen(port,(err)=>{
    if(err){
        console.log(err)
        return false
    }
    console.log("port is connectd:-"+port)
    
})