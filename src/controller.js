import ToggleView from "./view/main.js";
import * as model from "./model.js";
import taskView from "./view/taskView.js";
import modalView from "./view/modalView.js";
import overviewUpdate from "./view/overviewUpdate.js";

const controlAddTask = function () {
  let addTask = modalView.getInputData();
  model.addTask(addTask);
  taskView.getDeadlineDate(model.state.tasks.deadline);
  taskView.render(model.state.tasks);
};

const controlMarkComplete = function (e) {
  const clicked = e.target.closest(".complete");

  if (!clicked) return;
  const id = +clicked.dataset.complete;
  const [currentTask] = model.state.tasks.filter((t) => t.id === id);
  currentTask.status = "completed";

  console.log(currentTask);

  taskView.render(model.state.tasks);
  model.saveTasks();
};

const controlDeleteTask = function (e) {
  const clicked = e.target.closest(".delete");
  if (!clicked) return;

  const id = +clicked.dataset.delete;

  // Create a new array that includes all tasks except the one with the matching ID.
  model.state.tasks = model.state.tasks.filter((t) => t.id !== id);

  taskView.render(model.state.tasks);
  model.saveTasks();
};

const init = function () {
  model.loadTask();
  taskView.render(model.state.tasks);
  modalView.addHandlerSubmit(controlAddTask);
  overviewUpdate.getOverviewValues(model.state);
  taskView.markTaskAsCompleted(controlMarkComplete);
  taskView.deleteTask(controlDeleteTask);
};

init();
