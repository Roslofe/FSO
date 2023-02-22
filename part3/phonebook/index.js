const express = require('express')
const app = express()

app.use(express.json())


let numbers = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    } 
]

app.get('/api/persons', (request, response) => {
    response.writeHead(200, {'Content-type': 'application/json'})
    response.end(JSON.stringify(numbers))
})

app.get('/info', (request, response) => {
    const personNum = numbers.length
    const date = new Date()
    response.send(`<p>Phonebook has info for ${personNum} people</p>
                    <p>${date}</p>`
                    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = numbers.find(entry => entry.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})