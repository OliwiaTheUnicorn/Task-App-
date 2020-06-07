const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();
 
function loadEventListeners() {
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', removeTask);
    clearBtn.addEventListener('click', clearTasks);
    filter.addEventListener('keyup', filterTasks);
}

function addTask(e){
    if(taskInput.value === '') {
        alert('In order to add a task, you must type something in');
        }
    else {
    const li = document.createElement('li');
    li.className = 'collection-item'; 
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    taskInput.value = '';
     e.preventDefault();
    }
}

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTasks() {
    if(confirm('Are you sure you want to delete all tasks?'))
    while(taskList.firstChild) { 
        taskList.removeChild(taskList.firstChild);
    }
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase(); 
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item= task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1){
                task.style.display = 'block';
            }
            else{
                task.style.display = 'none';
            }
        });
}
