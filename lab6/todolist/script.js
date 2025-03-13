const form = document.querySelector("form");
const todoInput = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");

let todos = [];

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText.length === 0) {
        alert("Please enter a task.");
        return;
    }
    
    if (todoText.length > 50) {
        alert("Task cannot exceed 50 characters.");
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    renderTodo();
}

function deleteTodo(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");
    if (confirmDelete) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodo();
    }
}

function toggleCompleted(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            todo.completed = !todo.completed;
        }
        return todo;
    });
    renderTodo();
}

function renderTodo() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoItem = document.createElement("li");
        const todoText = document.createElement("span");
        const deleteButton = document.createElement("button");
        const checkButton = document.createElement("button");
        
        todoText.textContent = todo.text;
        deleteButton.textContent = "Delete";
        checkButton.textContent = todo.completed ? "✔" : "☐";

        checkButton.style.backgroundColor = "green";
        checkButton.style.color = "white";
        checkButton.style.border = "none";
        checkButton.style.padding = "5px";
        checkButton.style.marginRight = "10px";
        checkButton.style.cursor = "pointer";
        
        if (todo.completed) {
            todoText.style.textDecoration = "line-through";
        } else {
            todoText.style.textDecoration = "none";
        }
        
        checkButton.addEventListener("click", (event) => {
            event.stopPropagation();
            toggleCompleted(todo.id);
        });
        
        deleteButton.addEventListener("click", (event) => {
            event.stopPropagation();
            deleteTodo(todo.id);
        });

        todoItem.appendChild(checkButton);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);
        todoList.appendChild(todoItem);
    });
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    addTodo();
});

renderTodo();