class OverviewUpdate {
  _allTaskValue = document.querySelector(".a-v");
  _pendingValue = document.querySelector(".p-v");
  _completeValue = document.querySelector(".c-v");
  _overdueValue = document.querySelector(".o-v");

  getOverviewValues(state) {
    const allTasks = state.tasks.length;
    const pending = state.tasks.filter(
      (task) => task.status === "pending"
    ).length;
    const complete = state.tasks.filter(
      (task) => task.status === "complete"
    ).length;

    const overdue = state.tasks.filter((t) => {
      return t.status === "pending" && new Date(t.deadline) < new Date();
    }).length;

    this._update(allTasks, pending, complete, overdue);
  }

  _update(all, pending, complete, overdue) {
    this._allTaskValue.textContent = all;
    this._pendingValue.textContent = pending;
    this._completeValue.textContent = complete;
    this._overdueValue.textContent = overdue;
  }
}

export default new OverviewUpdate();
