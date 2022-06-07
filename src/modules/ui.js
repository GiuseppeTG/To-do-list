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

    const itemDots = document.createElement('i');
    itemDots.classList.add('fa-solid', 'fa-ellipsis-vertical', 'item-dots');

    const itemTrash = document.createElement('i');
    itemTrash.classList.add('fa-solid', 'fa-trash', 'disabled', 'item-trash', 'disabled');

    if (task.completed === true) {
      taskText.classList.add('done');
      item.classList.add('item-checked')
      checkbox.checked = true;
      itemDots.classList.add('disabled');
      itemTrash.classList.remove('disabled');
    }

    list.appendChild(item);
    item.appendChild(checkbox);
    item.appendChild(taskText);
    item.appendChild(itemDots);
    item.appendChild(itemTrash);
  }

  static deleteAll = () => {
   const tasks = [];
   localStorage.setItem('tasks', JSON.stringify(tasks));
   const allItems = document.querySelectorAll('.item');
   allItems.forEach(item => item.remove());
   document.querySelector('.add-input').value = null;
  }

  static updateCheckbox = () => {
  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((element, index) => element.dataset.index = index);
  }

  static displayTasks = (task) => this.getToDoList(task);
}