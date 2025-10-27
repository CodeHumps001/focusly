class ToggleView {
  togleBox = document.querySelector(".toggle-box");
  tabsContainer = document.querySelector(".nav-tabs");
  tabSections = document.querySelectorAll(".tab-section");
  allTabs = document.querySelectorAll(".nav-tab");

  constructor() {
    this.changeModeView();
    this.toggleNavigation();
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

  toggleNavigation() {
    this.tabsContainer.addEventListener("click", (e) => {
      // Use .closest() to find the parent tab, regardless of where the click occurs inside it.
      const clicked = e.target.closest(".nav-tab");
      // Guard clause: if a click occurred outside of a .nav-tab, exit the function.
      if (!clicked) return;
      // Now, get the data attribute from the correct parent element.
      const tab = clicked.dataset.tab;

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
}

export default new ToggleView();
