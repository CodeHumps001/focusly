import Chart from "chart.js/auto";

class CategoryChartBreakdown {
  constructor() {
    this.categoryChartEl = document.getElementById("category-chart");
    this.categoryChart = null;
  }

  renderCategoryChart(counts) {
    const categories = Object.keys(counts);
    const values = Object.values(counts);

    if (this.categoryChart) this.categoryChart.destroy();

    this.categoryChart = new Chart(this.categoryChartEl, {
      type: "doughnut",
      data: {
        labels: categories.map((c) => c[0].toUpperCase() + c.slice(1)),
        datasets: [
          {
            data: values,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });
  }
}

export default new CategoryChartBreakdown();
