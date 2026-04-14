const questions = [
  {
    q: "What do you enjoy most?",
    options: [
      { text: "Math / logic", type: "CS" },
      { text: "Biology / science", type: "BIO" },
      { text: "Art / design", type: "ART" },
      { text: "Leadership / business", type: "BUS" }
    ]
  },
  {
    q: "Pick a activity:",
    options: [
      { text: "Solving puzzles", type: "CS" },
      { text: "Lab experiments", type: "BIO" },
      { text: "Creating visuals", type: "ART" },
      { text: "Managing people", type: "BUS" }
    ]
  },
  {
    q: "Preferred subject?",
    options: [
      { text: "Math", type: "CS" },
      { text: "Biology", type: "BIO" },
      { text: "Art", type: "ART" },
      { text: "Economics", type: "BUS" }
    ]
  }
];

let index = 0;
let scores = { CS: 0, BIO: 0, ART: 0, BUS: 0 };

function render() {
  const q = questions[index];

  document.getElementById("question").innerText = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.innerText = opt.text;

    btn.onclick = () => {
      scores[opt.type]++;
      next();
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById("progress").innerText =
    `Question ${index + 1} / ${questions.length}`;
}

function next() {
  index++;

  if (index >= questions.length) {
    finish();
  } else {
    render();
  }
}

function finish() {
  let best = "CS";

  for (let key in scores) {
    if (scores[key] > scores[best]) {
      best = key;
    }
  }

  localStorage.setItem("result", best);
  window.location.href = "results.html";
}

render();
