import typography from "assets/theme/base/typography";
function options() {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: "#c1c4ce5c",
        },
        ticks: {
          display: true,
          padding: 10,
          color: "#b2b9bf",
          font: {
            size: 11,
            family: typography.fontFamily,
            style: "normal",
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "#c1c4ce5c",
        },
        ticks: {
          display: true,
          color: "#b2b9bf",
          padding: 20,
          font: {
            size: 11,
            family: typography.fontFamily,
            style: "normal",
            lineHeight: 2,
          },
        },
      },
    },
  };
}

export default options;
