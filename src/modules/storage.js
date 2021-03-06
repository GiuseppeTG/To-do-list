export default class Store {
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
    let newArr = [];
    tasks.forEach((task) => {
      if (task.completed === taskToDelete) {
        newArr = tasks.filter((task) => task.completed === false);
      }
    });
    newArr.forEach((element, index) => { element.index = index; });
    localStorage.setItem('tasks', JSON.stringify(newArr));
  }
}