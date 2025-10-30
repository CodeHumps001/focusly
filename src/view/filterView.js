class FilterView {
  searchInput = document.getElementById("search");

  getFilterDisplay(handler) {
    this.searchInput.addEventListener("input", () => {
      handler();
    });
  }
}

export default new FilterView();
