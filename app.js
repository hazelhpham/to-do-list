//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todoFilter = document.querySelector(".filter-todo");
//eventlistener: click to add, click to mark done, click to delete
todoButton.addEventListener("click", addToDo);
todoList.addEventListener("click", deleteItem);
todoFilter.addEventListener("click", filter);
//functions
function addToDo(event) {
  //prevent from re-submitting
  event.preventDefault();
  //to do div
  const todo = document.createElement("div");
  //class for that div
  todo.classList.add("todo");
  //LI
  const newToDo = document.createElement("li");
  newToDo.innerText = todoInput.value;
  newToDo.classList.add("todo-item");
  todo.appendChild(newToDo);

  //check mark button
  const checkMark = document.createElement("button");
  checkMark.classList.add("check-button");
  checkMark.innerHTML = '<i class="fa fa-check"> </i>';
  todo.appendChild(checkMark);
  //delete button
  const deleteMark = document.createElement("button");
  deleteMark.classList.add("delete-button");
  deleteMark.innerHTML = '<i class="fa fa-trash"> </i>';
  todo.appendChild(deleteMark);

  todoList.appendChild(todo);

  //clear fields when user finish entering
  todoInput.value = "";
}

//delete button
function deleteItem(e) {
  const item = e.target;
  //delete button
  if (item.classList[0] === "delete-button") {
    //animation
    item.parentElement.classList.add("fall");
    item.parentElement.addEventListener("transitionend", function () {
      //an event to stop the transition?
      item.parentElement.remove();
    });
  }

  //check button
  else if (item.classList[0] === "check-button") {
    item.parentElement.classList.toggle("completed"); //add a class => do CSS later
  }
}

//filter function: filter the completed and the incompleted
function filter(e) {
    const todos = todoList.childNodes;
    console.log(todos);
        todos.forEach(function(todo) {
        
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
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //Create todo div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Create list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";
      //Create Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Create trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //attach final Todo
      todoList.appendChild(todoDiv);
    });
  }