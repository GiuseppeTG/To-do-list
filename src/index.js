import './style.css';
import updateCompletedStatus from './modules/updateCompletedStatus.js';
import Task from './modules/task.js';
import Store from './modules/storage.js';
import UI from './modules/ui.js';

// -----INIT-----//

const init = () => {
  Store.getTasks().forEach((task) => UI.getToDoList(task));
};

init();

// ----------Form Functions----------//

// -----ADD NEW TASK-----//

document.querySelector('.task-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const description = document.querySelector('#add-input').value;
  const task = new Task(description, false, Store.getTasks().length);
  Store.addTask(task);
  UI.displayTasks(task);
  document.querySelector('.add-input').value = null;
});

// -----RESET ALL TASKS-----//

document.querySelector('.reset-button').addEventListener('click', () => {
  const tasks = [];
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const allItems = document.querySelectorAll('.item');
  allItems.forEach((item) => {
    item.remove();
  });
  document.querySelector('.add-input').value = null;
});

// -----MARK AS DONE-----//

document.querySelector('.list').addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const tasks = Store.getTasks();
    e.target.nextElementSibling.classList.toggle('done');
    e.target.parentElement.classList.toggle('item-checked');
    e.target.nextElementSibling.nextElementSibling.classList.toggle('disabled');
    e.target.nextElementSibling.nextElementSibling.nextElementSibling.classList.toggle('disabled');
    const checkboxIndex = e.target.dataset.index;
    updateCompletedStatus(tasks, checkboxIndex);
  }
});

// --DELETE SINGLE TASK--//

document.querySelector('.list').addEventListener('click', (e) => {
  if (e.target.classList.contains('item-trash')) {
    const tasks = Store.getTasks();
    const itemTrash = e.target;
    const checkboxIndex = Number(itemTrash.parentElement.firstChild.dataset.index);
    itemTrash.parentElement.remove();

    const taskToDelete = tasks[checkboxIndex].completed;
    Store.removeTasks(taskToDelete);
    window.location.reload();
  }
});

// -----REMOVE ALL DONE FROM THE UI-----//

document.querySelector('.clear-button').addEventListener('click', () => {
  const tasks = Store.getTasks();
  const doneTasks = Array.from(document.querySelectorAll('.done'));
  doneTasks.forEach((doneTask) => doneTask.parentElement.remove());
  const uncompletedTasks = [];
  for (let i = 0; i < tasks.length; i += 1) {
    if (tasks[i].completed === false) {
      uncompletedTasks.push(tasks[i]);
    }
  }

  for (let i = 0; i < uncompletedTasks.length; i += 1) {
    uncompletedTasks[i].index = i;
  }
  localStorage.setItem('tasks', JSON.stringify(uncompletedTasks));
  window.location.reload();
});

// -----EDIT-----//

document.querySelector('.list').addEventListener('click', (e) => {
  const tasks = Store.getTasks();

  if (e.target.classList.contains('task-text')) {
    const text = e.target;
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('edit-input');
    editInput.value = text.textContent;
    text.parentElement.classList.add('editing');
    text.parentElement.replaceChild(editInput, text);

    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        editInput.parentElement.classList.remove('editing');
        tasks[e.target.previousSibling.dataset.index].description = editInput.value;
        text.textContent = editInput.value;
        editInput.parentElement.replaceChild(text, editInput);
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }
    });
  }
});
