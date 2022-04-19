const express = require('express')
const cors = require('cors')
let tasks = require('./data.json')

const app = express()
app.use(express.json())
app.use(cors())

// Routes

// GET server

app.get('/', (req, res) => {
  res.send('OK')
})

// GET tasks

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

// POST

app.post('/tasks', (req, res) => {
  if (req.body.task && req.body.id) {
    tasks.push({
      id: req.body.id,
      text: req.body.task
    })
    res.send('Task added successfully')
  } else {
    return res.status(400).send('Incorrect data')
  }
})

app.get('/tasks/:id', (req, res) => {
  res.send(tasks[Number(req.params.id)])
})

// DELETE

app.delete('/tasks/:id', (req, res) => {
  if (req.params.id) {
    tasks = tasks.filter(item => item.id !== Number(req.params.id))
    res.status(200).send({ msg: 'Deleted' })
  } else {
    res.status(400).send({ msg: 'Something went wrong' })
  }
})

// Port

const port = 8080
app.listen(port, () => console.log(`Server is running on port ${port}`))
