export let state = {
  tasks: [],
};

//-- Add new Task --//
export const addTask = function (taskdata) {
  const newTask = {
    id: state.tasks.length,
    name: taskdata.name,
    description: taskdata.description,
    deadline: taskdata.deadline,
    breakDuration: taskdata.break,
    createdAt: new Date().toISOString(),
    status: "pending",
    category: taskdata.category,
  };

  state.tasks.push(newTask);
  saveTasks();
  return newTask;
};

export const saveTasks = function () {
  localStorage.setItem("focuslyTasks", JSON.stringify(state.tasks));
};

export const loadTask = function () {
  const data = localStorage.getItem("focuslyTasks");
  if (!data) return;
  state.tasks = JSON.parse(data);
};
