'use strict'
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

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
