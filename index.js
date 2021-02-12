const express = require("express");
const ejs = require("ejs");
const path = require("path");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({ extended: false }) 

app.get('/', async (req, res) => {
    res.render("index.ejs");
})

app.post('/short', urlencodedParser, async (req, res) => {
    let API_KEY = process.env.API_KEY_VALUE;
    let LONG_URL = req.body.url;
    let URL = null;

    console.log(LONG_URL.startsWith('https://'))

    // this is the only way startswith actually returns a correct value
    // please ignore this mess
    if (LONG_URL.startsWith('https://') || LONG_URL.startsWith('http://')) null
    else LONG_URL = `https://${LONG_URL}`

    let r = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "long_url": `${LONG_URL}`, "domain": "bit.ly"})
    });

    if (r.ok)
    {
        let json = await r.json();
        if (!json.hasOwnProperty("timeout")) res.render("short.ejs", { short_link: json["link"] })
        else res.render("error.ejs", { error: "Error - check if url is valid"})
        
    } else {
        res.render("error.ejs", { error: `Error - ${r}` })
    }

    
})

var PORT = process.env.PORT || 5000;

app.listen(PORT);