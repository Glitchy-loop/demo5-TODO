const getTodos = async () => {
  const res = await fetch('http://localhost:8080/tasks')
  const data = await res.json()

  setDate()
  updateTable(data)

  const allTodos = document.querySelectorAll('.todo input[type="checkbox"]')
  allTodosDivs(allTodos)

  const deleteBtns = document.querySelectorAll('.todo .deleteDiv')
  allDeleteBtns(deleteBtns)
}

getTodos()

const allDeleteBtns = allBtns => {
  allBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      let id = btn.parentNode.id

      fetchDelete(id)

      btn.parentElement.classList.add('fadeAway')
      setTimeout(() => {
        btn.parentElement.remove()
      }, 1000)
    })
  })
}

const allTodosDivs = allTodos => {
  allTodos.forEach(item => {
    item.addEventListener('click', () => {
      item.parentNode.classList.toggle('marked')
      item.classList.toggle('marked')
    })
  })
}

const fetchDelete = id => {
  fetch(`http://localhost:8080/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
}

const updateTable = data => {
  const todos = document.querySelector('.todos')

  data.forEach(todo => {
    const div = document.createElement('div')
    div.className = 'todo'
    div.id = todo.id

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'

    const label = document.createElement('label')
    label.textContent = todo.text

    const deleteBtn = document.createElement('div')
    deleteBtn.className = 'deleteDiv'
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-eraser'

    deleteBtn.append(icon)

    label.append(checkbox)

    div.append(label, deleteBtn)

    todos.append(div)
  })
}

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
