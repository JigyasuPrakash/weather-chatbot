const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.post('/webhook', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'application/json');
    var city = req.body.queryResult.parameters['geo-city'];
    console.log("Queried city is: " + city);

    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=59f1493446889d1ab3cc857582a0bda7`)
        .then((response) => {
            const result = `Right now in ${city} it feels ${response.data.weather[0].description} with a temperature of ${response.data.main.temp - 273.15} degree Celsius.`
            const resObj = {
                fulfillmentText: " ",
                fulfillmentMessages: [{ "text": { "text": [result] } }],
                source: "OpenWeather"
            }
            return res.json(resObj);
        })
        .catch((err) => {
            console.error("Somthing went wrong", err);
        })
})

app.get('/', (req, res) => {
    res.render('index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server Started at ${PORT}`) });