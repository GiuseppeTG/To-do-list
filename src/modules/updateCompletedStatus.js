const updateCompletedStatus = (array, id) => {
  if (array[id].index === Number(id)) {
    array[id].completed = !array[id].completed;
    localStorage.setItem('tasks', JSON.stringify(array));
  }
};

export default updateCompletedStatus;