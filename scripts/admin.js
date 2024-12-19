const buttons = document.querySelectorAll("#admin-options li");
const contentContainer = document.getElementById("admin-container");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.getAttribute("data-view");
    fetch(`
        ../admin-views/${view}.html`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`failed to load ${view}`);
        }
        return response.text();
      })
      .then((html) => {
        contentContainer.innerHTML = html;
        if (view === "analytics") {
          createChart();
        }
      })
      .catch((error) => {
        console.log("Error", error);
      });
  });
});

function createChart() {
  const sc = document.getElementById("sales-chart").getContext("2d");
  const chart = new Chart(sc, {
    type: "bar",
    data: {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Sales",
          data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 55, 60, 65],
          backgroundColor: [
            "rgba(75, 201, 201, 0.92)",
            "rgba(199, 201, 75, 0.92)",
            "rgba(201, 75, 75, 0.92)",
            "rgba(132, 15, 143, 0.92)",
            "rgba(223, 49, 214, 0.92)",
            "rgba(19, 180, 41, 0.92)",
            "rgba(0, 77, 165, 0.92)",
          ],
          borderColor: "rgba(188, 75, 192, 0.56)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
