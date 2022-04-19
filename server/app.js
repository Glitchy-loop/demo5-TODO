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
  if (req.body.task) {
    tasks.push({
      id: req.body.id,
      text: req.body.task
    })
    res.send('Task added successfully')
  }
  res.send('Incorrect data')
})

app.get('/tasks/:id', (req, res) => {
  res.send(tasks[Number(req.params.id)])
})

// DELETE

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(item => item.id !== Number(req.params.id))
  res.status(200).send({ msg: 'Deleted' })
})

// Port

const port = 8080
app.listen(port, () => console.log(`Server is running on port ${port}`))
