// Defining UI vars
const form=document.querySelector('#task-form');
const taskList= document.querySelector('.collection');
const clearBtn=document.querySelector('.clear-tasks');
const filter=document.querySelector('#filter');
const taskInput=document.querySelector('#task');

//loading all event listeners
loadEventListners();

//function loadEventListner
function loadEventListners(){

    //DOM load event
    document.addEventListener('DOMContentLoaded',getTasks);

    //add task event
    form.addEventListener('submit', addTask);

    //Remove task lists
    taskList.addEventListener('click',removeTask);

    //clear all the tasks
    clearBtn.addEventListener('click',clearTasks);

    //filtering the tasks
    filter.addEventListener('keyup',filterTasks);
    
}

//Get tasks from local storage(if any) to load in the page
function getTasks(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task) {
        //create a li element
        const li = document.createElement('li');

        //adding a class to li
        li.className = 'collection-item';

        //creating text node and appending it to li
        li.appendChild(document.createTextNode(task));

        //create a link element
        const link=document.createElement('a');

        //add class to a
        link.className = 'delete-item secondary-content';

        //add icon html
        link.innerHTML ='<i class = "fa fa-remove"></i>'

        //append the link to li
        li.appendChild(link);

        //append the li to ul
            //task list is the const for ul(collections)
        taskList.appendChild(li);
    });
}

function addTask(e){
    if(taskInput.value === ''){
        alert('please add some tasks'); 
    }

    //create a li element
const li = document.createElement('li');

//adding a class to li
li.className = 'collection-item';

//creating text node and appending it to li
li.appendChild(document.createTextNode(taskInput.value));

//create a link element
const link=document.createElement('a');

//add class to a
link.className = 'delete-item secondary-content';

//add icon html
link.innerHTML ='<i class = "fa fa-remove"></i>'

//append the link to li
li.appendChild(link);

//append the li to ul
    //task list is the const for ul(collections)
taskList.appendChild(li);

//storea in local storage
storeTaskInLocalStorage(taskInput.value); 

//clearInput
taskInput.value='';


    e.preventDefault();
}

//store task 
function storeTaskInLocalStorage(task) {
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}



//removing the task
//since i am clicking on the whole tasks part which i dont want i am going to target only the anchor link , thats why the if part checkng the target for the parent of the icon X

function removeTask(e) {
    if(e.target.parentElement.classList.contains('delete-item')){
        //console.log('dorikindi');
        if(confirm('Are you sure bout it?'))
        {
            e.target.parentElement.parentElement.remove();

            //Removing from local storage too
            removeFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Removing from local storage
function removeFromLocalStorage(taskItem){
    //console.log(taskItem);
    //localStorage.removeItem(taskItem);
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    //loop throught the local storage array and delete the item if found
    tasks.forEach(function(task , index) {
        if(taskItem.textContent === task) { 
            tasks.splice(index , 1)
        }
    });

    //set the local storage again
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

//clear all the tasks
function clearTasks(e) {
    //first way is this
    //taskList.innerHTML = '';
    //the other faster way is
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear tasks from local storage
    clearTasksFromLocalStorage();
}

//clearing everything from local storage
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

//filtering the tasks
 function filterTasks(e){
    const text = e.target.value.toLowerCase(); //value that we type in filter

    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item= task.firstChild.textContent; //value that are in the list
        if(item.toLowerCase().indexOf(text) != -1 ){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
 }