const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=90a0e286c9885ba5ce8d06080fef92ce&query=${latitude},${longitude}&units=`
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const description = body.current.weather_descriptions[0]
            const temperature = body.current.temperature
            const feelsLike = body.current.feelslike
            const humidity = body.current.humidity
            const location = `${body.location.name}, ${body.location.region} District, ${body.location.country}`
            callback(undefined, `${description}. It is currently  ${temperature} degrees, and feels like ${feelsLike} degrees out. Humidity is ${humidity}%.`, location)
        }
    })
}

module.exports = forecast