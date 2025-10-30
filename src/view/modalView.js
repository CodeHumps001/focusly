class ModalView {
  _form = document.querySelector(".form");
  taskName = document.getElementById("task-name");
  description = document.getElementById("description");
  deadline = document.getElementById("deadline");
  taskCategory = document.getElementById("category");
  breakTime = document.getElementById("break");
  formContainer = document.querySelector(".overlay");

  //read data from form after submit
  getInputData() {
    return {
      name: this.taskName.value,
      description: this.description.value,
      deadline: this.deadline.value,
      category: this.taskCategory.value,
      break: this.breakTime.value,
    };
  }

  _clear() {
    this.taskName.value =
      this.description.value =
      this.deadline.value =
      this.taskCategory.value =
      this.breakTime.value =
        "";
  }

  //add handler to form on submit
  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.formContainer.classList.remove("active-overlay");
      handler();
      this._clear();
    });
  }
}

export default new ModalView();
