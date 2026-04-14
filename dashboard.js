function login() {
  console.log("login clicked"); // DEBUG

  const user = document.getElementById("user").value;
  const pass = document.getElementById("pass").value;

  if (user === "admin" && pass === "1234") {

    document.getElementById("loginCard").style.display = "none";
    document.getElementById("dashboardPanel").style.display = "block";

    loadDashboard();

  } else {
    alert("Wrong username or password");
  }
}

function loadDashboard() {
  loadChart();
  loadFeedback();
}

function loadChart() {
  let results = JSON.parse(localStorage.getItem("results")) || [];

  let counts = { CS:0, BIO:0, ART:0, BUS:0 };

  results.forEach(r => {
    if (counts[r] !== undefined) {
      counts[r]++;
    }
  });

  new Chart(document.getElementById("chart"), {
    type: "bar",
    data: {
      labels: ["CS", "BIO", "ART", "BUS"],
      datasets: [{
        label: "Quiz Results",
        data: [counts.CS, counts.BIO, counts.ART, counts.BUS]
      }]
    }
  });
}

function loadFeedback() {
  let feedback = JSON.parse(localStorage.getItem("feedback")) || [];

  const box = document.getElementById("feedbackBox");

  if (!box) return;

  if (feedback.length === 0) {
    box.innerHTML = "<p>No feedback yet</p>";
    return;
  }

  feedback.forEach(f => {
    const p = document.createElement("p");
    p.textContent = "• " + f;
    box.appendChild(p);
  });
}
