const express = require('express')
const app = express()
app.use(express.json())
app.use(cors())
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
  next()
}
const cors = require('cors')

app.use(requestLogger)

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2024-06-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'browswers can execute only JavaScript',
    date: '2024-06-30T18:39:34.091Z',
    important: false
  },
{id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2024-06-30T19:20:14.298Z',
    important: true
  },
  {id: 4,
    content: 'Node.js is an execution environment for JavaScript',
    date: '2024-06-30T19:20:14.298Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = notes.find(note => note.id === id)

    if (note) {
        res.json(note)
    } else {
            res.status(404).end()
        }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = Number(req.params.id)
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(400).json({ error: 'content missing' })
  }

  const note = {
    id: Math.floor(Math.random() * 1000000),
    content: body.content,
    important: body.important || false,
    date: new Date().toISOString(),
  }

  notes = notes.concat(note)

  res.json(note)
})
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})