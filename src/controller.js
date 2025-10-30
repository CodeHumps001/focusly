import ToggleView from "./view/main.js";
import * as model from "./model.js";
import taskView from "./view/taskView.js";
import modalView from "./view/modalView.js";
import overviewUpdate from "./view/overviewUpdate.js";
import MotivationView from "./view/motivationVIew.js";
import FilterView from "./view/filterView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

//fetch for motivation

const fetchMotivation = async function () {
  try {
    const res = await fetch(
      `https://api.api-ninjas.com/v2/quotes?categories=success
`,
      {
        headers: {
          "X-Api-Key": "BrDbLX7gj+hWp/x7Tfbn8g==bABeEoY1Ad8v4Tah",
        },
      }
    );

    if (!res.status === 200)
      throw new Error(`Error fetching data , status:${res.status}`);
    const [data] = await res.json();
    MotivationView.getMotivationQuote(data);
  } catch (err) {
    MotivationView.displayError(err.message);
  }
};

const controlStatsWeekly = function () {
  const weeklyData = model.getWeeklyTaskData(model.state.tasks);
  return weeklyData;
};
const chartData = controlStatsWeekly();

// console.log(setInterval(() => fetchMotivation(), 6000));

const controlAddTask = function () {
  let addTask = modalView.getInputData();
  model.addTask(addTask);
  taskView.getDeadlineDate(model.state.tasks.deadline);
  taskView.render(model.state.tasks);
  overviewUpdate.getOverviewValues(model.state);
};

const controlMarkComplete = function (e) {
  const clicked = e.target.closest(".complete");

  if (!clicked) return;
  const id = +clicked.dataset.complete;
  const [currentTask] = model.state.tasks.filter((t) => t.id === id);
  currentTask.status = "completed";
  currentTask.completionDate = new Date().toISOString();
  console.log(model.state.tasks);

  overviewUpdate.getOverviewValues(model.state);

  const chartData = controlStatsWeekly();
  ToggleView.renderWeeklyChart(chartData);
  ToggleView.toggleNavigation(chartData);

  taskView.render(model.state.tasks);
  model.saveTasks();
  ToggleView.renderWeeklyChart(chartData);
};

const controlDeleteTask = function (e) {
  const clicked = e.target.closest(".delete");
  if (!clicked) return;

  const id = +clicked.dataset.delete;

  // Create a new array that includes all tasks except the one with the matching ID.
  model.state.tasks = model.state.tasks.filter((t) => t.id !== id);

  overviewUpdate.getOverviewValues(model.state);
  taskView.render(model.state.tasks);
  model.saveTasks();
};

const controlFilterDisplay = function () {
  const searchInput = document.getElementById("search");
  const filterText = searchInput.value.toLowerCase().trim();
  const filterTask = model.state.tasks.filter(
    (t) =>
      t.description.toLowerCase().includes(filterText) ||
      t.name.toLowerCase().includes(filterText) ||
      t.status.toLowerCase().includes(filterText)
  );

  taskView.render(filterTask);
};

const init = function () {
  model.loadTask();
  FilterView.getFilterDisplay(controlFilterDisplay);
  taskView.render(model.state.tasks);
  modalView.addHandlerSubmit(controlAddTask);
  taskView.markTaskAsCompleted(controlMarkComplete);
  taskView.deleteTask(controlDeleteTask);
  overviewUpdate.getOverviewValues(model.state);
  // fetchMotivation();
  model.getWeeklyTaskData(model.state.tasks);
  ToggleView.renderWeeklyChart(chartData);
  ToggleView.toggleNavigation(chartData);
};

init();
