// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
// Event Listeners
document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
// functions
function addTodo(e) {
  // prevent from submitting
  e.preventDefault();
  // Todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // add todo to local storage
  saveLocalTodos(todoInput.value);
  // Create complete mark button
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = "<i class='fas fa-check'></i>";
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);
  // Create trash button
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  // append to list
  todoList.append(todoDiv);
  // clear value of todo-input
  todoInput.value = "";
}
function deleteCheck(e) {
  const item = e.target;
  // delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocalTodos(todo)
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  // complete todo
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  // check do i have already things
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  // check do i have already things
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Create complete mark button
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = "<i class='fas fa-check'></i>";
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    // Create trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = "<i class='fas fa-trash'></i>";
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // append to list
    todoList.append(todoDiv);
  });
}

function removeLocalTodos(todo){
  let todos;
  // check do i have already things
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText
  todos.splice(todos.indexOf(todoIndex),1)
  localStorage.setItem('todos',JSON.stringify(todos))
}