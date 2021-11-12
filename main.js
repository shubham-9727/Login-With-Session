const express = require('express')
const session = require('express-session')
const fs = require("fs");
const app = express();
const port = 3000

app.use(express.static("public"));

app.use(express.urlencoded());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.get("/", function (req, res) {
    if (req.session.is_logged_in) {
        res.sendFile(__dirname + "/index.html")
    }
    else {
        res.redirect("/login")
    }
})

app.get("/login", function (req, res) {
    if (req.session.is_logged_in) {
        res.redirect("/")
    }
    else {
        res.sendFile(__dirname + "/login.html")
    }
})

app.post("/login", function (req, res) {
    console.log(req.session);
    if (true) {
        req.session.is_logged_in = true;
        req.session.username = req.body.username;
    }
    res.redirect("/");
})

app.post("/signup", function (req, res) {
    console.log(req.body);
    res.redirect("/login");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})