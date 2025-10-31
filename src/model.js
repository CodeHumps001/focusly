export let state = {
  tasks: [],
};

export const user = {
  name: "",
  joinedDate: "",
};

export function initUser() {
  const savedUser = localStorage.getItem("focuslyUser");

  if (savedUser) {
    Object.assign(user, JSON.parse(savedUser));
  } else {
    const name = prompt("Welcome! What's your name?")?.trim() || "User";
    const joinedDate = new Date().toISOString();

    user.name = name;
    user.joinedDate = joinedDate;

    localStorage.setItem("focuslyUser", JSON.stringify(user));
  }
}
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

export function getCategoryBreakdown(tasks) {
  const categories = ["personal", "studies", "project", "collaboration"];

  const counts = {
    personal: 0,
    studies: 0,
    project: 0,
    collaboration: 0,
  };

  tasks.forEach((task) => {
    if (categories.includes(task.category)) {
      counts[task.category]++;
    }
  });

  return counts;
}

export function getCompletionRate(tasks) {
  if (!tasks.length) return 0;

  const completedCount = tasks.filter((t) => t.status === "completed").length;
  const completionRate = (completedCount / tasks.length) * 100;

  return Math.round(completionRate); // Example: 67%
}

export function getHistoryTimeline(tasks) {
  const history = {};

  tasks
    .filter((t) => t.status === "completed" && t.completionDate)
    .forEach((task) => {
      const dateObj = new Date(task.completionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dateHeader =
        dateObj.toDateString() === today.toDateString()
          ? "Today"
          : dateObj.toLocaleDateString([], {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric",
            });

      if (!history[dateHeader]) history[dateHeader] = [];
      history[dateHeader].push(task);
    });

  return history;
}
