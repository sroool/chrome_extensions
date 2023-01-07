let tasks = []

const updateTime = () =>{
  chrome.storage.local.get(["timer"], (res)=>{
    const time = document.querySelector("#time");
    const minutes = `${25 -  Math.ceil(res.timer / 60)}`.padStart(2, "0");
    let seconds = "00";
    if(res.timer % 60 !== 0){

      seconds = `${60 - res.timer % 60}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
  })
} 
updateTime()
setInterval(updateTime, 1000)
const startTimerBtn = document.querySelector('#start-timer-btn')
startTimerBtn.addEventListener('click', () => {
  chrome.storage.local.get(['isRunning'], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? 'Pause Timer'
          : 'Start Timer'
      },
    )
  })
})
const resetTimerBtn = document.querySelector('#reset-timer-btn')
resetTimerBtn.addEventListener('click', () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer"
    },
  )
})
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
