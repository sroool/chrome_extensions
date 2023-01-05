let tasks = []

const addTaskBtn = document.querySelector('#add-task-btn')
addTaskBtn.addEventListener('click', () => addTask())
chrome.storage.sync.get(['tasks'], (res) => {
  tasks = res.tasks ? res.tasks : []
  renderTasks()
})

const saveTasks = () => {
  chrome.storage.sync.set({
    tasks,
  })
}
const renderTask = (tasksLength) => {
  const taskRow = document.createElement('div')

  const text = document.createElement('input')
  text.type = 'text'
  text.placeholder = 'Enter a task...'
  text.value = tasks[tasksLength]
  text.addEventListener('change', () => {
    tasks[tasksLength] = text.value
    saveTasks()
  })
  const deleteBtn = document.createElement('input')
  deleteBtn.type = 'button'
  deleteBtn.value = 'x'
  deleteBtn.addEventListener('click', () => {
    deleteTask(tasksLength)
  })

  taskRow.appendChild(text)
  taskRow.appendChild(deleteBtn)

  const taskContainer = document.querySelector('#task-container')
  taskContainer.appendChild(taskRow)
}
const addTask = () => {
  const tasksLength = tasks.length
  tasks.push('')
  renderTask(tasksLength)
  saveTasks()
}

const deleteTask = (tasksLength) => {
  tasks.splice(tasksLength, 1)
  renderTasks()
  saveTasks()
}
const renderTasks = () => {
  const taskContainer = document.querySelector('#task-container')
  taskContainer.textContent = ''
  tasks.forEach((taskText, taskNumber) => {
    renderTask(taskNumber)
  })
}
