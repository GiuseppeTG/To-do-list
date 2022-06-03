import { indexOf, set } from 'lodash';
import './style.css';

//-----Task obj-----//

class Task {
  constructor(description, completed, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }
}

//-----Storage-----//

class Store {
  static getTasks = () => {
    let tasks = [];
    
    if (localStorage.getItem('tasks') === null) {
      return tasks;
    }

    tasks = JSON.parse(localStorage.getItem('tasks'));

    return tasks;

   
  }

  static addTask = (task) => {
    const tasks = Store.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static removeTasks = (taskToDelete) => {
    const tasks = Store.getTasks();
    console.log(tasks)
    // tasks.forEach((task, index) => {
    //   if (task.completed === taskToDelete) {
    //     tasks.splice(index, 1);
    //   }
    // });
    for(let i = 0; i < tasks.length; i += 1) {
      if (tasks[i].completed === taskToDelete){
        console.log(tasks[i].completed)
        console.log(taskToDelete)
        tasks.splice(i, 1)
      }
      tasks[i].index = i;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

//-----UI-----//

class UI {
  
  static getToDoList = (task) => {
      const list = document.querySelector('.list');
  
      const item = document.createElement('li');
      item.classList.add('item');
  
      const checkbox = document.createElement('input');
      checkbox.dataset.index = task.index;
      checkbox.type = 'checkbox';
      checkbox.classList.add('checkbox');
  
      const taskText = document.createElement('p');
      taskText.classList.add('task-text');
      taskText.textContent = task.description;
  
      const itemDots = document.createElement('i');
      itemDots.classList.add('fa-solid', 'fa-ellipsis-vertical', 'item-dots');
      
      const itemTrash = document.createElement('i');
      itemTrash.classList.add('fa-solid', 'fa-trash', 'disabled', 'item-trash', 'disabled');

      list.appendChild(item);
      item.appendChild(checkbox);
      item.appendChild(taskText);
      item.appendChild(itemDots);
      item.appendChild(itemTrash);
  }

  static displayTasks = (task) => this.getToDoList(task);

}

//-----Form Functions-----//

//add new task

document.querySelector('.task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.querySelector('#add-input').value;
  const task = new Task (description, false, Store.getTasks().length);
  console.log(task);
  Store.addTask(task);
  UI.displayTasks(task);
  document.querySelector('.add-input').value = null;
})

// reset all tasks

document.querySelector('.reset-button').addEventListener('click', (e) => {
  const tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const allItems = document.querySelectorAll('.item');
  allItems.forEach(item => {
    item.remove()
  })
  document.querySelector('.add-input').value = null;
})

//mark as done

document.querySelector('.list').addEventListener('change', (e) => {
 
  if (e.target.type === 'checkbox') {
    const tasks = Store.getTasks();
    e.target.nextElementSibling.classList.toggle('done');
    e.target.parentElement.classList.toggle('item-checked');
    e.target.nextElementSibling.nextElementSibling.classList.toggle('disabled');
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle('disabled');
    const checkboxIndex = e.target.dataset.index;
    console.log(checkboxIndex);

    if (tasks[checkboxIndex].index === Number(checkboxIndex)) {      
      tasks[checkboxIndex].completed = !tasks[checkboxIndex].completed
      localStorage.setItem('tasks', JSON.stringify(tasks));     
    }   
  }    
})

//--DELETE SINGLE TASK--//

document.querySelector('.list').addEventListener('click', (e) => {
  
  if (e.target.classList.contains('item-trash')) {
    const tasks = Store.getTasks();
    const itemTrash = e.target;
    const checkboxIndex = itemTrash.parentElement.firstChild.dataset.index;
    itemTrash.parentElement.remove();

    tasks[checkboxIndex].completed = true;
    let taskToDelete = tasks[checkboxIndex].completed;
    console.log(taskToDelete);
    Store.removeTasks(taskToDelete);

  }
})

//remove all done from UI

document.querySelector('.clear-button').addEventListener('click', () => {
  const tasks = Store.getTasks();
  const doneTasks = Array.from(document.querySelectorAll('.done'));
  doneTasks.forEach(doneTask => doneTask.parentElement.remove());
  let uncompletedTasks = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed === false) {
      uncompletedTasks.push(tasks[i]);
    }
  }

  console.log(uncompletedTasks)
  for (let i = 0; i < uncompletedTasks.length; i += 1) {
    uncompletedTasks[i].index = i;
  }
  localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
})

//-----INIT-----//

const init = () => {
  Store.getTasks().forEach((task) => UI.getToDoList(task));
};

init();




//edit 

// document.querySelector('.list').addEventListener('click', (e) => {
 
//   if (e.target.classList.contains('item-dots')) {

//    const itemDots = e.target; 
//    const text = itemDots.previousElementSibling; 
//    const editInput = document.createElement('input');
//    editInput.type = 'text';
//    editInput.classList.add('edit-input');
//    editInput.value = text.textContent;
//    text.parentElement.replaceChild(editInput, text);
//   }
// })
