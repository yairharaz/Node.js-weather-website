const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config:
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') //Coustmize the directory of the template. The default is views directory
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup hendalebars and views location:
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve:
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yair Haraz'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yair Haraz',
        content: 'Lihi and me in Lefkada, Greece.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP',
        name: 'Yair Haraz',
        msg: 'This page content some common questions and answers that may help you solve your problem.',
        footer: 'Hope it was helpful...'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        return res.send({
            error: 'You must provide an address!.'
        })
    }
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                location,
                forecast: forecastData,
                address
            })
        })
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }

//     console.log(req.query.search);
//     res.send({
//         products: []
//     })
// })

app.get('/help/*', (req, res) => {
    res.render('help-404', {
        title: '404',
        errorMessage: 'Help article not found.',
        name: 'Yair Haraz'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found.',
        name: 'Yair Haraz'
    })
})


app.listen(3000, () => {
    console.log('server is up on port 3000');
})