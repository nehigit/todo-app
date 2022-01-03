// Selectors
const todoButton = document.querySelector('.todo-button');
const todoInput = document.querySelector('.todo-input');
const todoList = document.querySelector('.todo-list');
const todoSelect = document.querySelector('.todo-select');

// Functions
const addTodo = e =>
{
    e.preventDefault();

    if(todoInput.value == '') return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    
    // Add todo to local storage
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('btn-complete');
    todoDiv.appendChild(completedButton);
    
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('btn-trash');
    todoDiv.appendChild(trashButton);
    
    // todoList.appendChild(todoDiv);
    todoList.insertBefore(todoDiv, todoList.firstElementChild);
    
    todoInput.value = '';

    // Stop filtering todos
    todoSelect.value = 'all';
    filterTodo();
}

const deleteCheck = e =>
{
    const todo = e.target.parentElement;

    // Delete .todo
    if(e.target.classList[0] === 'btn-trash')
    {
        todo.classList.add('fade-out');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', () => todo.remove());
    }
    
    // Checkmark .todo
    if(e.target.classList[0] === 'btn-complete')
    {
        todo.classList.toggle('todo-completed');
        todo.childNodes[0].classList.toggle('item-completed');
        todo.addEventListener('transitionend', () => filterTodo());
    }
}

const filterTodo = () =>
{
    const todos = todoList.childNodes;

    todos.forEach(todo =>
    {
        switch(todoSelect.value)
        {
            case 'all':
                todo.style.display = 'flex';
            break;
            case 'completed':
                if(todo.classList.contains('todo-completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
            break;
            case 'uncompleted':
                if(!todo.classList.contains('todo-completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none';
            break;
        }
    })
}

// Local Storage functions
const checkIfStored = () =>
{
    // Check if any todos are already being stored
    if(localStorage.getItem('todos') === null)
        // If not, create a new array
        return [];
    else
        // If there are, get that array from local storage
        return JSON.parse(localStorage.getItem('todos'));
}

////////////////////////////
let todos = checkIfStored();
////////////////////////////

const saveLocalTodos = todo =>
{
    // Push a new todo
    todos.push(todo);
    // Set it back into the local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos = () =>
{
    todos.forEach(todo =>
    {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const newTodo = document.createElement('li');
        // Take the innerText from local storage
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('btn-complete');
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('btn-trash');
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    })
}

const removeLocalTodos = todo =>
{
    // Get index of todo innerText and remove it from array
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    //

    // Push that array back to local storage. (Refresh local storage I guess?)
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoSelect.addEventListener('change', filterTodo);