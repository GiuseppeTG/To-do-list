export default class UI {
  static getToDoList = (task) => {
    const list = document.querySelector('.list');

    const item = document.createElement('li');
    item.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.dataset.index = task.index;
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const taskText = document.createElement('p');
    taskText.dataset.index = task.index;
    taskText.classList.add('task-text');
    taskText.textContent = task.description;

    if (task.completed === true) {
      taskText.style.textDecoration = 'line-through';
      checkbox.checked = true;
    }

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