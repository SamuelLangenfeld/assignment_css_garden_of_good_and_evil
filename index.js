const express = require('express')
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const fs = require('fs');
const session = require("express-session");
const bodyParser = require('body-parser');



const app = express()
app.use(express.static(`${__dirname}/public`))
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
  if (req.cookies["good-evil"]){
    if (req.cookies["good-evil"]=="good"){
      params["good"]="good"
    }
    else{
      params["evil"]="evil";
    }
  }
  params.favColor = req.cookies.favColor;
  params.favFood = req.cookies.favFood;

  let resumes={
    "1":"Accountant",
    "2":"Teacher",
    "3":"Whatever it is Alexandra does",
    "4":"Unicorn Breeder",
    "5":"Web Developer"
  }

  params.resume = resumes[req.cookies.insanity];


  console.log(params)
  res.render('main', params)
} else {
  req.session.visited = true;
  res.render('main')
}
});

app.post('/', (req, res)=>{
  const favColor = req.body.favColor || "";
  const insanity = req.body.insanity || "";
  const favFood = req.body.favFood || "";
  const goodEvil = req.body["good-evil"] || "";

  res.cookie('favColor', favColor);
  res.cookie('favFood', favFood);
  res.cookie("good-evil", goodEvil);
  res.cookie("insanity", insanity);

  res.redirect("back");
});


app.listen(3000, () => console.log('Example app listening on port 3000!'))