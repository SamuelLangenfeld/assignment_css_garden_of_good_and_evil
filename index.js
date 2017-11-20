const express = require('express')
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const fs = require('fs');
const session = require("express-session");
const bodyParser = require('body-parser');



const app = express()
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: true}))



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
  let params={};
  res.render('main', params)
} else {
  req.session.visited = true;
  res.render('main')
};

app.post('/', (req, res)=>{
  res.cookie.favFood = req.body.favFood;
  res.cookie["good-evil"]  = req.body["good-evil"];
  res.cookie.favColor = req.body.favColor;
  res.cookie.insanity = req.body.insanity;
  console.log(res.cookie);
  res.redirect("back");
})


})
app.listen(3000, () => console.log('Example app listening on port 3000!'))