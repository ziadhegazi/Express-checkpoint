const express = require("express");

const app = express();

const port = 8000;

app.set('views', './views');
app.set('view engine', 'pug');

const timeCheck = (req, res, next) => {
    let err = null;
    let today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getDay()} ${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`
    console.log("today", date);
    if (today.getDay() < 1 || today.getDay() > 5 || today.getHours() < 9 || today.getHours() > 17) {
        err = new Error;
    }
    next(err);
}
app.use(timeCheck)

const startServer = () => {
    console.log(`The server has started on port ${port}\nlink to go to is: localhost:${port}/HomePage.pug`)
}
app.listen(port, startServer);

app.get("/HomePage.pug", (req, res) => {
    res.render("HomePage")
})
app.get("/OurServices.pug", (req, res) => {
    res.render("OurServices")
})
app.get("/ContactUs.pug", (req, res) => {
    res.render("ContactUs")
})

const errorHandler = (err, req, res, next) => {
    if (err) {
        res.render("Err")
    }
    next();
}
app.use(errorHandler);