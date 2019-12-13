const express = require('express');
const path = require('path');
const hbs = require('hbs');
const weather = require('./utils/weather');

const app = express();
const port = process.env.PORT || 3000;

const views = path.join(__dirname, '../resources');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname,'../templates/partials');

app.set("view engine", 'hbs');
app.set("views", viewPath);

hbs.registerPartials(partialsPath);

app.use(express.static(views));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Welcome to the index page',
        author: 'Kiran Kumar'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About page',
        author: 'Kiran Kumar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        author: 'Kiran Kumar'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: '\'address\' query is missing'
        });
    }
    var response = "";
    weather.getWeatherDetails(req.query.address, (error, data) => {
        if(!error){
            response = data;
        }else{
            response = error;
        }
        return res.send({
            response
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a query string \'search\' '
        });
    }

    return res.send({
        products: 'Your product list is here'
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMessage: 'Help Article Not Found!'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        errorMessage: 'Error 404 Page Not Found!'
    });
});

app.listen(port, () => {
    console.log("Server is listening to port "+ port +"...");
});