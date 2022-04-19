const setDate = () => {
  const today = document.querySelector('.day')
  const monthAndYear = document.querySelector('.monthAndYear')
  const todayInWords = document.querySelector('.today')

  let todaysDate = new Date()

  let dd = String(todaysDate.getDate()).padStart(2, '0')
  let mm = String(todaysDate.getMonth() + 1).padStart(2, '0')
  let yyyy = todaysDate.getFullYear()

  const getDayName = dayIndex => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
    return days[dayIndex]
  }

  let dayName = getDayName(todaysDate.getDay())

  todayInWords.textContent = dayName

  today.textContent = dd
  monthAndYear.innerHTML = `${mm} <p>${yyyy}</p>`

  todayInWords
}

setDate()

const addTodoBtn = document.querySelector('#addTodoBtn')
const input = document.querySelector('.addTD label textarea')
console.log(input)

const addTodo = () => {
  let todo = input.value.trim()
  let randomId = Math.floor(Math.random() * 10000)

  if (todo.length > 0) {
    fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: randomId,
        task: todo
      })
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  }

  window.location.replace('./index.html')
}

addTodoBtn.addEventListener('click', addTodo)

window.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    addTodo()
  }
})
