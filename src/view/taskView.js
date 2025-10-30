class TaskView {
  parentEL = document.querySelector(".card-container");
  taskCard = document.querySelector(".task-card");

  // constructor() {
  //   this.markTaskAsCompleted();
  // }

  //method to render task Ui
  render(tasks) {
    const markup = this._generateMarkup(tasks);

    this.parentEL.innerHTML = "";
    this.parentEL.insertAdjacentHTML("beforeend", markup);
    // this.markTaskAsCompleted(tasks);
  }

  getDeadlineDate(deadlineDate) {
    const today = new Date();
    const deadline = new Date(deadlineDate);

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const diffTime = deadline - today;
    const diffDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDay > 0) {
      return `${diffDay} day(s) left`;
    }
    if (diffDay === 0) {
      return `Due Today`;
    }

    return `Overdue by ${Math.abs(diffDay)} day(s)`;
  }

  markTaskAsCompleted(handler) {
    this.parentEL.addEventListener("click", (e) => {
      handler(e);
    });
  }

  deleteTask(handler) {
    this.parentEL.addEventListener("click", (e) => {
      handler(e);
    });
  }

  //method to generate markup for task card
  _generateMarkup(tasks) {
    return tasks
      .map((task) => {
        return `
         <div class="task-card ${task.status === "completed" ? "done" : ""}">
                  <span class="id">1</span>
                  <h1>${task.name}</h1>
                  <p>
                    ${task.description}
                  </p>
                  <div class="cat-time">
                    <span class="category category-${task.category}"
                      >${task.category}</span
                    >
                    <p class="duration">${this.getDeadlineDate(
                      task.deadline
                    )}</p>
                  </div>
                  <div class="crud">
                    <button class="complete" data-complete="${task.id}">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="crud-btn"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                        />
                      </svg>
                    </button>
                    <button class="delete" data-delete="${task.id}">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="crud-btn"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                    
                  </div>
                </div>
    `;
      })
      .join("");
  }
}

export default new TaskView();
