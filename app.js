const express = require('express');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.post('/webhook', (req, res) => {
    if (!req.body) return res.sendStatus(400);
    res.setHeader('Content-Type', 'application/json');
    console.log(req.body);
    var city = req.body.queryResult.parameters['geo-city'];
    console.log("Queried city is: " + city);
})

app.get('/', (req, res) => {
    res.render('index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Server Started at ${PORT}`) });