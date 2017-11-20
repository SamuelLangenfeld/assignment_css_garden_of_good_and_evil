const express = require('express')
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const fs = require('fs');
const session = require("express-session");


const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')



app.use(
session({
  secret: "123456",
  resave: false,
  saveUninitialized: true
})
);


app.use(cookieParser());


app.get('/', (req,res) => {
if (req.session.visited) {
  res.render('main', params)
} else {

  req.session.visited = true;
  res.render('main')
};




})
app.listen(3000, () => console.log('Example app listening on port 3000!'))