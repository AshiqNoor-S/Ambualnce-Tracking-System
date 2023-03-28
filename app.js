const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

mongoose.connect("mongodb://localhost:27017/doctorDB");
const doctorSchema = new mongoose.Schema({
    name: String, 
    email: String, 
    eid: Number,
    password: String
});

const Doctor = new mongoose.model("Doctor", doctorSchema);

// ----------------------------------
// GET and POST requests

app.get("/", function(req, res){
    res.render('home');
});

app.get("/home", function(req, res){
    res.render('home_logged_in');
});

app.get("/login", function(req, res){
    res.render('login');
});

app.post("/login", function(req, res){
    console.log('Login: ' + req.body);

    Doctor.findOne({eid: req.body.eid})
    .then(function(foundUser){
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, function(err, result) {
                if(result == true){
                    res.redirect("/home");
                    // console.log("Logged In!");
                    // console.log(req.body.eid);
                    // console.log(req.body.password);
                }
            });

            // if(foundUser.password === req.body.password)
            // {
            //     res.render("home_logged_in");
            // }
        }
    })
    .catch(function(err){
        console.log(err);
    });
    
});

app.post("/register", function(req, res){
    console.log('Register: ' + req.body);

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        const newUser = new Doctor({
            name: req.body.name, 
            email: req.body.email, 
            eid: req.body.eid,
            password: hash
        });
    
        newUser.save()
        .then(function(){
            res.redirect("/login");
        })
        .catch(function(err){
            console.log(err);
        });
    });
});

// ----------------------------------
app.listen(3000, function(){
    console.log("Server running on port 3000...");
});

// ---------------------

/*
require("dotenv").config();

// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 15;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost:27017/userDB");
const userSchema = new mongoose.Schema({
    email: String, 
    password: String
});

// userSchema.plugin(encrypt, {secret: process.env.SECRET, encryptedFields: ["password"]});

const User = new mongoose.model("User", userSchema);

app.post("/register", function(req, res){

    // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    //     const newUser = new User({
    //         email: req.body.username, 
    //         password: hash
    //     });
    
    //     newUser.save()
    //     .then(function(){
    //         res.render("secrets");
    //     })
    //     .catch(function(err){
    //         console.log(err);
    //     });
    // });
});

app.post("/login", function(req, res){
    // const username = req.body.username;
    // const password = req.body.password;

    // User.findOne({email: username})
    // .then(function(foundUser){
    //     if(foundUser){
    //         bcrypt.compare(password, foundUser.password, function(err, result) {
    //             if(result == true){
    //                 res.render("secrets");
    //             }
    //         });
    //     }
    // })
    // .catch(function(err){
    //     console.log(err);
    // });
});
*/