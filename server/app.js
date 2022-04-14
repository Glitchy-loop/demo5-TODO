const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

const tasks = ['Take out trash', 'Buy milk', 'Clean house']

app.get('/', (req, res) => {
  res.send('OK')
})

app.get('/tasks', (req, res) => {
  res.send(tasks)
})

app.post('/tasks', (req, res) => {
  if (req.body.task) {
    tasks.push(req.body.task)
    return res.send('Task added successfully')
  }
  return res.send('Incorrect data')
})

app.delete('/tasks:id', (req, res) => {
  res.send('ok')
})

// app.delete('/people:id', (req, res) => {
//   tasks = tasks.filter(item => item.id !== Number(req.params.id))
//   res.send({ msg: 'Deleted' })
// })

app.listen(8080, () => console.log('Server is running on port 8080'))
