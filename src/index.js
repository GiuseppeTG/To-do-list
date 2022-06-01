import './style.css';

const tasks = [
  {
    description: 'item1 dynamic',
    completed: false,
    index: 0,
  },
  {
    description: 'item2 dynamic',
    completed: false,
    index: 1,
  },
  {
    description: 'item3 dynamic',
    completed: false,
    index: 2,
  },
];

const toDoList = (tasks) => {
  for (let i = 0; i < tasks.length; i += 1) {
    const list = document.querySelector('.list');

    const item = document.createElement('li');
    item.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const taskText = document.createElement('p');
    taskText.classList.add('task-text');
    taskText.textContent = tasks[i].description;

    const itemAction = document.createElement('i');
    itemAction.classList.add('fa-solid', 'fa-ellipsis-vertical', 'item-action');

    list.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(taskText);
    item.appendChild(itemAction);
  }
};

toDoList(tasks);
