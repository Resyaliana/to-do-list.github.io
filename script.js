const inputUser = document.getElementById("input-user");
const inputDate = document.getElementById("input-date");
const todoForm = document.getElementById("todo-form");
const listGroup = document.getElementById("list-group");

let todos = [];

function renderTodo(todo, index) {
    const todoItem = `
    <li class="list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'completed' : ''}">
        <div>
            <span>${todo.text}</span>
            <span class="badge bg-secondary ms-2">${todo.date}</span>
        </div>
        <div>
            <button class="btn btn-primary btn-sm mx-1 edit-btn" data-index="${index}"><i class="bi bi-pencil"></i></button>
            <button class="btn btn-danger btn-sm delete-btn" data-index="${index}"><i class="bi bi-trash"></i></button>
            <button class="btn btn-success btn-sm complete-btn" data-index="${index}"><i class="bi bi-check"></i></button>
        </div>
    </li>`;
    listGroup.insertAdjacentHTML("beforeend", todoItem);
}

function addTodo(event) {
    event.preventDefault();
    const todoText = inputUser.value.trim();
    const todoDate = inputDate.value;
    if (todoText !== "") {
        todos.push({ text: todoText, completed: false, date: todoDate });
        renderTodo({ text: todoText, date: todoDate }, todos.length - 1);
        inputUser.value = "";
        inputDate.value = "";
        inputUser.focus();
    }
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function editTodo(index) {
    const todoItem = listGroup.querySelector(`[data-index="${index}"]`).closest(".list-group-item");
    const todoTextElement = todoItem.querySelector("span");
    const todoText = todoTextElement.textContent;
    const updatedTodoText = prompt("Edit task:", todoText);
    if (updatedTodoText !== null && updatedTodoText.trim() !== "") {
        todos[index].text = updatedTodoText;
        todoTextElement.textContent = updatedTodoText;
    }
}

function completeTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos();
}

function renderTodos() {
    listGroup.innerHTML = "";
    todos.forEach((todo, index) => {
        renderTodo(todo, index);
    });
}

todoForm.addEventListener("submit", addTodo);
listGroup.addEventListener("click", function (event) {
    const targetElement = event.target;
    if (targetElement.classList.contains("delete-btn")) {
        const index = targetElement.dataset.index;
        deleteTodo(index);
    } else if (targetElement.classList.contains("edit-btn")) {
        const index = targetElement.dataset.index;
        editTodo(index);
    } else if (targetElement.classList.contains("complete-btn")) {
        const index = targetElement.dataset.index;
        completeTodo(index);
    }
});
