const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

app.get('/', async (req, res) => {
    res.render("index.ejs");
})

app.post('/short', urlencodedParser, async (req, res) => {
    let API_KEY = process.env.API_KEY_VALUE;
    let SHORT_URL = req.body.url;
    let SLUG = req.body.slug;
    let URL = null;

    if (!SHORT_URL.startsWith('https://'))
    {
        SHORT_URL = `https://${SHORT_URL}`
    }

    if (SLUG == "") {
        URL = `https://cutt.ly/api/api.php?key=${API_KEY}&short=${SHORT_URL}`
    } else {
        URL = `https://cutt.ly/api/api.php?key=${API_KEY}&short=${SHORT_URL}&name=${SLUG}`
    }
    console.log(SLUG)
    let response = await fetch(URL)
    if (response.ok) {
        json = await response.json();
        if (json["url"]["status"] == 7){
            let short_link = json["url"]["shortLink"];
                    
            res.render("short.ejs", { short_link: short_link})   
        } else {
            if (json["url"]["status"] == 2) {
                res.render("error.ejs", {error: "the entered link is not a link"})
            }
            if (json["url"]["status"] == 3) {
                res.render("error.ejs", {error: "the preferred slug is already taken"})
            }
            if (json["url"]["status"] == 5) {
                res.render("error.ejs", {error: "the link has not passed the validation. Includes invalid characters"})
            }
            if (json["url"]["status"] == 6) {
                res.render("error.ejs", {error: "The link provided is from a blocked domain"})
            }
        }
    } else {
        alert("http Error: " + response.status);
    }
})

var PORT = process.env.PORT || 5000;

app.listen(PORT);