// Tasktive App
// select dom element
let application_title = document.querySelector(".website-main-title")
let add_new_task_button = document.querySelector(".add-new-task-btn")
// enter new task modal
let modal_container = document.querySelector(".modal-container")
let modal_close_button = document.querySelector(".modal-close-btn")
let modal_title = document.querySelector(".modal-title")
let modal_input = document.querySelector(".modal-input")
let submit_new_task_button = document.querySelector(".submit-new-task")
// task column
let task_status_columns = document.querySelectorAll(".task-status-column")
let no_status_column = document.querySelector("#no-status-column")
let in_progress_column = document.querySelector("#in-progress-column")
let task_complete_column = document.querySelector("#task-complete-column")
// task element
let tasks_container = document.querySelectorAll(".task-container")
let remove_task_buttons = document.querySelectorAll(".remove-task-btn")
let task_inner_texts = document.querySelectorAll(".task-inner-text")
// global variable
let modal_input_value
// task array contain all task in dom
let task_array = []

// when tab load get all task from local storage
window.addEventListener("load", () => {
  // fetch task from local storage
  task_at_ls = JSON.parse(localStorage.getItem("task"))
  // when local storage empty getItem() return null 
  // for handle this if local storage is null make task array empty
  if (task_at_ls !== null) {
    task_array = task_at_ls
    // call this function for create and append task to dom
    reCreateTaskAndAppendToDOM(task_at_ls)
  } else {
    task_array = []
  }

})


// call initialize function
_initial()

// :) i see you are here . please help to improve tasktive app

// initial web page with first value
function _initial() {
  // change document title
  document.title = "Tasktive - practical task manager application"
  // change application page title
  application_title.innerHTML = "Tasktive, practical task manager"
  // add rm functionally to task remove btn
  add_rm_event_task_remove_button()
  // add drag event to all task container in DOM
  add_drag_event_to_all_task()
  // add drop event to task column
  add_drop_event_to_all_task_column()

}


// open modal
add_new_task_button.addEventListener("click", () => {
  // change modal container display to flex for show it
  modal_container.style.display = "flex"

})
// close modal
modal_close_button.addEventListener("click", () => {
  // change modal container display to none for close it
  modal_container.style.display = "none"

})


// enter new task window
submit_new_task_button.addEventListener("click", () => {
  // remove modal input white space with trim
  modal_input_value = modal_input.value.trim()
  // call create task function for create task from input value
  create_new_task(modal_input_value)
  // change modal display to none for hide after click on submit
  modal_container.style.display = "none"
  // make modal input value empty
  modal_input.value = ''


})


// this function give a input value and make a task element
function create_new_task(input_value) {
  // create new task element
  let new_task_container = document.createElement("div")
  let new_task_remove_btn = document.createElement("button")
  let new_task_inner_text = document.createElement("p")
  // select main task container from DOM
  let main_task_container = document.querySelector(".task-status-column")
  let new_task_container_id = generate_random_task()
  let init_state = 'no-status-column'
  // add main task style to new element
  new_task_container.classList.add("task-container")
  new_task_remove_btn.classList.add("remove-task-btn")
  new_task_inner_text.classList.add("task-inner-text")
  // add inner value to new task element
  new_task_remove_btn.innerHTML = "&times;"
  new_task_inner_text.innerText = input_value
  // append new child element to nrw task container
  new_task_container.append(new_task_remove_btn, new_task_inner_text)
  // add specific id to new task
  new_task_container.setAttribute("id", new_task_container_id)
  new_task_container.setAttribute("state", init_state)
  // append new task container to main task container in DOM
  main_task_container.appendChild(new_task_container)
  // add remove functionally to new task remove btn
  add_rm_event_task_remove_button()
  // add drag event to new task container
  add_drag_event_to_all_task()
  // add new task to local storage
  addNewTaskToLocalStorage(new_task_container_id, input_value, init_state)

}
function addNewTaskToLocalStorage(id, value, state) {
  // create empty task container array
  // create task object for local storage
  let task = {
    id: id,
    value: value,
    state: state,
  }
  // push new task an task array
  task_array.push(task)
  // convert array to string and set at the local storage
  localStorage.setItem("task", JSON.stringify(task_array))

}
// this function give a task array from local storage and re create at DOM
function reCreateTaskAndAppendToDOM(tasks) {
  tasks.forEach((task) => {
    // create new task element
    let new_task_container = document.createElement("div")
    let new_task_remove_btn = document.createElement("button")
    let new_task_inner_text = document.createElement("p")
    // select main task container from DOM
    let main_task_container;
    // if statement for save at location
    if (task.state === 'no-status-column') {
      main_task_container = document.getElementById("no-status-column")

    }
    else if (task.state === "in-progress-column") {
      main_task_container = document.getElementById("in-progress-column")

    }
    else if (task.state === "task-complete-column") {
      main_task_container = document.getElementById("task-complete-column")
    }
    // task id
    let new_task_container_id = task.id
    // initial state
    let init_state = task.state
    // add main task style to new element
    new_task_container.classList.add("task-container")
    new_task_remove_btn.classList.add("remove-task-btn")
    new_task_inner_text.classList.add("task-inner-text")
    // add inner value to new task element
    new_task_remove_btn.innerHTML = "&times;"
    new_task_inner_text.innerText = task.value
    // append new child element to nrw task container
    new_task_container.append(new_task_remove_btn, new_task_inner_text)
    // add specific id to new task
    new_task_container.setAttribute("id", new_task_container_id)
    new_task_container.setAttribute("state", init_state)
    // append new task container to main task container in DOM
    main_task_container.appendChild(new_task_container)
    // add remove functionally to new task remove btn
  })
  add_rm_event_task_remove_button()
  // add drag event to new task container
  add_drag_event_to_all_task()

}

