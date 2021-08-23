'use strict'
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')
const currentLocation = document.querySelector('#location-btn')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    search.value = ''

    fetch(`/weather?address=${location}`)
        .then((res) => {
            res.json()
                .then((data) => {
                    if (data.error) {
                        return messageOne.textContent = data.error
                    }
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast
                })
        })
})

currentLocation.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition((position) => {

        const { latitude, longitude } = position.coords

        fetch(`/weather?address=${latitude}, ${longitude}`)
            .then((res) => {
                res.json()
                    .then((data) => {
                        if (data.error) {
                            return messageOne.textContent = data.error
                        }
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    })
            })
    })
})
