
const PORT = process.env.PORT || 3300;
const express = require("express");
const app = express();
const Joi = require('joi');
const path = require("path");
const bodyParser = require('body-parser');
const Book = require("./modules/mongoDB");
var chalk = require('chalk');
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
const publicDirectoryPath = path.join(__dirname, "./public");
app.use(express.static(publicDirectoryPath));
const views = path.join(__dirname, './views');
app.set('views', views);


app.use(function (req, res, next) {
  next();
})

app.post('/index/:number', function (req, res) {
  console.log("METHOD: ", chalk.green(req.method));
  console.log("URL: ", req.url);

  Book.find({ pageCount: { $gt: req.params.number } }, function (err, orders) {

    if (err) throw err;

    console.log(orders);
    res.render("books", { Book: orders });
  });

});


app.get('/index/:number', function (req, res) {
  console.log("METHOD: ", chalk.red(req.method));
  console.log("URL: ", req.url);

  Book.find({ pageCount: { $gt: req.params.number } }, function (err, orders) {

    if (err) throw err;


    console.log(orders);
    res.render("books", { Book: orders });

  });

});

app.get('', (req, res) => { 
    res.redirect(303,"/");
 })

app.listen(PORT, () => console.log('Example app listening on port ' + PORT));


