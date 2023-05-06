const ws = new WebSocket('ws://localhost:8080')
const form = document.querySelector('#formWs')
const container = document.querySelector('#container')

form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()

    const name = form.name.value
    const message = form.message.value

    const data = JSON.stringify({
        name: name,
        message: message
    })
    ws.send(data)
    clearData()
}

function clearData() {
    form.message.value = ''
}

ws.onmessage = (event) => {
    try {
        const data = JSON.parse(event.data)
        container.insertAdjacentHTML('beforeend', `<li>${data.name}: ${data.message}</li>`)
    } catch (event) {
        console.error('Can not parse data')
    }
}


ws.onopen = () => {
    console.log('Connection was established')
}

ws.onclose = () => {
    console.log('Connection was stopped')
}

ws.onerror = (error) => {
    console.log('Connection was interrupted: ', error.message)
}