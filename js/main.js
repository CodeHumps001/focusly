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

//working with link tabs
addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav-tab");
  const { tab } = e.target.dataset;
  if (!tab) return;
  tabSections.forEach((tab) => tab.classList.remove("active--tab-section"));
  //delete active class from al tabs
  allTabs.forEach((tab) => tab.classList.remove("active-tab"));

  this.document
    .querySelector(`.section-details-${tab}`)
    .classList.add("active--tab-section");
  //add active-tab clas to clicked tab
  clicked.classList.add("active-tab");
});

