import Chart from "chart.js/auto";

class WeeklyChartView {
  chart;

  render({ labels, data }) {
    const ctx = document.getElementById("weeklyChart");

    if (this.chart) this.chart.destroy(); // prevent duplicates

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Completed Tasks",
            data,
            tension: 0.4,
          },
        ],
      },
    });
  }
}

export default new WeeklyChartView();
