import Chart from "chart.js/auto";
class ToggleView {
  togleBox = document.querySelector(".toggle-box");
  tabsContainer = document.querySelector(".nav-tabs");
  tabSections = document.querySelectorAll(".tab-section");
  allTabs = document.querySelectorAll(".nav-tab");
  formContainer = document.querySelector(".overlay");
  ShowFormBtn = document.querySelector(".add");
  statsCanvas = document.getElementById("weekly-chart");

  constructor() {
    this.changeModeView();
    // this.toggleNavigation();
    this.hideFormContainer();
    this.toggleAddTaskForm();
  }

  changeModeView() {
    this.togleBox.addEventListener("click", (e) => {
      const change = e.target.closest(".tog");

      change.classList.toggle("toggle");
      if (change.classList.contains("toggle")) {
        document.body.classList.add("dark-mode");
      } else {
        document.body.classList.remove("dark-mode");
      }
    });
  }

  toggleNavigation(data) {
    this.tabsContainer.addEventListener("click", (e) => {
      // Use .closest() to find the parent tab, regardless of where the click occurs inside it.
      const clicked = e.target.closest(".nav-tab");
      // Guard clause: if a click occurred outside of a .nav-tab, exit the function.
      if (!clicked) return;
      // Now, get the data attribute from the correct parent element.
      const tab = clicked.dataset.tab;
      if (Number(tab) === 2) {
        this.renderWeeklyChart(data);
      }

      this.tabSections.forEach((tab) =>
        tab.classList.remove("active--tab-section")
      );
      this.allTabs.forEach((tab) => tab.classList.remove("active-tab"));

      document
        .querySelector(`.section-details-${tab}`)
        .classList.add("active--tab-section");
      clicked.classList.add("active-tab");
    });
  }
  hideFormContainer() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.formContainer.classList.remove("active-overlay");
        console.log(e.key);
      }
    });
  }
  toggleAddTaskForm() {
    this.ShowFormBtn.addEventListener("click", () => {
      this.formContainer.classList.toggle("active-overlay");
    });
  }

  renderWeeklyChart(data) {
    if (!this.statsCanvas) return;

    const ctx = this.statsCanvas.getContext("2d");

    console.log("Chart data:", data.weeklyCounts);

    // Prevent duplicate chart overlays
    if (this.weeklyChart) this.weeklyChart.destroy();

    this.weeklyChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.days,
        datasets: [
          {
            label: "Tasks Completed",
            data: data.weeklyCounts,
          },
        ],
      },
    });
    // Force the chart to update
    this.weeklyChart.update();
  }
}

export default new ToggleView();
