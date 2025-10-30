export let state = {
  tasks: [],
};

//-- Add new Task --//
export const addTask = function (taskdata) {
  const newTask = {
    id: state.tasks.length + 1,
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

export function getWeeklyTaskData(tasks) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const weeklyCounts = Array(7).fill(0);

  const today = new Date();
  // Set to start of the day in UTC for consistent comparison.
  today.setUTCHours(0, 0, 0, 0);

  // Calculate the start of the current week (Sunday) in UTC.
  const currentWeek = new Date(today);
  currentWeek.setUTCDate(today.getUTCDate() - today.getUTCDay());

  tasks.forEach((task) => {
    if (task.status === "completed" && task.completionDate) {
      const taskDate = new Date(task.completionDate);

      // Check if task completionDate is this week by comparing milliseconds.
      if (taskDate.getTime() >= currentWeek.getTime()) {
        const dayIndex = taskDate.getUTCDay(); // Use getUTCDay for consistency
        weeklyCounts[dayIndex]++;
      }
    }
  });

  return { days, weeklyCounts };
}