// add event to task remove buttons ( loop the button array with forEach)
function add_rm_event_task_remove_button() {
  // select all remove task btn from DOM
  let remove_buttons = document.querySelectorAll(".remove-task-btn")
  let button_parent_element
  // for Each All remove btn
  remove_buttons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      // get remove task btn parent from btn click event
      button_parent_element = event.target.parentElement
      // delete from local storage
      removeTaskFromLocalStorage(button_parent_element.id)
      // clear remove button parent node element from DOM
      button_parent_element.remove()


    })

  })

}

// this function remove task from local storage array
function removeTaskFromLocalStorage(id) {
  // fetch task array from local storage
  task_array = JSON.parse(localStorage.getItem("task"))
  // for every task in task array if equal to task id  return task index
  let index = task_array.findIndex((task) => {
    return task.id === id
    
  })
  // 
  // slice array with selected index
  task_array.splice(index, 1)
  // save new array at local storage
  localStorage.setItem("task", JSON.stringify(task_array))
  
}

// generate random id for new task container
function generate_random_task() {
  // define main char
  let letter = "abcdefghigklmnopqrstwxyz"
  let number = "0123456789"
  // random string
  let rand_str_1 = letter[Math.floor(Math.random() * letter.length)]
  let rand_str_2 = letter[Math.floor(Math.random() * letter.length)]
  let random_string = rand_str_1 + rand_str_2
  // random number
  let rand_num_1 = number[Math.floor(Math.random() * number.length)]
  let rand_num_2 = number[Math.floor(Math.random() * number.length)]
  let random_number = rand_num_1 + rand_num_2
  // make id temperate from random string and number
  let id_template = `${random_string}${random_number}`
  // return new random id for new task container
  return id_template
}


// add drag event to all task container
function add_drag_event_to_all_task() {
  // select all task container from DOM
  let task_containers = document.querySelectorAll(".task-container")
  let task_container_id
  // forEach on the task container array
  task_containers.forEach((task_container) => {
    // make task container draggable
    task_container.setAttribute("draggable", true)
    // add dragstart event to task container 
    // dragstart event run one time on user try to drag task container
    task_container.addEventListener("dragstart", (event) => {
      // get select task container id from event target object
      task_container_id = event.target.id
      // log select task container id
      console.log("drag", task_container_id)
      // set new transfer data for dragged task container
      event.dataTransfer.setData("task_container_id", task_container_id)

    })

  })

}

// add drop event to all task column
function add_drop_event_to_all_task_column() {
  // forEach all column and prevent default drag event behavior
  task_status_columns.forEach((column) => {
    // when a task container drag over a column prevent default behavior
    column.addEventListener("dragover", (event) => {
      event.preventDefault()

    })
    // add drop event to all task container column
    column.addEventListener("drop", (event) => {
      // get task container id from dataTransfer object
      let dragged_task_container_id = event.dataTransfer.getData("task_container_id")
      // select dragged task container with his id from DOM
      let dragged_task_container = document.getElementById(dragged_task_container_id)
      // append dragged task container to column
      column.appendChild(dragged_task_container)
      // log dropped task container id
      console.log("drop", dragged_task_container_id)
      // change state of dragged element in new state
      changeTaskState(dragged_task_container_id, event.target.id)
    })

  })


}

// change state of task when task drop over a column
function changeTaskState(task_id, container_id) {
  // get task array from local storage on parse to array
  // because local storage return a string not a array and convert with
  // JSON.parse() method to iterable array
  task_array = JSON.parse(localStorage.getItem("task"))
  let changedTaskIndex = task_array.findIndex((task) => {
    // if task id in local storage equally to task id in dragged task
    // return task index in the task array from local storage
    return task.id === task_id

  })
  // change task state to column state
  task_array[changedTaskIndex].state = container_id
  // save new task array on the local storage
  localStorage.setItem("task", JSON.stringify(task_array))


}