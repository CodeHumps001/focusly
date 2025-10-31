class HistoryView {
  _parentEl = document.querySelector(".history-container");

  render(historyData) {
    this._parentEl.innerHTML = "";

    const markup = Object.keys(historyData)
      .map((date) => {
        const tasksMarkup = historyData[date]
          .map((task) => this._generateTaskMarkup(task))
          .join("");

        return `
          <section class="history-section">
            <h3 class="history-date">${date}</h3>
            <ul class="history-list">
              ${tasksMarkup}
            </ul>
          </section>
        `;
      })
      .join("");

    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  _generateTaskMarkup(task) {
    const time = new Date(task.completionDate).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `
      <li class="history-item">
        <span class="history-title">${task.name}</span>
        <span class="history-category cat-${task.category.toLowerCase()}">${
      task.category
    }</span>
        <span class="history-time">${time}</span>
      </li>
    `;
  }
}

export default new HistoryView();
