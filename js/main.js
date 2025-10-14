const togleBox = document.querySelector(".toggle-box");
const tabsContainer = document.querySelector(".nav-tabs");
const tabSections = document.querySelectorAll(".tab-section");
const allTabs = document.querySelectorAll(".nav-tab");

//Working on toggle mode
togleBox.addEventListener("click", function (e) {
  const change = e.target.closest(".tog");
  change.classList.toggle("toggle");
  if (change.classList.contains("toggle")) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
  console.log();
});

tabsContainer.addEventListener("click", function (e) {
  // Use .closest() to find the parent tab, regardless of where the click occurs inside it.
  const clicked = e.target.closest(".nav-tab");
  // Guard clause: if a click occurred outside of a .nav-tab, exit the function.
  if (!clicked) return;
  // Now, get the data attribute from the correct parent element.
  const tab = clicked.dataset.tab;

  tabSections.forEach((tab) => tab.classList.remove("active--tab-section"));
  allTabs.forEach((tab) => tab.classList.remove("active-tab"));

  document
    .querySelector(`.section-details-${tab}`)
    .classList.add("active--tab-section");
  clicked.classList.add("active-tab");
});
