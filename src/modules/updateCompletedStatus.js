const updateCompletedStatus = (tasks, checkboxIndex) => {
  if (tasks[checkboxIndex].index === checkboxIndex) {
    tasks[checkboxIndex].completed = !tasks[checkboxIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
};

export default updateCompletedStatus;