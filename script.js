let tasks = [];


const taskInput = document.getElementById('taskInput'); 
const taskList = document.getElementById('taskList');

// document.getElementById ('addTaskBtn').onclick=addTask


function addTask(){

    if(!taskInput.value.trim()){
        return alert('Task cannot be empty!!')
    }

    tasks.push({title: taskInput.value.trim(), completed: false})
    taskInput.value ='';  
    console.log('New Task Added: ', tasks)
     
}

// Load tasks when page loads
document.addEventListener('DOMContentLoaded', renderTasks);

function addTask() {
    if (!taskInput.value.trim()) {
        return alert('Task cannot be empty!!');
    }

    tasks.push({
        id: Date.now(),
        title: taskInput.value.trim(), 
        completed: false
    });
    
    taskInput.value = '';
    saveTasks();
    renderTasks();
}
function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
        taskList.innerHTML = '';
        return;
    }
    
    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <span class="task-text">${task.title}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(${task.id})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => 
        task.id === id ? {...task, completed: !task.completed} : task
    );
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const task = tasks.find(task => task.id === id);
    const newTitle = prompt('Edit task:', task.title);
    
    if (newTitle && newTitle.trim()) {
        task.title = newTitle.trim();
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    if (confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}