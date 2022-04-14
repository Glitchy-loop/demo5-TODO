const todos = document.querySelector('.todos')

const getTodos = async () => {
  const res = await fetch('http://localhost:8080/tasks')
  const data = await res.json()

  data.forEach(todo => {
    const div = document.createElement('div')
    div.className = 'todo'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'

    const label = document.createElement('label')
    label.textContent = todo
    label.append(checkbox)

    div.append(label)

    todos.append(div)
  })
  const allTodos = document.querySelectorAll('.todo input[type="checkbox"]')

  allTodos.forEach(item => {
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('marked')
      item.classList.toggle('marked')
      console.log(item.parentNode.textContent)
    })
  })
}

getTodos()

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
