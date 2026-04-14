let questions = [
  {
    q: "What do you enjoy most?",
    options: [
      { text: "Solving math problems", type: "CS" },
      { text: "Studying living things", type: "BIO" },
      { text: "Drawing or designing", type: "ART" },
      { text: "Leading or organizing people", type: "BUS" }
    ]
  },
  {
    q: "What sounds most fun?",
    options: [
      { text: "Building apps or games", type: "CS" },
      { text: "Working in a lab", type: "BIO" },
      { text: "Creating art or videos", type: "ART" },
      { text: "Starting a business", type: "BUS" }
    ]
  },
  {
    q: "Pick a subject you prefer:",
    options: [
      { text: "Math", type: "CS" },
      { text: "Biology", type: "BIO" },
      { text: "Art", type: "ART" },
      { text: "Economics", type: "BUS" }
    ]
  },
  {
    q: "What would you rather do?",
    options: [
      { text: "Solve puzzles", type: "CS" },
      { text: "Study DNA and cells", type: "BIO" },
      { text: "Design visuals", type: "ART" },
      { text: "Manage projects", type: "BUS" }
    ]
  }
];

let index = 0;
let scores = { CS: 0, BIO: 0, ART: 0, BUS: 0 };

function showQuestion() {
  let q = questions[index];

  document.getElementById("question").innerText = q.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt.text;

    btn.onclick = () => select(opt.type);

    optionsDiv.appendChild(btn);
  });

  document.getElementById("progress").innerText =
    `Question ${index + 1} of ${questions.length}`;
}

function select(type) {
  scores[type]++;
  index++;

  if (index < questions.length) {
    showQuestion();
  } else {
    finish();
  }
}

function finish() {
  let result = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );

  localStorage.setItem("result", result);

  window.location.href = "results.html";
}

showQuestion();
