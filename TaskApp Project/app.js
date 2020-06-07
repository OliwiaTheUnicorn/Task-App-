// Define UI vars
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();
 
//Load all even listeners
function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    // clear all task event
    clearBtn.addEventListener('click', clearTasks);
    // filter tasks event
    filter.addEventListener('keyup', filterTasks);
}

// get tasks from Local Storage
function getTasks() {
    let tasks;
        if(localStorage.getItem('tasks') === null){
            task = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

    tasks.forEach(function(task){
        //create li element 
        const li = document.createElement('li');
        //add class to li 
        li.className = 'collection-item'; //in materialize collection-item is a class
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        // create new link element
        const link = document.createElement('a');
        //add class to link
        link.className = 'delete-item secondary-content';
        // add icon into inner html
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //append li to ul
        taskList.appendChild(li);
    });
}

function addTask(e){
 
    if(taskInput.value === '') {
        alert('In order to add a task, you must type something in');
        }
    else {
    //create li element 
    const li = document.createElement('li');

    //add class to li 
    li.className = 'collection-item'; //in materialize collection-item is a class

    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

    // create new link element
    const link = document.createElement('a');

    //add class to link
    link.className = 'delete-item secondary-content';

    // add icon into inner html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    // store in LS
    storeTaskInLocalStorage(taskInput.value);
    
    //clear input
    taskInput.value = '';

    //prevent form submit
     e.preventDefault();
    }
}

// Store Task

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        task = [];
        //if local storage is empty, then set tasks to first index of empty array
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        // because local storage stores only strings, so we need to parse it
    }
    tasks.push(task);
    //adding to array set in let tasks;
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove Task function 

function removeTask(e) {
    // we want to target delete item, not whole li, also we want i tag, not a tag.
    // check if parentElement contains a specific class
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm('Are you sure you want to delete this task?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
}

// clear all task function

function clearTasks() {
    if(confirm('Are you sure you want to delete all tasks?'))
    while(taskList.firstChild) { //while there is still something in the list, because it has a child
        taskList.removeChild(taskList.firstChild);
        //using removeChild is more effective than setting innerHTML of taskList to empty
        // https://jsperf.com/innerhtml-vs-removechild 
    }
}

// Filter tasks function

function filterTasks(e) {

    const text = e.target.value.toLowerCase(); 
    //gives value of what's typed in, then changes it in, then to lower case
    document.querySelectorAll('.collection-item').forEach(
        //querySelector returns a NodeList, so you can use forEach onto it
        function(task){
            //task is iterator
            const item= task.firstChild.textContent;
            //set it item content of text that was typed in
            if(item.toLowerCase().indexOf(text) != -1){
            //compare item and text, if there is no match , then it's == -1
            // so if there is a match, it displays as block
                task.style.display = 'block';
            }
            //if it's empty, it displays as none to hide no matches
            else{
                task.style.display = 'none';
            }
        });
     //querySelector returns a Node List, getelementby classes returns html collection, which would require convering into array, to use foreach

}
