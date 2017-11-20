const express = require('express')
const cookieParser = require("cookie-parser");
const exphbs = require("express-handlebars");
const fs = require('fs');
const session = require("express-session");
const bodyParser = require('body-parser');



const app = express()
app.use(express.static(`${__dirname}/public`))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }))



app.use(
  session({
    secret: "123456",
    resave: false,
    saveUninitialized: true
  })
);


app.use(cookieParser());


app.get('/', (req, res) => {
  if (req.session.visited) {

    let params = {};
    if (req.cookies["good-evil"]) {
      if (req.cookies["good-evil"] == "good") {
        params["good"] = "good"
      } else {
        params["evil"] = "evil";
      }
    }
    params.favColor = req.cookies.favColor;
    params.favFood = req.cookies.favFood;

    let resumes = {
      "1": "Accountant",
      "2": "Teacher",
      "3": "Whatever it is Alexandra does",
      "4": "Unicorn Breeder",
      "5": "Web Developer"
    }
    params.resume = [];

    params.resume.push(resumes[req.cookies.insanity]);
    if (params["good"]) {
      params.resume.push("Rescued baby seals");
    }

    if (params["evil"]) {
      params.resume.push("Tricked people into stepping on Legos");
    }

    let likes = ["puppies", "rainbows", "unicorns"];
    if (req.cookies.favColor) {
      likes.push(req.cookies.favColor);
    }
    if (req.cookies.favFood) {
      likes.push(req.cookies.favFood);
    }
    let dislikes = ["TATTOOS (hint hint)", "Brakes", "Spiders"];
    if (params["evil"]) {
      dislikes.push("Helping People")
    }
    if (params["good"]) {
      dislikes.push("Tabs")
    }

    if (Number(req.cookies.insanity) > 3) {
      likes.push("Repetition");
    }

    insanityLevel = Number(req.cookies.insanity);
    for (let i = insanityLevel - 1; i > 0; i--) {
      likes.push("Repetition");
    };

    params["likes"] = likes;
    params["dislikes"] = dislikes;


    let biography = {
      1: "Grew up, got married, had kids, died",
      2: "Grew up, went to India, went to Africa, got married at 50.",
      3: "Grew up, went to Vegas, blew all his money on blackjack and died penniless",
      4: "Never grew up, became a Lost Boy, fought Captain Hook to the death",
      5: "Spent $2000 on an online bootcamp run by people he never met in his life and spent 10 hours a day coding a room talking to people who aren't there"
    }

    params["biography"] = biography[insanityLevel];


    console.log(params)
    res.render('main', params)
  } else {
    req.session.visited = true;
    res.render('main')
  }
});

app.post('/', (req, res) => {
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