// Retrieve todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");         // input for new to-do item
const todoList = document.getElementById("todoList");           // list item
const todoCount = document.getElementById("todoCount");         // the <span id="count"></span>
const addButton = document.querySelector(".btn");               //
const deleteButton = document.getElementById("deleteButton");   //

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTask();
        }
    });
    deleteButton.addEventListener("click", deleteAllTasks);
    displayTasks();
});

function addTask() {
    const newTask = todoInput.value.trim(); 
    // User's text in the box         ^ trims away unused whitespace to the right, a safety feature
    if (newTask !== "") {
        todo.push({ // adds a new thing to the todo element.  // push whatever is here onto the todo array
            text: newTask,
            disabled: false,
        })
        saveToLocalStorage();
        todoInput.value = "";   // clear value once we've added text
        displayTasks();
    }
}

function displayTasks() {
    // some logic
    todoList.innerHTML = "";
    todo.forEach((item, index) => {
        const p = document.createElement("p");
        p.innerHTML = `
            <div class="todo-container">
                <input type="checkbox" class="todo-checkbox"
                id="input-${index}" ${
            item.disabled ? "checked" : ""
        }>
            <p id="todo-${index}" class="${
            item.disabled ? "disabled" : ""
        }" onclick="editTask(${index})">${item.text}</p>
            </div>
        `;
        p.querySelector(".todo-checkbox").addEventListener
        ("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    })
    todoCount.textContent = todo.length;
}

function editTask(index) {
    const todoItem = document.getElementById(`todo-${index}`);
    const existingText = todo[index].text;
    const inputElement = document.createElement("input");

    inputElement.value = existingText;
    todoItem.replaceWith(inputElement);
    inputElement.focus();

    inputElement.addEventListener("blur", function() {
        const updatedText = inputElement.value.trim();
        if (updatedText) {
            todo[index].text = updatedText;
            saveToLocalStorage();
        }
        displayTasks();
    });
}

function toggleTask(index) {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTasks();
}

function deleteAllTasks() {
    todo = [];
    saveToLocalStorage();
    displayTasks();
}

function saveToLocalStorage() {
    localStorage.setItem("todo", JSON.stringify(todo));
}