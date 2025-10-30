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
  overviewUpdate.getOverviewValues(model.state);

  console.log(model.state.tasks);
};

const init = function () {
  modalView.addHandlerSubmit(controlAddTask);
};

init();
