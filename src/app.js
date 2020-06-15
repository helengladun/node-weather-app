const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render('index', {
    title: 'Weather App',
    author: 'Helen'
  });
});

app.get("/about", (req, res) => {
  res.render('about', {
    title: 'About page',
    author: 'Helen'
  });
});

app.get("/help", (req, res) => {
  res.render('help', {
    title: 'Help page',
    message: 'Some help message here',
    author: 'Helen'
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Address not provided'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({error})
    } else {
      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({error: 'Address not provided'})
        } else {
          res.send({
            location,
            forecast,
            address: req.query.address
          })
        }
      });
    }
  });
});



app.get('/help/*', (req, res) => {
  res.render('article-404', {
    title: '404',
    errorMessage: 'Help article not found.',
    author: 'Helen'
  });
});

app.get("*", (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    author: 'Helen'
  });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});