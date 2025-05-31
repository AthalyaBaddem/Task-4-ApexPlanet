const todoForm = document.getElementById('todoForm');
const newTodoInput = document.getElementById('newTodo');
const todoList = document.getElementById('todoList');

// Retrieve to-dos from LocalStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render existing to-dos on page load
window.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});

todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = newTodoInput.value.trim();
  if (taskText === '') return;

  const newTodo = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  todos.push(newTodo);
  saveTodos();
  renderTodos();
  newTodoInput.value = '';
});

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = '';
  if (todos.length === 0) {
    todoList.innerHTML = '<li>No tasks yet! Add Your Task!</li>';
    return;
  }

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    if (todo.completed) li.classList.add('completed');

    // Checkbox for completing
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(todo.id));

    // Task text
    const span = document.createElement('span');
    span.textContent = todo.text;
    span.classList.add('task-text');

    // Action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('todo-actions');

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '✔';
    completeBtn.classList.add('complete-btn');
    completeBtn.title = 'Toggle Complete';
    completeBtn.addEventListener('click', () => toggleComplete(todo.id));

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '✖';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.title = 'Delete Task';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    actionsDiv.appendChild(completeBtn);
    actionsDiv.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actionsDiv);

    todoList.appendChild(li);
  });
}

function toggleComplete(id) {
  todos = todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}
